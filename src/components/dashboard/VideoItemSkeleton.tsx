import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

const VideoItemSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 p-2">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="w-full h-full" />
        </AspectRatio>

        <div className="flex gap-2">
          <Skeleton className="w-[120px] h-6" />
          <Skeleton className="ml-auto w-[120px] h-6" />
        </div>
      </div>
    </div>
  );
};

export default VideoItemSkeleton;
