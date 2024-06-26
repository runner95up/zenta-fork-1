import { calculateReadTime, normalizeZodError } from "@/lib/utils";
import { auth } from "@packages/auth";
import { db } from "@packages/db";
import { PostSchema } from "@packages/validators";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};
export async function PATCH(req: Request, { params }: Props) {
  try {
    const ses = await auth();
    if (!ses) {
      return NextResponse.json(ses);
    }

    const body = await req.json();
    const parse = PostSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }

    const { id } = params;
    const { title, summary, cover, content, readTime, tags, techs } =
      parse.data;

    const totalTime = calculateReadTime(readTime);

    // unconnect all tags and techs from post
    const postTags = await db.post.findUnique({
      where: {
        id,
      },
      select: {
        tags: {
          select: {
            id: true,
          },
        },
        stack: {
          select: {
            id: true,
          },
        },
      },
    });
    if (tags) {
      await db.post.update({
        where: {
          id,
        },
        data: {
          tags: {
            disconnect: postTags?.tags,
          },
        },
      });
    }
    if (techs) {
      await db.post.update({
        where: {
          id,
        },
        data: {
          stack: {
            disconnect: postTags?.stack,
          },
        },
      });
    }

    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        title,
        slug: title.toLowerCase().replace(/ /g, "-"),
        summary,
        cover,
        content,
        readTime: totalTime,
        authors: {
          connect: {
            id: ses?.user?.id,
          },
        },
        tags: {
          connect: tags?.map((tag: string) => ({ id: tag })),
        },
        stack: {
          connect: techs?.map((tech: string) => ({ id: tech })),
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update post 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Post updated successfully ✅",
        post,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred 🚫",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(_: Request, { params }: Props) {
  try {
    const ses = await auth();
    if (!ses) {
      return NextResponse.json(ses);
    }

    const { id } = params;

    const post = await db.post.delete({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete post 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Post deleted successfully ✅",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred 🚫",
      },
      {
        status: 500,
      },
    );
  }
}
