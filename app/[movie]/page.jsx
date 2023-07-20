"use client";
import Image from "next/image";

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imgPath = "https://image.tmdb.org/t/p/original";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=a629c8b4f55ced2a59abb54b4b198ef8`
  );
  const data = await res.json();

  return (
    <div className=" mx-16 my-8 xl:mx-32 relative ">
      <Image
        className="fixed top-0 right-0 w-full h-[90vh] object-cover z-[-2] opacity-50 "
        src={imgPath + data.backdrop_path}
        width={1920}
        height={1080}
        alt={data.title}
      />
      <div className="z-[-1] flex md:flex-wrap flex-wrap-reverse ">
        <div className=" w-100 lg:w-3/5 mr-8">
          <h2 className="lg:text-2xl">{data.title}</h2>
          <h2 className="lg:text-lg">{data.release_date}</h2>
          <h2 className="lg:text-lg">Runtime : {data.runtime} minutes</h2>
          <h2 className="bg-green-500 inline-block my-2 py-2 px-4 rounded-md">
            {data.status}
          </h2>
          <p>{data.overview}</p>
        </div>
        <div className="md:w-1/4 w-full">
          <Image
            className=" "
            src={imgPath + data.poster_path}
            width={1920}
            height={1080}
            alt={data.title}
          />
        </div>
      </div>
    </div>
  );
}
