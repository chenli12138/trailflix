"use client";
import Movie from "../components/Movie";
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

  // Slider part. rowID is added for controlling different rows
  const slideLeft = () => {
    let sliderL = document.getElementById("slider" + rowID);
    sliderL.scrollLeft = sliderL.scrollLeft - 500;
  };
  const slideRight = () => {
    let sliderR = document.getElementById("slider" + rowID);
    sliderR.scrollLeft = sliderR.scrollLeft + 500;
  };

  // Loading Movie Data
  useEffect(() => {
    async function fetchData() {
      try {
        // Send a request to your API route
        const response = await fetch(`/api/${fetchURL}`); // Relative URL for the API route
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Loading Likes from Firebase
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLikes(doc.data()?.savedShows);
    });
  }, [user?.email]);

  // Add likes based on Firebase user's Like record
  useEffect(() => {
    if (data != null && likes != null) {
      const updatedData = data.results.map((item) => {
        const foundItem = likes.find((x) => x.id === item.id);
        const like = foundItem ? true : false;
        return { ...item, like };
      });
      setMovie(updatedData);
    } else if (data != null) {
      const updatedData = data.results.map((item) => ({
        ...item,
        like: false,
      }));
      setMovie(updatedData);
    }
  }, [data, likes]);

  /* for Degbugging

  useEffect(() => {
    console.log(data);
  }, [data]);
  */

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
