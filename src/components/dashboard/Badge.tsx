import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Badge = ({ children }: { children: ReactNode }) => {
    return (
        <span
            className={cn(
                "p-1  bg-opacity-30 text-xs rounded bg-neutral-500 text-neutral-600"
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
