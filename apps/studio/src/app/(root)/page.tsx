import { defaultLayout } from "@/lib/config";
import { ResizableHandle, ResizablePanel } from "@packages/ui";

export default async function StudioPage() {
  const total = (defaultLayout[1] as number) + (defaultLayout[2] as number);

  return (
    <>
      <ResizableHandle disabled />
      <ResizablePanel defaultSize={total}>
        <h1>woyoo</h1>
      </ResizablePanel>
    </>
  );
}
