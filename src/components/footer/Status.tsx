import { getStatus } from "@openstatus/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

// React Server Component
export async function Status() {
  const res = await getStatus("shotcutt-status-page");
  // ^StatusResponse = { status: Status }

  const { status } = res;
  // ^Status = "unknown" | "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "under_maintenance" | "incident"

  return (
    <Button variant="outline" className="capitalize" asChild>
      <Link href="https://shotcutt-status-page.openstatus.dev/">
        {status}
        <DotFilledIcon
          className={cn(
            "size-6 ml-2 animate-pulse text-green-500",
            status !== "operational" && "text-red-500"
          )}
        />
      </Link>
    </Button>
  );
}
