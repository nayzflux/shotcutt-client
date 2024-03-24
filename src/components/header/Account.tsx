"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import ThemeSwitch from "./ThemeSwitch";
import { CreditCardIcon, LayoutDashboardIcon, User } from "lucide-react";

const Account = () => {
  const { data, isPending, isError } = useAuth();

  if (isPending || isError) {
    return (
      <div className="flex gap-4">
        <Button asChild variant="link">
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>

        {/* Should i redirect to Pricing or Sign Up */}
        <Button asChild>
          <Link href="/auth/sign-up">Get started</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Button asChild variant="link">
        <Link href="/dashboard">Go to Dasboard</Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <div className="flex items-center gap-4">
              <p>{data.name}</p>

              <Avatar className="h-5 w-5">
                <AvatarImage src={data.avatar_url} />
                <AvatarFallback>{data.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="dark:dark">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link href="/account/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
          </Link>

          <Link href="/account/subscription">
            <DropdownMenuItem className="cursor-pointer">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Subscription
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <ThemeSwitch />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboardIcon className="w-4 h-4 mr-2" />
              Go to Dashboard
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;
