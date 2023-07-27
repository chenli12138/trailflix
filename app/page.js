import Hero from "./components/Hero";
import Row from "./components/Row";

export default async function Home() {
  const res = await fetch("http://trailflix-pi.vercel.app/api/trend");
  const heros = await res.json();
  const movies = heros.results;
  // Create different Hero pages
  const hero = movies[Math.floor(Math.random() * movies.length)];
  return (
    <>
      <Hero hero={hero} />
      <Row rowID={1} fetchURL={"trend"} rowName={"Trending"} />
      <Row rowID={2} fetchURL={"coming"} rowName={"Upcoming"} />
      <Row rowID={3} fetchURL={"top"} rowName={"Top Rated"} />
    </>
  );
}
