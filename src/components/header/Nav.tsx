"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Nav = () => {
  const routes = [
    {
      label: "Home",
      herf: "/",
    },
    {
      label: "Pricing",
      herf: "/pricing",
    },
    {
      label: "Github",
      herf: "https://github.com/nayzflux/shotcutt-client",
    },
  ];

  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-8">
        {routes.map(({ label, herf }) => (
          <li key={label}>
            <Link
              className={cn(
                "p-2 hover:font-semibold transition",
                pathname === herf && "font-semibold"
              )}
              href={herf}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
