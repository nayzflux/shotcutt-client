import VideoContainer from "@/components/dashboard/VideoContainer";
import UploadVideoModal from "@/components/modals/UploadVideoModal";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

const DashboardPage = () => {
  return (
    <main className="flex flex-col w-full gap-8">
      <div className="flex items-center">
        <h2 className="uppercase font-semibold text-2xl">Videos dashboard</h2>

        <div className="ml-auto">
          <Suspense fallback={<p>Loading...</p>}>
            <UploadVideoModal />
          </Suspense>
        </div>
      </div>

      <Separator />

      <Suspense fallback={<p>Loading...</p>}>
        <VideoContainer />
      </Suspense>
    </main>
  );
};

export default DashboardPage;
