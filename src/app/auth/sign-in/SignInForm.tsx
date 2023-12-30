"use client";

import {
  Form,
  FormControl,
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

import { FaDiscord, FaGithub, FaSpotify } from "react-icons/fa";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, login } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: SignInData) => login(data.email, data.password),
    onSuccess: (data: any) => {
      toast({
        title: "Login successful",
        description: `You currently logged as ${data.name}`,
      });

      router.push("/dashboard");

      queryClient.setQueryData(["auth"], data);
    },
    onError: () => {
      toast({
        title: "Failed to Login",
        description: "Oops! Something went wrong. 😕",
        variant: "destructive",
      });
    },
  });

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Sign-In</CardTitle>
        <CardDescription>
          {"Welcome back! We're thrilled to have you with us again."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      type="email"
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
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <Button disabled={isPending} className="w-full" type="submit">
                Sign In
              </Button>

              <Link
                href="/auth/forgot-password"
                className="self-end text-blue-500 hover:underline text-sm"
              >
                Reset password
              </Link>
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
            {"Don't have an account? "}
            <Link
              href="/auth/sign-up"
              className="self-end text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
