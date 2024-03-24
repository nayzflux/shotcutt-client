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
        mutationFn: (file: File) => uploadVideo(file, preset),
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

            <DialogContent className="min-w-[80vh]">
                <DialogHeader>
                    <DialogTitle>Upload a Video</DialogTitle>
                    <DialogDescription>
                        Choose video from your device
                    </DialogDescription>
                </DialogHeader>

                <AspectRatio ratio={16 / 9}>
                    <video
                        autoPlay
                        className="w-full h-full bg-neutral-200 rounded-lg"
                        src={url}
                        controls
                        muted
                    />
                </AspectRatio>

                <div className="py-4 w-full">
                    <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                </div>

                <Label>Encoding Preset</Label>

                <Select
                    value={preset}
                    onValueChange={(value: Preset) => setPreset(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a preset" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {/* <SelectItem value="SLOW">
                                Slow / Insane quality
                            </SelectItem> */}

                            <SelectItem value="MEDIUM">
                                Medium / Best quality
                            </SelectItem>

                            <SelectItem value="FAST">
                                Fast / Good quality
                            </SelectItem>

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

                <DialogFooter>
                    <Button onClick={handleUpload} type="submit">
                        Upload and Process
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UploadVideoModal;
