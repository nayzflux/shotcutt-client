interface Video {
  id: string;
  name: string;
  url: string;
  scene_urls: string[];
  format: string;
  size: number;
  status: "UPLOADING" | "WAITING" | "PROCESSING" | "PROCESSED" | "FAILED";
  created_at: Date;
}

export default Video;
