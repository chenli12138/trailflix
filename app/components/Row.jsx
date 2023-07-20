"use client";
import Movie from "../components/Movie";
import apiConfig from "../api/apiConfig";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Row({ fetchURL, rowName, rowID }) {
  const [data, setData] = useState(null);
  const [likes, setLikes] = useState(null);
  const [movie, setMovie] = useState(null);
  const { user } = UserAuth();

  const slideLeft = () => {
    let sliderL = document.getElementById("slider" + rowID);
    sliderL.scrollLeft = sliderL.scrollLeft - 500;
  };
  const slideRight = () => {
    let sliderR = document.getElementById("slider" + rowID);
    sliderR.scrollLeft = sliderR.scrollLeft + 500;
  };
  // console.log("Row: " + data.movie.title);

  useEffect(() => {
    apiConfig(fetchURL).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLikes(doc.data()?.savedShows);
    });
    console.log("like");
  }, [user?.email]);

  // console.log(data);
  useEffect(() => {
    if (data != null && likes != null) {
      const updatedData = data.results.map((item) => {
        const foundItem = likes.find((x) => x.id === item.id);
        const like = foundItem ? true : false;
        return { ...item, like };
      });
      console.log("updatedData");
      setMovie(updatedData);
    } else if (data != null) {
      const updatedData = data.results.map((item) => ({
        ...item,
        like: false,
      }));
      setMovie(updatedData);
    }
  }, [data, likes]);

  return (
    <div>
      <div className="my-6 px-4 mx-auto text-4xl">{rowName}</div>

      <div className="relative flex items-center mb-4 group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white  text-gray-900 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar"
        >
          {movie &&
            movie?.map((movie) => (
              <Movie
                key={movie?.id}
                id={movie?.id}
                title={movie?.title}
                poster_path={movie?.poster_path}
                like={movie.like}
              />
            ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white text-gray-900 rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
}
