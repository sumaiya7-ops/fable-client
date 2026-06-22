"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    // bg-indigo-100 এর সাথে !text-black যুক্ত করা হয়েছে যেন গ্লোবাল কোনো সাদা কালার এখানে কাজ না করে
    <nav className="sticky top-0 z-50 bg-indigo-100 border-b border-indigo-200 w-full flex justify-center !text-black">
      
      {/* কন্টেইনার */}
      <div className="w-11/12 md:w-10/12 max-w-7xl h-20 flex items-center justify-between">

        {/* Logo - ডার্ক মোডেও কালো রাখতে !text-black ব্যবহার করা হয়েছে */}
        <Link
          href="/"
          className="text-3xl font-extrabold !text-indigo-600"
        >
          Fable
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">

          <Link
            href="/"
            className="!text-black font-medium hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <Link
            href="/browse"
            className="!text-black font-medium hover:text-indigo-600 transition"
          >
            Browse Ebooks
          </Link>

          <Link
            href="/dashboard"
            className="!text-black font-medium hover:text-indigo-600 transition"
          >
            Dashboard
          </Link>

        </div>

        {/* Button */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 !text-white px-8 py-6 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden">
          <Menu size={28} className="!text-black" />
        </button>

      </div>
    </nav>
  );
}
