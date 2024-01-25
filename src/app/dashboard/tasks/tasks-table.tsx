"use client";

import * as React from "react";

import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { humanFileSize } from "@/lib/format";
import { formatFromNow } from "@/lib/date";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Video from "@/types/Video";
import useVideos from "@/hooks/useVideos";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socket";

// const data: Video[] = [
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
//   {
//     id: "123",
//     name: "Video title",
//     url: "",
//     scene_urls: [],
//     format: "mp4",
//     size: 13760000000,
//     status: "PROCESSING",
//     created_at: new Date(),
//   },
// ];

export const columns: ColumnDef<Video>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return <div className="font-medium">{status}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div className="capitalize">Created at</div>,
    cell: ({ row }) => {
      const formatted = dayjs(row.getValue("created_at")).format("DD/MM/YYYY");

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "size",
    header: () => <div className="">Size</div>,
    cell: ({ row }) => {
      const bits = row.getValue("size") as number;

      return <div className="font-medium">{humanFileSize(bits)}</div>;
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

const TasksTable = () => {
  const { data, isPending, isError, refetch } = useVideos();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    // @ts-ignore
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const queryClient = useQueryClient();

  React.useEffect(() => {
    socket.connect();

    socket.on("video_process_success", onProcessSuccess);
    socket.on("video_process_failed", onProcessFailed);
    socket.on("video_process_start", onProcessStart);

    return () => {
      socket.off("video_process_success", onProcessSuccess);
      socket.off("video_process_failed", onProcessFailed);
      socket.off("video_process_start", onProcessStart);
      socket.disconnect();
    };
  }, [socket]);

  const onProcessSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["videos"],
    });

    toast({
      title: "Processing finished",
      description: "Video has been processed",
    });
  };

  const onProcessStart = () => {
    queryClient.invalidateQueries({
      queryKey: ["videos"],
    });

    toast({
      title: "Processing start",
      description: "Video is processing",
    });
  };

  const onProcessFailed = () => {
    queryClient.invalidateQueries({
      queryKey: ["videos"],
    });

    toast({
      title: "Processing failed",
      description: "Video cannot be processed",
      variant: "destructive",
    });
  };

  if (isPending)
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <p className="text-lg">Loading, please wait...</p>
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-[200px] flex justify-center items-center gap-2">
        <p className="text-lg">Oops, an error occured</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.replace("_", " ")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TasksTable;
