import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LockClosedIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PlanCard = ({
  title,
  description,
  items,
  price,
  cta,
  primary,
}: {
  title: string;
  description: string;
  items: { available: boolean; label: string }[];
  price: number;
  cta: string;
  primary?: boolean;
}) => {
  return (
    <Card className={cn("h-full", primary && "border-primary")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-end gap-1">
            <p className="text-6xl font-semibold">{price}€</p>
            <p className="text-muted-foreground">/month</p>
          </div>

          <Button
            variant={primary ? "default" : "outline"}
            asChild
            className="w-full"
          >
            <Link href={"/auth/sign-up"}>{cta}</Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter>
        <ul>
          {items.map(({ label, available }) => (
            <li
              className="flex gap-2 items-center text-muted-foreground"
              key={label}
            >
              {available ? (
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              ) : (
                <XMarkIcon className="text-red-400 h-5 w-5" />
              )}
              <p>{label}</p>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
