import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (

    <section className="bg-indigo-100 py-16 md:py-20 lg:py-28 w-full flex justify-center">
      

      <div className="w-11/12 md:w-10/12 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        <div className="order-2 lg:order-1 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
            Discover & Read
            <br />
            Original Ebooks
          </h1>

          <p className="mt-6 text-gray-700 text-base md:text-lg max-w-xl leading-relaxed">
            Explore thousands of original ebooks from talented writers around the world.
          </p>

          <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white  rounded-md font-semibold transition duration-300 shadow-md">
           
            Browse Ebooks 

          </button>
        </div>

        
        <div className="order-1 lg:order-2 w-full flex justify-center">
          <img
            src="https://i.postimg.cc/1znS3RDG/book-2.jpg"
            alt="Library student reading books"
            className="w-full object-cover rounded-3xl shadow-xl border border-indigo-200 aspect-[4/3] lg:aspect-auto"
          />
        </div>

      </div>
    </section>
  );
}
