import React from "react";
import DownloadButton from "./DownloadButton";
import { getSceneUrl, getVideoUrl } from "@/lib/api";
import Video from "@/types/Video";

const DownloadScene = ({
  scene_url,
  i,
  video,
}: {
  scene_url: string;
  i: number;
  video: Video;
}) => {
  return (
    <DownloadButton
      url={getSceneUrl(video, i)}
      label="Download scene"
      filename={`${video.name}-${i+1}.mp4`}
    />
  );
};

export default DownloadScene;
