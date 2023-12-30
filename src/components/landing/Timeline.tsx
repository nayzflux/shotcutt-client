import React from "react";
import Step from "./Step";

const Timeline = () => {
  return (
    <div className="grid grid-cols-3 gap-8 ">
      <Step i={1} title="Sign Up for an Account">
        <p>
          Explore our free plan or unlock premium features with our premium
          plan.
        </p>
      </Step>

      <Step i={2} title="Upload Your Video">
        <p>
          Easily upload your video content from your device.
        </p>
      </Step>

      <Step i={3} title="Download Processed Clips">
        <p>
          Access and download the segmented clips processed by our service.
        </p>
      </Step>
    </div>
  );
};

export default Timeline;
