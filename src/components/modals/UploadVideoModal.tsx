"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "../ui/use-toast";
import { uploadVideo } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Video from "@/types/Video";
import { AspectRatio } from "../ui/aspect-ratio";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Preset from "@/types/Preset";
import { Label } from "../ui/label";

const fileTypes = ["MP4"];

const UploadVideoModal = () => {
  const [url, setUrl] = useState("/");

  const queryClient = useQueryClient();

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (file: File) => uploadVideo(file, preset, cuttingMargin),
    onMutate: async (data) => {
      setOpen(false);

      toast({
        title: "Uploading video...",
        description: `${data.name}`,
      });

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["videos"] });

      // Snapshot the previous value
      const previousVideos = queryClient.getQueryData(["videos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["videos"], (old: Video[]) => [
        ...old,
        {
          id: null,
          status: "UPLOADING",
          name: file?.name,
          size: file?.size,
          format: null,
          url: null,
          scene_urls: [],
        },
      ]);

      // Return a context object with the snapshotted value
      return { previousVideos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, data, context) => {
      console.error(err);

      toast({
        title: "Video upload failed",
        description: `${data.name} hasn't been upload`,
        variant: "destructive",
      });

      queryClient.setQueryData(["todos"], context?.previousVideos);
    },
    onSuccess: (data) => {
      toast({
        title: "Video uploaded",
        description: `${data.name} is now processing...`,
      });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>("FAST");
  const [cuttingMargin, setCuttingMargin] = useState<string>("0");

  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (file: File) => {
    setFile(file);
    setUrl(URL.createObjectURL(file));

    console.log("Set file : " + file.name);
  };

  const handleUpload = () => {
    if (!file) return;

    mutate(file);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button>Upload Video</Button>
      </DialogTrigger>

      <DialogContent className="min-w-[80vh] dark:dark dark:text-white">
        <DialogHeader>
          <DialogTitle>Upload a Video</DialogTitle>
          <DialogDescription>Choose video from your device</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-8 py-4">
          <AspectRatio ratio={16 / 9}>
            <video
              autoPlay
              className="w-full h-full bg-neutral-200 rounded-lg"
              src={url}
              controls
              muted
            />
          </AspectRatio>

          <div className="w-full">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Encoding Preset</Label>

            <Select
              value={preset}
              onValueChange={(value: Preset) => setPreset(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a preset" />
              </SelectTrigger>

              <SelectContent className="dark:dark">
                <SelectGroup>
                  {/* <SelectItem value="SLOW">
                                Slow / Insane quality
                            </SelectItem> */}

                  <SelectItem value="MEDIUM">Medium / Best quality</SelectItem>

                  <SelectItem value="FAST">Fast / Good quality</SelectItem>

                  <SelectItem value="FASTER">
                    Faster / Middle quality
                  </SelectItem>

                  <SelectItem value="VERYFAST">
                    Veryfast / Low quality
                  </SelectItem>

                  <SelectItem value="SUPERFAST">
                    Superfast / Bad quality
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Cutting Margin (make cut smoother but loose some frames)
            </Label>

            <Select
              value={cuttingMargin}
              onValueChange={(value) => setCuttingMargin(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a preset" />
              </SelectTrigger>

              <SelectContent className="dark:dark">
                <SelectGroup>
                  <SelectItem value="0">No / Preserve frames</SelectItem>

                  <SelectItem value="0.05">50ms</SelectItem>

                  <SelectItem value="0.10">100ms</SelectItem>

                  <SelectItem value="0.25">250ms</SelectItem>

                  {/* <SelectItem value="0.50">500ms</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={handleUpload} type="submit">
            Upload and Process
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoModal;
