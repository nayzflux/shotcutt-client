"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const AccountNav = () => {
  const routes = [
    {
      label: "Edit Profile",
      href: "/account/profile",
    },
    {
      label: "Manage Subscription",
      href: "/account/subscription",
    },
    {
      label: "Back to Dashboard",
      href: "/dashboard",
    },
  ];

  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {routes.map(({ label, href }) => (
          <li key={label}>
            <Link href={href}>
              <Button
                variant="ghost"
                className={cn(
                  "flex justify-start w-full text-base ",
                  pathname === href && "bg-accent"
                )}
              >
                {label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccountNav;
