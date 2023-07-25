"use client";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";

const Heart = ({ title, id, poster_path, like }) => {
  const { user } = UserAuth();
  const userID = doc(db, "users", `${user?.email}`);

  const heartMovie = async () => {
    if (user?.email) {
      if (like == false) {
        like = true;
        console.log("try to like");
        await updateDoc(userID, {
          savedShows: arrayUnion({
            id: id,
            title: title,
            img: poster_path,
          }),
        });
      } else {
        like = false;
        console.log("try to un like");
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
    <p onClick={heartMovie}>
      {like ? (
        <FaHeart size={24} className="  text-red-500" />
      ) : (
        <FaRegHeart size={24} className="  text-gray-50" />
      )}
    </p>
  );
};

export default Heart;
