"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import DeleteAccountConfirmation from "@/components/alerts/DeleteAccountConfirmation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
  const { data: user, isPending, isError } = useAuth();

  return (
    <div className="flex flex-col gap-8 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Your Avatar</CardTitle>
        </CardHeader>

        <CardContent>
          {user?.avatar_url ? (
            <Avatar className="h-32 w-32">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center justify-center aspect-square h-32 rounded-full bg-muted">
              <p className="text-4xl">{user?.name[0]}</p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <div className="flex items-center w-full">
            <p>Max 4MB</p>

            <div className="ml-auto">
              <Button variant="outline" disabled={isPending}>
                Save changes
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Name */}
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
        </CardHeader>

        <CardContent>
          <Input defaultValue={user?.name || ""} />
        </CardContent>

        <CardFooter>
          <div className="flex items-center w-full">
            <p>Your name will be keep private</p>

            <div className="ml-auto">
              <Button variant="outline" disabled={isPending}>
                Save changes
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {isPending ? (
        <Skeleton className="w-full h-[200px]" />
      ) : (
        <UsernameForm disabled={isPending} username={user?.username} />
      )}

      {/* Email */}
      <Card>
        <CardHeader>
          <CardTitle>Your Email</CardTitle>
        </CardHeader>

        <CardContent>
          <Input defaultValue={user?.email || ""} disabled={true} />
        </CardContent>

        {/* <CardFooter>
          <div className="flex items-center w-full">
            <p className="text-sm">Must be a valid email</p>

            <div className="ml-auto">
              <Button disabled={isPending} variant="outline">
                Save changes
              </Button>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {/* Delete account */}
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently deleting your account on ShotCutt. All your videos and
            subscriptions will be deleted!
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <div className="ml-auto">
            <DeleteAccountConfirmation disabled={isPending} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
