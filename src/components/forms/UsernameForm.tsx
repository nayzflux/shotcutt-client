"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const updateUsernameData = z.object({
  username: z.string().min(3).max(32),
});

type UpdateUsernameData = z.infer<typeof updateUsernameData>;

const UsernameForm = ({
  username,
  disabled,
}: {
  username: string;
  disabled?: boolean;
}) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  // const { data, mutate, isPending } = useMutation({
  //   mutationKey: ["auth"],
  //   mutationFn: (data: UpdateUsernameData) => login(data.email, data.password),
  //   // onSuccess: (data: any) => {
  //   //   toast({
  //   //     title: "Username updated",
  //   //     description: `You currently logged as ${data.name}`,
  //   //   });

  //   //   queryClient.setQueryData(["auth"], data);
  //   // },
  //   // onError: () => {
  //   //   toast({
  //   //     title: "Failed to Login",
  //   //     description: "Oops! Something went wrong. 😕",
  //   //     variant: "destructive",
  //   //   });
  //   // },
  // });

  const form = useForm<UpdateUsernameData>({
    resolver: zodResolver(updateUsernameData),
    defaultValues: {
      username: username,
    },
  });

  const onSubmit = (data: UpdateUsernameData) => {
    console.log(data);
    // mutate(data);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Your Display Name</CardTitle>
          </CardHeader>

          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <div className="flex items-center w-full">
              <p className="text-sm">Max 32 characters</p>

              <div className="ml-auto">
                <Button variant="outline" disabled={disabled}>
                  Save changes
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UsernameForm;
