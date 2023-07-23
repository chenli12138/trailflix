import { requestTrending, requestUpcoming, requestTop } from "./api/keys";
import Hero from "./components/Hero";
import Row from "./components/Row";
import apiConfig from "./api/apiConfig";

export default async function Home() {
  const heros = await apiConfig(requestTrending.Trendings);
  const movies = heros.results;
  // Create different Hero pages
  const hero = movies[Math.floor(Math.random() * movies.length)];
  return (
    <>
      <Hero hero={hero} />
      <Row
        rowID={1}
        fetchURL={requestTrending.Trendings}
        rowName={requestTrending.requestName}
      />
      <Row
        rowID={2}
        fetchURL={requestUpcoming.Upcoming}
        rowName={requestUpcoming.requestName}
      />
      <Row
        rowID={3}
        fetchURL={requestTop.Top}
        rowName={requestTop.requestName}
      />
    </>
  );
}
