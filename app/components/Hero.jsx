"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Videoplay from "./Videoplay";
import Link from "next/link";

export default function Hero() {
  const imgPath = "https://image.tmdb.org/t/p/original";
  const [modalVisible, setModalVisible] = useState(false);

  const [hero, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // Loading Movie Data
  useEffect(() => {
    async function fetchData() {
      try {
        // Send a request to your API route
        const response = await fetch("/api/trend"); // Relative URL for the API route
        const heros = await response.json();
        const movies = heros.results;
        // Create different Hero pages
        const hero = movies[Math.floor(Math.random() * movies.length)];
        setData(hero);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="absolute inset-0 z-40  bg-slate-400">
        <div className="w-full h-full bg-black z-30 animate-pulse"></div>
      </div>
    );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {hero && (
        <div className="relative h-screen mb-1 ">
          <div className="absolute inset-0 z-0 ">
            <Image
              className="w-full h-full object-cover opacity-90 "
              src={imgPath + hero?.backdrop_path}
              width={1920}
              height={1080}
              alt={hero?.title}
            />
            <div className="absolute inset-0 bg-gray-900 opacity-40  "></div>
          </div>
          <div className="absolute sm:top-[30%] top-[20%] p-4 sm:p-16">
            <div className="text-3xl sm:text-5xl">{hero?.title}</div>
            <div className="my-4">
              <button
                className=" bg-white text-gray-700 mr-4 py-2 px-5 hover:bg-red-600 hover:text-white "
                onClick={openModal}
              >
                Play
              </button>
              <Link href={`/${hero?.id}`}>
                <button className=" border border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-white">
                  More Info
                </button>
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              Released: {hero?.release_date}
            </div>
            <div className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mt-1">
              {hero?.overview}
            </div>
          </div>
        </div>
      )}
      {modalVisible && <Videoplay close={closeModal} trailer={hero.id} />}
    </>
  );
}
