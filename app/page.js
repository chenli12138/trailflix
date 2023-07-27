"use client";
import Hero from "./components/Hero";
import Row from "./components/Row";
import { useState, useEffect } from "react";

export default function Home() {
  const [hero, setData] = useState(null);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {hero && <Hero hero={hero} />}
      <Row rowID={1} fetchURL={"trend"} rowName={"Trending"} />
      <Row rowID={2} fetchURL={"coming"} rowName={"Upcoming"} />
      <Row rowID={3} fetchURL={"top"} rowName={"Top Rated"} />
    </>
  );
}
