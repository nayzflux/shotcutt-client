import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import React from "react";
import Video from "@/types/Video";
import { getVideoUrl } from "@/lib/api";

const VideoPlayer = ({ video }: { video: Video }) => {
    return (
        <MediaPlayer muted title={video.name} src={getVideoUrl(video)}>
            <MediaProvider></MediaProvider>

            <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    );
};

export default VideoPlayer;
