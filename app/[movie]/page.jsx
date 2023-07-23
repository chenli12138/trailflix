"use client";
import Image from "next/image";
import { BsDot, BsFillStarFill, BsPlayCircle } from "react-icons/bs";
import apiConfig from "../api/apiConfig";
import { useState, useEffect } from "react";
import Videoplay from "../components/Videoplay";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Heart from "../components/Heart";

export default function MovieDetail({ params }) {
  const { movie } = params;
  const imgPath = "https://image.tmdb.org/t/p/original";
  const [data, setData] = useState(null);
  const [like, setLike] = useState(null);
  const [heart, setHeart] = useState(null);

  const { user } = UserAuth();

  // Load movie details
  useEffect(() => {
    apiConfig(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=a629c8b4f55ced2a59abb54b4b198ef8`
    ).then((res) => {
      setData(res);
    });
  }, []);
  // Set up modal for video
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  // Load Likes from firebase
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLike(doc.data()?.savedShows);
    });
  }, [user?.email]);

  useEffect(() => {
    if (data != null && like != null) {
      const foundItem = like.find((x) => x.id === data.id);
      const found = foundItem ? true : false;
      setHeart(found);
    } else if (data != null) {
      setHeart(false);
    }
  }, [data, like]);

  return (
    <>
      {data && (
        <div className="relative h-screen w-screen pt-[8vh] sm:pt-[10vh] sm:px-32 px-4">
          <Image
            className="fixed top-0 right-0 w-screen h-screen object-cover z-[-2] opacity-50 "
            src={imgPath + data?.backdrop_path}
            width={1920}
            height={1080}
            alt={data?.title}
            priority={true}
          />
          <div className="w-full md:flex md:gap-8 md:justify-between">
            <div className="relative">
              <Image
                className="rounded-md object-cover md:w-[28vw] w-full"
                src={imgPath + data?.poster_path}
                width={700}
                height={700}
                alt={data?.title}
              />
              <div className=" absolute top-0 right-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-slate-400/40 flex items-center justify-center duration-300">
                <BsPlayCircle
                  className="z-[11] cursor-pointer"
                  size={96}
                  onClick={openModal}
                />
              </div>
            </div>
            <div className="md:w-[50vw] w-full">
              <h2 className="md:text-6xl text-2xl md:font-normal font-semibold mb-2">
                {data?.title}
              </h2>
              <div className="flex my-2 items-center gap-2 text-gray-300">
                <h2 className="md:text-lg flex items-center gap-2">
                  <BsFillStarFill className=" text-yellow-400" />
                  {data?.vote_average.toFixed(1)}
                </h2>
                <BsDot />
                <h2 className="md:text-lg">
                  {data?.release_date.substring(0, 4)}
                </h2>
                <BsDot />
                <h2 className="md:text-lg">{data?.runtime} minutes</h2>
              </div>
              <div className="flex gap-4 items-center">
                <h2 className="bg-green-500 inline-block my-2 py-2 px-4 rounded-md">
                  {data?.status}
                </h2>
                <Heart
                  id={movie}
                  title={data?.title}
                  poster_path={data?.poster_path}
                  like={heart}
                />
              </div>
              <p className="mt-2">{data?.overview}</p>
            </div>
          </div>
        </div>
      )}
      {modalVisible && <Videoplay close={closeModal} trailer={movie} />}
    </>
  );
}
