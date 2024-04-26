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
  title: process.env.NEXT_PUBLIC_STUDIO_APP_NAME,
  description: "Generated by create next app",
};

export default async function StudioStackLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const stacks = await db.tech.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      createdAt: true,
    },
  });
  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} className="">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-2xl font-semibold">Stacks</h2>
          <Link href="/stacks/new">
            <Button role="button">
              <TiPlus className="h-4 w-4" />
              <span className="ml-2">New Stack</span>
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[calc(83vh)] p-2">
          {stacks.map((stack) => (
            <div
              key={stack.id}
              className="mb-4 flex items-center justify-between rounded-md p-2 hover:bg-neutral-700 "
            >
              <Link href={"/stacks/" + stack.id} key={stack.id}>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={stack.logo || "https://via.placeholder.com/100"}
                      alt={stack.name}
                      fill
                      className="rounded-md object-cover"
                      sizes="100px"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium">{stack.name}</h3>
                    <time dateTime={stack.createdAt.toISOString()}>
                      {stack.createdAt.toDateString()}
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
