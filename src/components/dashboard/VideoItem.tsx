import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { formatFromNow } from "@/lib/date";
import Video from "@/types/Video";
import { getVideoUrl } from "@/lib/api";
import VideoDetails from "./VideoDetails";
import VideoContextMenu from "./VideoContextMenu";
import StatusBadge from "./StatusBadge";

const VideoItem = ({ video }: { video: Video }) => {
    return (
        <VideoDetails id={video.id} video={video}>
            <VideoContextMenu id={video.id}>
                <div className="flex flex-col gap-2 p-2 h-full">
                    <AspectRatio ratio={16 / 9}>
                        <video
                            src={getVideoUrl(video)}
                            className="h-full -full bg-neutral-200 rounded-lg"
                        />

                        <div className="absolute top-2 left-2">
                            <StatusBadge status={video.status} />
                        </div>
                    </AspectRatio>

                    <div className="flex gap-2">
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
