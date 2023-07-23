"use client";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Saved from "../components/Saved";

const account = () => {
  const router = useRouter();
  const { user } = UserAuth();

  // Protect Account Link to be used from No Auth opening
  if (!user || user == null) {
    return router.push("/");
  }
  return (
    <>
      <div className="w-full text-white mb-6">
        <Image
          className="w-full h-[1/4vh] sm:h-[400px] object-cover"
          width={1920}
          height={1080}
          src="/netflix.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[400px]"></div>
        <div className="absolute top-[100px] sm:top-[18%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <Saved />
    </>
  );
};

export default account;
