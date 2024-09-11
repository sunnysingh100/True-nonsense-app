"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="bg-blue-400 p-4 text-gray-800 shadow-md md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-base font-bold sm:text-xl">
          True Nonsense
        </a>
        {session ? (
          <>
            <span className="text-sm sm:text-lg">
              Welcome, {user.username || user.email}
            </span>
            <Button
              onClick={() => signOut()}
              className="bg-gray-300 text-black md:w-auto"
              variant="outline"
              size={"sm"}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="bg-gray-300 text-black md:w-auto"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
