import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { formatFromNow } from "@/lib/date";
import Video from "@/types/Video";
import { getVideoUrl } from "@/lib/api";
import VideoDetails from "./VideoDetails";
import VideoContextMenu from "./VideoContextMenu";
import StatusBadge from "./StatusBadge";
import { MediaProvider, Thumbnail } from "@vidstack/react";

const VideoItem = ({ video }: { video: Video }) => {
  return (
    <VideoDetails id={video.id} video={video}>
      <VideoContextMenu id={video.id}>
        <div className="flex flex-col gap-2 p-2 h-full">
          <AspectRatio ratio={16 / 9}>
            <video className="h-full rounded-lg bg-muted" muted>
              <source src={getVideoUrl(video) + "#t=2"} />
            </video>

            {/* <div className="absolute top-2 left-2">
              <StatusBadge status={video.status} />
            </div> */}
          </AspectRatio>

          <div className="flex gap-2 items-center py-1">
            <StatusBadge status={video.status} />

            <p className="font-semibold truncate">{video.name}</p>

            <p className="text-neutral-400 ml-auto">
              {formatFromNow(new Date(video.created_at))}
            </p>
          </div>
        </div>
      </VideoContextMenu>
    </VideoDetails>
  );
};

export default VideoItem;
