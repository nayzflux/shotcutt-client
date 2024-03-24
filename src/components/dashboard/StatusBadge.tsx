import { cn } from "@/lib/utils";
import React from "react";

const StatusBadge = ({
    status,
}: {
    status: "UPLOADING" | "PROCESSED" | "PROCESSING" | "WAITING" | "FAILED";
}) => {
    return (
        <span
            className={cn(
                "p-1  bg-opacity-30 text-xs rounded",
                status === "PROCESSED" && "bg-green-600 text-green-500",
                status === "WAITING" ||
                    (status === "PROCESSING" && "bg-blue-600 text-blue-500"),
                status === "FAILED" && "bg-red-600 text-red-500",
                status === "UPLOADING" && "bg-yellow-500 text-yellow-400"
            )}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
