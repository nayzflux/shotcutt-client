"use client";

import React, { useEffect } from "react";
import VideoItem from "./VideoItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchVideos } from "@/lib/api";
import VideoItemSkeleton from "./VideoItemSkeleton";
import { GhostIcon } from "lucide-react";
import UploadVideoModal from "../modals/UploadVideoModal";
import socket from "@/lib/socket";
import { toast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const VideoContainer = () => {
  const router = useRouter();

  const { data, isPending, isError } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    retry: (failureCount, error) => {
      // Ne pas réessayer si l'erreur est due à une non-authentification (code 401)
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          router.push("/auth/sign-in");
          return false;
        }
      }

      // Retry pour d'autres erreurs
      return true;
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on("video_process_success", onProcessSuccess);
    socket.on("video_process_failed", onProcessFailed);
    socket.on("video_process_start", onProcessStart);

    return () => {
      socket.off("video_process_success", onProcessSuccess);
      socket.off("video_process_failed", onProcessFailed);
      socket.off("video_process_start", onProcessStart);
      socket.disconnect();
    };
  }, []);

  const onProcessSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["videos"],
    });

    toast({
      title: "Processing finished",
      description: "Video has been processed",
    });
  };

  const onProcessStart = () => {
    queryClient.invalidateQueries({
      queryKey: ["videos"],
    });

    toast({
      title: "Processing start",
      description: "Video is processing",
    });
  };

  const onProcessFailed = () => {
    queryClient.invalidateQueries({
      queryKey: ["videos"],
    });

    toast({
      title: "Processing failed",
      description: "Video cannot be processed",
      variant: "destructive",
    });
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
        <VideoItemSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-red-400">
          Error occured, please try refreshing the page
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col border border-border rounded-lg items-center justify-center gap-4 p-10">
        <GhostIcon className=" stroke-1 h-[300px] w-[300px]" />

        <p className="font-semibold text-xl">
          You don't have uploaded video yet!
        </p>

        <UploadVideoModal />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {data.map((video) => (
        <VideoItem video={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideoContainer;
