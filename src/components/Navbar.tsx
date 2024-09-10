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
    <nav className="bg-blue-200 p-4 text-gray-800 shadow-md md:p-6">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <a href="#" className="mb-4 text-xl font-bold md:mb-0">
          True Nonsense
        </a>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button
              onClick={() => signOut()}
              className="w-full bg-gray-300 text-black md:w-auto"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full bg-gray-300 text-black md:w-auto"
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
