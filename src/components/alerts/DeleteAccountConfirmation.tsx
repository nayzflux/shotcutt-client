"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { deleteUser } from "@/lib/api";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const DeleteAccountConfirmation = ({ disabled }: { disabled?: boolean }) => {
  const { data: user } = useAuth();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: `${user.name} has been deleted`,
      });

      queryClient.invalidateQueries({ queryKey: ["auth"] });

      router.push("/");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        <Button variant="destructive" disabled={disabled}>
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => mutate()}
              disabled={isPending}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountConfirmation;
