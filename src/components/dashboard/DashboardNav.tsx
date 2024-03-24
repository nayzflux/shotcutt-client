"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DashboardNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Video dashboard",
      href: "/dashboard",
    },
    {
      label: "Tasks",
      href: "/dashboard/tasks",
    },
  ];

  return (
    <nav>
      <ul className="flex text-lg gap-2">
        {routes.map(({ label, href }) => (
          <li
            key={label}
            className={cn(pathname === href && "border-b-2 border-black dark:border-white")}
          >
            <Link href={href} className="p-4">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNav;
