import React from "react";
import { Separator } from "../ui/separator";

const Step = ({
  i,
  title,
  children,
}: {
  i: number;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg">
      <Separator className="h-0.5 rounded-full" />

      <p className="font-medium text-transparent bg-clip-text bg-gradient-to-tl from-blue-400 to-rose-400">Step {i}</p>

      <p className="text-xl font-semibold">{title}</p>

      <div className="text-lg text-muted-foreground">{children}</div>
    </div>
  );
};

export default Step;
