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
import { Separator } from "@/components/ui/separator";

import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaGithub, FaSpotify } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { API_URL, register } from "@/lib/api";

const SignUpSchema = z.object({
  name: z.string().max(1024),
  username: z.string().min(3).max(32),
  email: z.string().email().max(1024),
  password: z.string().min(8).max(1024),
});

type SignUpData = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: SignUpData) =>
      register(data.email, data.password, data.username, data.name),
    onSuccess: (data: any) => {
      toast({
        title: "Register successful",
        description: `You currently logged as ${data.name}`,
      });

      router.push("/dashboard");

      queryClient.setQueryData(["auth"], data);
    },
    onError: () => {
      toast({
        title: "Failed to register",
        description: "Oops! Something went wrong. 😕",
        variant: "destructive",
      });
    },
  });

  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
  });

  const onSubmit = (data: SignUpData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Sign-Up</CardTitle>
        <CardDescription>
          Join now to effortlessly split them into distinct scenes with our
          streamlined service.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="My name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <Input placeholder="My display name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="****************"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <Button disabled={isPending} className="w-full" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <Separator className="mb-6" />

      <CardFooter>
        <div className="flex flex-col items-center w-full gap-6">
          <div className="grid grid-cols-3 w-full gap-4">
            <Link
              className="flex items-center justify-center py-2 px-4 rounded-lg border border-border"
              href={`${API_URL}/auth/github`}
            >
              <FaGithub size={32} />
            </Link>

            <Link
              className="flex items-center justify-center py-2 px-4 rounded-lg border border-border text-green-400"
              href={`${API_URL}/auth/spotify`}
            >
              <FaSpotify size={32} />
            </Link>

            <Link
              className="flex items-center justify-center py-2 px-4 rounded-lg border border-border text-indigo-500"
              href={`${API_URL}/auth/discord`}
            >
              <FaDiscord size={32} />
            </Link>
          </div>

          <p>
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="self-end text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
