"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b396a] px-4 py-12">
      <div className="w-10/12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
        
        {/* অ্যাসাইনমেন্টের রিকোয়ারমেন্ট অনুযায়ী ইলাস্ট্রেশন কন্টেইনার */}
        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] flex justify-center">
          <Image
            src="https://i.postimg.cc/VLSnLsfv/404.jpg"
            alt="Astronaut in Space 404 Illustration"
            width={450}
            height={450}
            className="w-full h-auto object-contain animate-bounce [animation-duration:4s]"
            priority
            unoptimized // প্রজেক্ট লাইভ করার সময় যেন নেক্সট ইমেজ ডোমেইন এরর থ্রো না করে
          />
        </div>
        {/* রিক্রুটার-ফ্রেন্ডলি টাইপোগ্রাফি ও ম্যাসেজ ব্লক */}
        <div className="w-full text-center md:text-left max-w-md">
          <h1 className="text-7xl sm:text-8xl font-bold text-indigo-500 tracking-wider">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
            Page Not Found
          </h2>

          <p className="text-gray-300 mt-4 text-sm sm:text-base leading-relaxed">
            Oops! The page you are looking for doesn't exist. It looks like you are lost in space.
          </p>

          {/* হোম পেজে ফিরে যাওয়ার পালসিং বাটন */}
          <Link
            href="/"
            className="inline-block mt-8 text-white font-semibold rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 animate-pulse [animation-duration:3s]"
            style={{
              backgroundColor: "#583ae2",
              paddingLeft: "60px",
              paddingRight: "60px",
              paddingTop: "16px",
              paddingBottom: "16px",
              fontSize: "18px",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 20px rgba(88, 58, 226, 0.4)",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#472ec4";
              e.currentTarget.style.boxShadow = "0 6px 30px rgba(88, 58, 226, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#583ae2";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(88, 58, 226, 0.4)";
            }}
          >
            Go Back Home
          </Link>
        </div>

      </div>
    </div>
  );
}
