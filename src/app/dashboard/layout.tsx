import DashboardNav from "@/components/dashboard/DashboardNav";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-8 px-16 xl:px-32 2xl:px-64">
      <DashboardNav />

      <Separator />

      {children}
    </div>
  );
};

export default DashboardLayout;
