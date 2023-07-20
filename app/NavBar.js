"use client";
import React from "react";
import Link from "next/link";
import { UserAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="absolute top-0 w-full h-[5vh]  z-[100] flex justify-between p-2 sm:p-4 text-center">
      <Link className="text-red-600 text-xl sm:text-4xl font-bold" href="/">
        TRAILFLIX
      </Link>
      <div>
        <button className=" cursor-pointer mr-4">
          {user?.email ? (
            <Link href="/account">Account</Link>
          ) : (
            <Link href="/signin">Sign In</Link>
          )}
        </button>
        {user?.email ? (
          <button
            onClick={logoutHandler}
            className="bg-red-600 rounded  px-6 py-2 cursor-pointer"
          >
            Log Out
          </button>
        ) : (
          <button className="bg-red-600 rounded  px-6 py-2 cursor-pointer">
            <Link href="/signup">Sign Up</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
