"use client";

import React from "react";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: logout,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const handleLogout = () => {
    mutate();
    router.push("/");
  };

  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
};

export default LogoutButton;
