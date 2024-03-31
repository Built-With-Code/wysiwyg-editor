"use client";

import Cover from "@/components/Cover";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const [coverUrl, setCoverUrl] = useState<string>();

  const enableCover = async () => {
    const randomImage = await fetch(
      "https://source.unsplash.com/random/landscape"
    );
    setCoverUrl(randomImage.url);
  };

  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  return (
    <main className="min-h-screen">
      <Cover url={coverUrl} setUrl={setCoverUrl} />
      <div className="flex flex-col px-24 py-10 w-full">
        <div className="group flex flex-col gap-2">
          {!coverUrl && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="hover:bg-neutral-100 text-neutral-400 rounded-md px-3 py-1 transition-colors"
                onClick={enableCover}
              >
                📷 Add cover
              </button>
            </div>
          )}
          <TextareaAutosize
            placeholder="Untitled"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
        </div>
        <Editor onChange={() => {}} />
      </div>
    </main>
  );
}
