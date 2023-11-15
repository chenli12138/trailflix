import Hero from "./components/Hero";
import Row from "./components/Row";
import Footer from "./components/footer";

export default async function Home() {
  return (
    <>
      <Hero />
      <Row rowID={1} fetchURL={"trend"} rowName={"Trending"} />
      <Row rowID={2} fetchURL={"coming"} rowName={"Upcoming"} />
      <Row rowID={3} fetchURL={"top"} rowName={"Top Rated"} />
      <Footer />
    </>
  );
}
