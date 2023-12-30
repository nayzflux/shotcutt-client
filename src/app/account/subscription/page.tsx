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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SubscriptionPage = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your current subscription will remain active until the end of the
            billing cycle
          </CardDescription>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Plan Classic</p>
            <p className="text-2xl font-semibold">2,00 €/month</p>
            <p className="text-muted-foreground">
              Your subscription will be renewed on January 27, 2024.
            </p>
          </div>
        </CardContent>

        <CardFooter>
          <div className="ml-auto">
            <Button variant="outline">Change plan</Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Informations</CardTitle>
          <CardDescription>
            Your current subscription will remain active until the end of the
            billing cycle
          </CardDescription>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent>
          <div className="grid grid-cols-2">
            <div className="grid grid-rows-2">
              <p>Name</p>
              <p>Billing adress</p>
            </div>

            <div className="grid grid-rows-2">
              <p>-----------------</p>
              <p>-----------------</p>
            </div>
          </div>
        </CardContent>

        {/* <CardFooter></CardFooter> */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Your current subscription will remain active until the end of the
            billing cycle
          </CardDescription>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent>
          <div className="grid grid-cols-4">
            <div className="grid grid-rows-4">
              <p>27 déc. 2023</p>
              <p>9 nov. 2023</p>
            </div>

            <div className="grid grid-rows-4">
              <p>2,00 €</p>
              <p>2,00 €</p>
            </div>

            <div className="grid grid-rows-4">
              <div>
                <Badge>Paid</Badge>
              </div>

              <div>
                <Badge>Paid</Badge>
              </div>
            </div>

            <div className="grid grid-rows-4">
              <p>Plan Classic</p>
              <p>Plan Classic</p>
            </div>
          </div>
        </CardContent>

        {/* <CardFooter></CardFooter> */}
      </Card>

      {/* Cancel subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Cancel Subscription</CardTitle>
          <CardDescription>
            Your current subscription will remain active until the end of the
            billing cycle
          </CardDescription>
        </CardHeader>

        <Separator className="mb-6" />

        <CardFooter>
          <div className="ml-auto">
            <Button variant="destructive">Cancel Subscription</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionPage;
