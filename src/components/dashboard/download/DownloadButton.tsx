"use client";

import React from "react";
import { Button } from "../../ui/button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getSceneUrl } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const DownloadButton = ({
  url,
  label,
  variant,
  filename,
  disabled,
}: {
  url: string;
  label: string;
  filename: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  disabled?: boolean;
}) => {
  // const handleDownload = async () => {
  //   toast({
  //     title: "Downloading scene...",
  //     description:
  //       "Sit tight! Your pixels are on their way, delivered by dedicated unicorns. 🌈✨",
  //   });

  //   try {
  //     const response = await fetch(url);
  //     const blob = await response.blob();

  //     // Créer un objet URL pour le blob
  //     const blobUrl = URL.createObjectURL(blob);

  //     // Créer un lien pour le téléchargement
  //     const a = document.createElement("a");
  //     a.href = blobUrl;
  //     a.download = filename; // Nom du fichier téléchargé
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);

  //     toast({
  //       title: "Download finished",
  //       description: "Time to enjoy the masterpiece! 🌟🚀",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Download failed",
  //       description:
  //         "Oops! Looks like the pixels took a detour. Please try again in a moment. 🦄🛠️",
  //       variant: "destructive",
  //     });

  //     console.error("Erreur lors du téléchargement de la vidéo :", error);
  //   }
  // };

  return (
    <Button
      variant={variant || "secondary"}
      value="download"
      // onClick={handleDownload}
      className="items-center gap-2"
      disabled={disabled}
      asChild
    >
      <Link href={url} download={filename}>
        <ArrowDownTrayIcon className="h-6 w-6" />
        <p>{label}</p>
      </Link>
    </Button>
  );
};

export default DownloadButton;
