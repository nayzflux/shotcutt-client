import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Badge = ({ children }: { children: ReactNode }) => {
  return (
    <span className={cn("p-1  bg-opacity-30 text-xs rounded bg-muted")}>
      {children}
    </span>
  );
};

export default Badge;
