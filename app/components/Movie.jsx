"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";

const Movie = ({ title, id, poster_path, like }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const { user } = UserAuth();
  const userID = doc(db, "users", `${user?.email}`);

  // Heart fuction to add and remove likes in Firebase
  const heartMovie = async () => {
    if (user?.email) {
      if (like == false) {
        like = true;
        await updateDoc(userID, {
          savedShows: arrayUnion({
            id: id,
            title: title,
            img: poster_path,
          }),
        });
      } else {
        like = false;
        await updateDoc(userID, {
          savedShows: arrayRemove({
            id: id,
            title: title,
            img: poster_path,
          }),
        });
      }
    } else {
      alert("Please log in first to save a movie");
    }
  };

  return (
    <>
      <div className="text-center relative w-32 lg:w-[220px] inline-block mx-4">
        <Image
          src={imgPath + poster_path}
          alt={title}
          width={280}
          height={280}
          className="rounded-lg"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-100 hover:bg-gray-700/60 duration-300 px-2">
          <div className="text-xs sm:text-sm px-1 whitespace-normal">
            {title}
          </div>
          <Link href={`/${id}`}>
            <div className="mt-5 sm:px-8 px-4 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300 text-xs sm:text-sm">
              More Details
            </div>
          </Link>
          <p onClick={heartMovie}>
            {like ? (
              <FaHeart
                size={24}
                className=" absolute top-4 left-4  text-red-500"
              />
            ) : (
              <FaRegHeart
                size={24}
                className=" absolute top-4 left-4 text-gray-50"
              />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
