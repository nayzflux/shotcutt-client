import { Separator } from "@/components/ui/separator";
import React from "react";
import TasksTable from "./tasks-table";

const TasksPage = () => {
  return (
    <main className="flex flex-col w-full gap-8">
      <div className="flex items-center">
        <h2 className="uppercase font-semibold text-2xl">Processing Tasks</h2>
      </div>

      <Separator />

      {/* Tasks table */}
      <TasksTable />
    </main>
  );
};

export default TasksPage;
