import { Heading } from "@/components";
import { Separator } from "@/components/separator";
import { defaultLayout } from "@/lib/config";
import { Button, ResizablePanel } from "@packages/ui";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
export default function PostPage() {
  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <div className="flex flex-col items-center w-full h-full">
          <Heading
            title="Posts"
            description="Edit and manage posts for your posts."
            className="m-auto text-center"
          >
            <div className="flex relative items-center my-4">
              <Separator className="max-w-24" />
              <p className="text-muted-foreground mx-2">or</p>
              <Separator className="max-w-24" />
            </div>

            <Link href="/studio/posts/new">
              <Button>
                <TiPlus className="h-4 w-4" />
                <span className="ml-2">New Post</span>
              </Button>
            </Link>
          </Heading>
        </div>
      </ResizablePanel>
    </>
  );
}
