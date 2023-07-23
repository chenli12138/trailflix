"use client";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, arrayRemove, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function Saved() {
  const [likes, setLikes] = useState(null);
  const { user } = UserAuth();
  const userID = doc(db, "users", `${user?.email}`);

  const imgPath = "https://image.tmdb.org/t/p/w500";

  const slideLeft = () => {
    let sliderL = document.getElementById("slider");
    sliderL.scrollLeft = sliderL.scrollLeft - 500;
  };
  const slideRight = () => {
    let sliderR = document.getElementById("slider");
    sliderR.scrollLeft = sliderR.scrollLeft + 500;
  };
  // console.log("Row: " + data.movie.title);
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLikes(doc.data()?.savedShows);
    });
  }, [user?.email]);

  // console.log(data);
  const removeHeart = async (id, title, img) => {
    await updateDoc(userID, {
      savedShows: arrayRemove({
        id: id,
        title: title,
        img: img,
      }),
    });
  };

  return (
    <>
      <div className="hidden sm:block">
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white  text-gray-900 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar"
          >
            {likes &&
              likes?.map((movie) => (
                <div
                  key={movie.id}
                  className="text-center relative w-32 sm:w-[200px] md:w-[280px] lg:w-[280px] inline-block mx-4"
                >
                  <Image
                    src={imgPath + movie.img}
                    alt={movie.title}
                    width={280}
                    height={280}
                    className="rounded-lg"
                  />

                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-100 hover:bg-gray-700/60 duration-300">
                    <div className="text-xs sm:text-sm px-1 whitespace-normal">
                      {movie.title}
                    </div>
                    <Link href={`/${movie.id}`}>
                      <div className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300 text-xs sm:text-sm wrap">
                        More Details
                      </div>
                    </Link>
                    <p
                      onClick={() =>
                        removeHeart(movie.id, movie.title, movie.img)
                      }
                    >
                      <FaHeart
                        size={24}
                        className=" absolute top-4 left-4 text-red-500"
                      />
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <MdChevronRight
            onClick={slideRight}
            className="bg-white text-gray-900 rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        </div>
      </div>
      <div className="sm:hidden grid grid-cols-fluid gap-2 w-full px-5">
        {likes &&
          likes?.map((movie) => (
            <div
              key={movie.id}
              className="text-center relative w-40 sm:w-[200px] md:w-[280px] lg:w-[280px] inline-block mx-2"
            >
              <Image
                src={imgPath + movie.img}
                alt={movie.title}
                width={280}
                height={280}
                className="rounded-lg"
              />

              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 hover:opacity-100 hover:bg-gray-700/60 duration-300">
                <div className="text-xs sm:text-sm px-1 whitespace-normal">
                  {movie.title}
                </div>
                <Link href={`/${movie.id}`}>
                  <div className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300 text-xs sm:text-sm wrap">
                    More Details
                  </div>
                </Link>
                <p
                  onClick={() => removeHeart(movie.id, movie.title, movie.img)}
                >
                  <FaHeart
                    size={24}
                    className=" absolute top-4 left-4 text-red-500"
                  />
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
