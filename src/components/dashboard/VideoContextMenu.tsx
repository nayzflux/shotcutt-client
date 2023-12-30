"use client";

import React, { ReactNode } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "@/lib/api";
import Video from "@/types/Video";
import copy from "clipboard-copy";
import { toast } from "../ui/use-toast";

const VideoContextMenu = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const queryClient = useQueryClient();

  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => deleteVideo(id),
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["videos"] });

      // Snapshot the previous value
      const previousVideos = queryClient.getQueryData(["videos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["videos"], (old: Video[]) =>
        old.filter((v) => v.id !== id)
      );

      // Return a context object with the snapshotted value
      return { previousVideos };
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  const handleCopyId = (e: any) => {
    e.stopPropagation();
    copy(id);
    toast({
      title: 'Video ID copied',
      description: 'Video ID has been copied to clipboard 📄'
    })
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleCopyId}>Copy ID</ContextMenuItem>
        <ContextMenuItem>Show details</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => mutate()}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default VideoContextMenu;
