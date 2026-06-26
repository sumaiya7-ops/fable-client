"use client"; 

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { type, value } = e.target;
    setFormData((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf8] px-4 py-12" >
      
      <h1 className="text-4xl font-bold text-center text-[#6c43f5] mb-10 tracking-wide drop-shadow-[0_0_15px_rgba(126,91,239,0.3)]">
        Fable
      </h1>

      <div className="w-8/12 max-w-[480px] mx-auto bg-[#eceff9] rounded-3xl p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.4)] flex flex-col gap-8" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Welcome Back!
          </h2>
          <p className="text-gray-800 text-sm mt-2 opacity-80">
            Login to continue to Fable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-600 block pl-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-[#dee2f5] border border-indigo-200 rounded-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              required
            /> 
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-600 block pl-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              /* 🟢 text-white কেটে text-gray-800 করা হলো যেন হালকা ব্যাকগ্রাউন্ডে পাসওয়ার্ড টাইপ করলে ডটগুলো দেখা যায় */
              className="w-full p-4 bg-[#dee2f5] border border-indigo-200 rounded-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              required
            />
          </div>

          <div className="flex justify-end mt-1">
            {/* 🟢 ইনলাইন সিএসএস টাইপো ফিক্স করে লিংক সচল করা হলো */}
            <Link
              href="/forgot-password"
              className="text-[#f03737] hover:text-[#9677ff] text-xs font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

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
              Login
            </button>
          </div>

        </form>

        <div className="relative py-2 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#232d52]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#dee4fc] px-5 text-gray-800 text-[11px] tracking-wider">
              or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <button
            type="button"
            className="w-full bg-[#35437d] border border-[#2b3765] text-gray-200 py-4 rounded-xl flex items-center justify-center gap-3 text-base sm:text-lg font-semibold hover:bg-[#1b2343] hover:border-[#384883] transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>

          <p className="text-center text-gray-500 text-xs sm:text-sm mt-2">
            Don't have an account?{" "}
            {/* 🟢 ইনলাইন সিএসএস টাইপো ফিক্স করে লিংকটি রেজিস্টার রাউটে যুক্ত করা হলো */}
            <Link
              href="/register"
              className="text-[#f03737] hover:text-[#9677ff] font-semibold transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
