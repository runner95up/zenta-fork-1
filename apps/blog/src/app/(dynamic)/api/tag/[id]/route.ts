import { normalizeZodError } from "@/lib/utils";
import { TagSchema } from "@/schema";
import { auth } from "@packages/auth";
import { db } from "@packages/db";
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
    const parse = TagSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }

    const { id } = params;
    const { name, description, photo } = parse.data;

    const tag = await db.tag.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        photo,
        updaterId: ses?.user?.id,
      },
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tag 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tag updated successfully ✅",
        tag,
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
      }
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

    const tag = await db.tag.delete({
      where: {
        id,
      },
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tag 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tag deleted successfully ✅",
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
      }
    );
  }
}
