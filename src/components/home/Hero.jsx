import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    // w-full এবং flex justify-center দিয়ে পুরো সেকশনকে মাঝখানে এলাইন করা হয়েছে
    <section className="bg-indigo-100 py-16 md:py-20 lg:py-28 w-full flex justify-center">
      
      {/* মোবাইলে w-11/12 এবং বড় স্ক্রিনে w-10/12 রেসপন্সিভ উইডথ */}
      <div className="w-11/12 md:w-10/12 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left Content (মোবাইলে টেক্সট নিচে নামাতে order-2 ব্যবহার করা হয়েছে) */}
        <div className="order-2 lg:order-1 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
            Discover & Read
            <br />
            Original Ebooks
          </h1>

          <p className="mt-6 text-gray-700 text-base md:text-lg max-w-xl leading-relaxed">
            Explore thousands of original ebooks from talented writers around the world.
          </p>

          <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-8 rounded-xl font-semibold transition duration-300 shadow-md">
           
            Browse Ebooks 

          </button>
        </div>

        {/* Right Image (আপনার পাঠানো নতুন লাইব্রেরি ইমেজ) */}
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
