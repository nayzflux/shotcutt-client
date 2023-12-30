import VideoContainer from "@/components/dashboard/VideoContainer";
import UploadVideoModal from "@/components/modals/UploadVideoModal";
import { Separator } from "@/components/ui/separator";
import React from "react";

const LandingPage = () => {
  return (
    <main className="flex flex-col w-full gap-8 px-16 py-8 xl:px-32 xl-py-16 2xl:px-64">
      <div className="flex items-center">
        <h2 className="uppercase font-semibold text-2xl">Videos dashboard</h2>

        <div className="ml-auto">
          <UploadVideoModal />
        </div>
      </div>

      <Separator />

      <VideoContainer />
    </main>
  );
};

export default LandingPage;
