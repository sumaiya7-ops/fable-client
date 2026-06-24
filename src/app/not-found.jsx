"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b396a] px-4 py-12">
      
      {/* মেইন কন্টেইনার: আপনার রিকোয়েস্ট অনুযায়ী w-10/12 সেট করা হয়েছে */}
      <div className="w-10/12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
        
        {/* বাম পাশের অংশ: অ্যাস্ট্রোনট ইমেজ (রেসপনসিভ সাইজ) */}
        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] flex justify-center">
          <Image
            src="https://i.postimg.cc/VLSnLsfv/404.jpg" // আপনার public/ ফোল্ডারের ছবির নাম ও এক্সটেনশন অনুযায়ী পরিবর্তন করে নিবেন
            alt="Astronaut in Space"
            width={450}
            height={450}
            className="w-full h-auto object-contain animate-bounce [animation-duration:4s]"
            priority
          />
        </div>

        {/* ডান পাশের অংশ: টেক্সট কন্টেন্ট */}
        <div className="w-full text-center md:text-left max-w-md">

          <h1 className="text-7xl sm:text-8xl font-bold text-indigo-500 tracking-wider">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
            Page Not Found
          </h2>

          <p className="text-gray-300 mt-4 text-sm sm:text-base leading-relaxed">
            Oops! The page you are looking for doesn't exist.
          </p>

       {/* অ্যানিমেশন এবং হভার ইফেক্ট সহ বড় বাটন */}
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
              boxShadow: "0 4px 20px rgba(88, 58, 226, 0.4)"
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
