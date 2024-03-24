import React from "react";
import Nav from "./Nav";
import Account from "./Account";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex gap-8 px-16 py-8 xl:px-32 xl-py-16 2xl:px-64 items-center bg-white dark:bg-soft-black">
      <h1 className="text-2xl font-bold uppercase">
        <Link className="p-2" href="/">
          Shotcutt
        </Link>
      </h1>

      <Nav />

      <div className="ml-auto">
        <Account />
      </div>
    </header>
  );
};

export default Header;
