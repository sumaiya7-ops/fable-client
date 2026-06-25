"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {

  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-indigo-100 border-b border-indigo-200 w-full flex justify-center text-black">
      
      <div className="w-11/12 md:w-10/12 max-w-7xl h-20 flex items-center justify-between">

        <Link
          href="/"
          className="text-3xl font-extrabold text-indigo-600"
        >
          Fable
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className={`font-medium transition ${
              pathname === "/"
                ? "text-indigo-600"
                : "text-black hover:text-indigo-600"
            }`}
          >
            Home
          </Link>

          <Link
            href="/browse"
            className={`font-medium transition ${
              pathname === "/browse"
                ? "text-indigo-600"
                : "text-black hover:text-indigo-600"
            }`}
          >
            Browse Ebooks
          </Link>

          <Link
            href="/about"
            className={`font-medium transition ${
              pathname === "/about"
                ? "text-indigo-600"
                : "text-black hover:text-indigo-600"
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`font-medium transition ${
              pathname === "/contact"
                ? "text-indigo-600"
                : "text-black hover:text-indigo-600"
            }`}
          >
            Contact
          </Link>
            <Link
    href="/dashboard"
    className="!text-black font-medium hover:text-indigo-600 transition"
  >
    Dashboard
  </Link>

        </div>
         <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 !text-white px-8 py-6 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>
        </div>

      
     <MobileSidebar />


      </div>

    </nav>
  );
}