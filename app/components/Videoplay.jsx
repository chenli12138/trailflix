"use client";
import React, { useState, useEffect } from "react";
import apiConfig from "../api/apiConfig";

const Videoplay = ({ close, trailer }) => {
  const videoLink = `https://api.themoviedb.org/3/movie/${trailer}/videos?api_key=a629c8b4f55ced2a59abb54b4b198ef8`;
  const [link, setLink] = useState("");

  // Filter out trailers from other videos
  useEffect(() => {
    apiConfig(videoLink).then((res) => {
      const trailerKeys = res.results
        .filter((item) => item.name.toLowerCase().includes("trailer"))
        .map((item) => item.key);

      if (trailerKeys.length > 0) {
        const randomIndex = Math.floor(Math.random() * trailerKeys.length);
        setLink(trailerKeys[randomIndex]);
      }
    });
    // Apply overflow: hidden to the body element when the modal is opened
    document.body.style.overflow = "hidden";
    return () => {
      // Cleanup function: Remove overflow: hidden when the modal is closed
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      onClick={close}
      className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center z-[101]"
    >
      <div className=" fixed top-0 right-0 w-full h-full bg-gray-500/50 pointer-events-none"></div>
      <iframe
        className="aspect-video w-full sm:w-1/2 z-10"
        src={`https://www.youtube.com/embed/${link}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Videoplay;
