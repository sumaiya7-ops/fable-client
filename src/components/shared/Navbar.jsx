"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("fable_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("https://fable-server-z2xt.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user state", err);
        localStorage.removeItem("fable_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("fable_token");
    setUser(null);
    router.push("/login");
  };

  // নামের প্রথম অক্ষর বড় হাতের অক্ষরে নেওয়ার ফাংশন
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };
  return (
    <nav className="sticky top-0 z-50 bg-indigo-100 border-b border-indigo-200 w-full flex justify-center text-black">
      <div className="w-11/12 md:w-10/12 max-w-7xl h-20 flex items-center justify-between">
        
        <Link href="/" className="text-3xl font-extrabold text-indigo-800">
          Fable
        </Link>

        {/* ডেস্কটপ মেনু */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-medium transition ${pathname === "/" ? "text-indigo-600" : "text-black hover:text-indigo-600"}`}
          >
            Home
          </Link>

          <Link
            href="/browse"
            className={`font-medium transition ${pathname === "/browse" ? "text-indigo-600" : "text-black hover:text-indigo-600"}`}
          >
            Browse Ebooks
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className={`font-medium transition ${pathname.startsWith("/dashboard") ? "text-indigo-600" : "text-black hover:text-indigo-600"}`}
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/about"
            className={`font-medium transition ${pathname === "/about" ? "text-indigo-600" : "text-black hover:text-indigo-600"}`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`font-medium transition ${pathname === "/contact" ? "text-indigo-600" : "text-black hover:text-indigo-600"}`}
          >
            Contact
          </Link>
        </div>

        {/* ডানদিকের বাটন বা প্রোফাইল সার্কেল বাবল */}
        <div className="hidden md:block">
          {loading ? (
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-4" >
              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200" style={{ padding: "4px " }}>
                {/* 🛠️ এখানে ইমেজ ট্যাগ সরিয়ে গোল বেগুনী বাবল ও বড় হাতের অক্ষর সেট করা হয়েছে */}
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  {getInitial(user.name)}
                </div>
                <span className="text-sm font-semibold text-indigo-900 pr-1">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl font-medium transition cursor-pointer"
              style={{ padding: "6px " }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 !text-white rounded-xl font-semibold transition"
              style={{ padding: "8px 24px" }}
            >
              Get Started
            </Link>
          )}
        </div>

        <MobileSidebar user={user} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
