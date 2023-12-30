"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Video from "@/types/Video";
import { Badge } from "../ui/badge";
import { humanFileSize } from "@/lib/format";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { getVideoUrl, getZipUrl } from "@/lib/api";
import DownloadScene from "./download/DownloadScene";
import { ScrollArea } from "../ui/scroll-area";
import DownloadButton from "./download/DownloadButton";

const VideoDetails = ({
  children,
  id,
  video,
}: {
  children: React.ReactNode;
  id: string;
  video: Video;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="h-[90vh] min-w-[100vh]">
        <DialogHeader>
          <DialogTitle>
            <p>{video.name}</p>
          </DialogTitle>

          <DialogDescription>
            {/* Throw an error? */}
            <div className="flex gap-2 mt-2">
              <Badge>{video.status}</Badge>

              <Badge>{humanFileSize(video.size)}</Badge>

              <Badge>{video.format}</Badge>

              <Badge>{video.scene_urls.length} scenes</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <AspectRatio ratio={16 / 9}>
          <video
            autoPlay
            className="w-full h-full bg-neutral-200 rounded-lg"
            src={getVideoUrl(video)}
          />
        </AspectRatio>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">Extracted Scenes</h2>
            <p className="text-muted-foreground text-sm">You can now download secne or download all scene</p>
          </div>

          <DownloadButton
            filename={video.name + ".zip"}
            variant={"default"}
            url={getZipUrl(video)}
            label="Download All"
          />
        </div>

        <ScrollArea className="rounded-md border p-4">
          <div className="grid grid-cols-3 gap-4">
            {video.scene_urls.map((url, i) => (
              <div key={url} className="flex items-center justify-between">
                <p>{i + 1}.</p>

                <DownloadScene video={video} i={i} scene_url={url} />
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDetails;
