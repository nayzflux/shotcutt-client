import React from "react";
import { Separator } from "../ui/separator";
import { Status } from "./Status";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 w-full text-sm px-96 mb-16">
      <Separator />

      <div className="flex gap-8 justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">Shotcutt</p>
          <p>Let us handle the intricate work</p>
        </div>

        <Status />
      </div>
    </footer>
  );
};
