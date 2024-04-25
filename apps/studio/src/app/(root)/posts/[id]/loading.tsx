import { defaultLayout } from "@/lib/config";
import { ResizablePanel, ScrollArea, SupermanLoader } from "@packages/ui";

export default function Loading() {
  return (
    <ResizablePanel defaultSize={defaultLayout[2]}>
      <section>
        <ScrollArea className="h-[calc(83vh)]">
          <SupermanLoader withParentClass={false} />
        </ScrollArea>
      </section>
    </ResizablePanel>
  );
}
