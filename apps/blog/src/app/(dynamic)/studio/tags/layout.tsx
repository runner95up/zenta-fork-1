import { defaultLayout } from "@/lib/config";
import { db } from "@packages/db";
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ScrollArea,
} from "@packages/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { TiPlus } from "react-icons/ti";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Next.js App",
  description: "Generated by create next app",
};

export default async function StudioTagLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const tags = await db.tag.findMany({
    select: {
      id: true,
      name: true,
      photo: true,
      createdAt: true,
    },
  });
  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} className="">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-semibold">Tags</h2>
          <Link href="/studio/tags/new">
            <Button role="button">
              <TiPlus className="h-4 w-4" />
              <span className="ml-2">New Tag</span>
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[calc(83vh)] p-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="hover:bg-neutral-700 flex items-center justify-between mb-4 p-2 rounded-md "
            >
              <Link href={"/studio/tags/" + tag.id} key={tag.id}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 relative">
                    <Image
                      src={tag.photo || "https://via.placeholder.com/100"}
                      alt={tag.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="100px"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium">{tag.name}</h3>
                    <time dateTime={tag.createdAt.toISOString()}>
                      {tag.createdAt.toDateString()}
                    </time>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      {children}
    </>
  );
}
