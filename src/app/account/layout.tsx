import AccountNav from "@/components/account/AccountNav";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full gap-8 px-16 py-8 xl:px-32 xl-py-16 2xl:px-64">
      <div className="flex items-center">
        <h2 className="uppercase font-semibold text-2xl">My Account</h2>

        {/* <div className="ml-auto">
            <Button>
                <Link href={"/"}>Go to Dashboard</Link>
            </Button>
        </div> */}
      </div>

      <Separator />

      <div className="flex gap-8">
        <AccountNav />

        {children}
      </div>
    </main>
  );
};

export default AccountLayout;
