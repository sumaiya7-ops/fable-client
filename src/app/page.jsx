import Navbar from "../components/shared/Navbar";
import Hero from "../components/home/Hero";
import FeaturedBooks from "../components/home/FeaturedBooks";
import TopWriters from "../components/home/TopWriters";
import Genres from "../components/home/Genres";
import Footer from "../components/shared/Footer";

export default function Home() {
  return (
    <>
        <div className="bg-indigo-100 min-h-screen flex flex-col gap-16 pb-16">

      <Navbar />
      <Hero />
      <FeaturedBooks />
      <TopWriters />
      <Genres />
      <div className="h-8"></div>
         <Footer />
      </div>
    </>
  );
}