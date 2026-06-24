"use client"; 

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("reader");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf8] px-4 py-12">
      
      {/* ১. লোগো এবং কার্ডের মাঝখানে বড় স্পেস */}
      <h1 className="text-4xl font-bold text-center text-[#6c43f5] mb-10 tracking-wide drop-shadow-[0_0_15px_rgba(126,91,239,0.3)]">
        Fable
      </h1>

      {/* মেইন রেজিস্ট্রেশন কার্ড কন্টেইনার - আপনার লগইন পেজের মতো কালার bg-[#32448b] */}
      <div className="w-8/12 max-w-[480px] mx-auto bg-[#eceff9] border  rounded-2xl p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.4)] flex flex-col gap-8">

        {/* ২. Create Your Account সেকশন */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Create Your Account
          </h2>
          <p className="text-gray-800 text-sm mt-2 opacity-80">
            Join Fable and start your journey.
          </p>
        </div>

        {/* ৩. ফর্ম সেকশন */}
        <form className="flex flex-col gap-6">

          {/* ১. ফুল নেম ইনপুট গ্রুপ */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-900 block pl-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full h-8 lg:h-10 md:h-10 bg-indigo-100 border border-[#6a83e9] p-5 rounded-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
            />
          </div>

          {/* ২. ইমেইল ইনপুট গ্রুপ */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-black block pl-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-8 lg:h-10 md:h-10 bg-indigo-100 border border-[#748be7] p-5 rounded-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
            />
          </div>

          {/* ৩. পাসওয়ার্ড ইনপুট গ্রুপ (চোখ আইকন সহ) */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-black block pl-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full h-8 lg:h-10 md:h-10 bg-indigo-100 border border-[#687dce] p-5 pr-12 rounded-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 transition-colors text-xl cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* ৪. কনফার্ম পাসওয়ার্ড ইনপুট গ্রুপ (চোখ আইকন সহ) */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-900 block pl-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full h-8 lg:h-10 md:h-10 bg-indigo-100 border border-[#7c91e4] p-5 pr-12 rounded-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 transition-colors text-xl cursor-pointer"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* ৫. চুজ রোল সেকশন (রেডিও বাটন ডিজাইন) */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-800 block pl-1">
              Choose Role
            </label>
            <div className="grid grid-cols-2 gap-4">
              
              {/* পাঠক রোল বাটন */}
              <label 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-indigo-100 ${
                  role === "reader" ? "border-[#583ae2]" : "border-[#1e3078]"
                }`}
                onClick={() => setRole("reader")}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role === "reader" ? "border-[#583ae2]" : "border-red-500"
                }`}>
                  {role === "reader" && <div className="w-2 h-2 bg-[#583ae2] rounded-full"></div>}
                </div>
                <span className="text-sm text-gray-800 font-medium">I'm a Reader</span>
              </label>

              {/* লেখক রোল বাটন */}
              <label 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-indigo-100 ${
                  role === "writer" ? "border-[#583ae2]" : "border-[#2b3765]"
                }`}
                onClick={() => setRole("writer")}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role === "writer" ? "border-[#583ae2]" : "border-red-500"
                }`}>
                  {role === "writer" && <div className="w-2 h-2 bg-[#583ae2] rounded-full"></div>}
                </div>
                <span className="text-sm text-gray-800 font-medium">I'm a Writer</span>
              </label>

            </div>
          </div>

          {/* রেজিস্ট্রেশন মেইন বড় বাটন */}
          <div className="mt-2">
            <button
              type="submit"
              className="w-full text-white font-semibold rounded-xl text-center transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg cursor-pointer"
              style={{
                backgroundColor: "#583ae2",
                paddingTop: "18px",
                paddingBottom: "18px",
                boxShadow: "0 4px 15px rgba(88, 58, 226, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#472ec4";
                e.currentTarget.style.boxShadow = "0 6px 25px rgba(88, 58, 226, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#583ae2";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(88, 58, 226, 0.3)";
              }}
            >
              Register
            </button>
          </div>

        </form>

        {/* লগইন লিংক টেক্সট - গ্লোবাল থিম বাইপাস ট্রিক */}
        <p className="text-center text-gray-700 text-xs sm:text-sm mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:text-[#9677ff] font-semibold transition-colors inline-block ml-1"
          >
            <span style={{ color: "#10B981" }}>Login</span>
          </Link>
        </p>

      </div>

    </div>
  );
}
