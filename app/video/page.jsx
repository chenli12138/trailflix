import React from "react";

const Video = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className=" fixed top-0 right-0 w-full h-full bg-slate-700 opacity-30"></div>
      <iframe
        className="aspect-video w-full sm:w-1/2 z-10"
        src="https://www.youtube.com/embed/xNRJwmlRBNU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
