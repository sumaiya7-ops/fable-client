"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

// 🛠️ নেভবার থেকে ইউজার স্টেট এবং লগআউট ফাংশন প্রোপস হিসেবে রিসিভ করা হলো
export default function MobileSidebar({ user, handleLogout }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // নামের প্রথম অক্ষর বড় হাতের অক্ষরে নেওয়ার ফাংশন (নেভবারের মতো হুবহু)
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/browse" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ...(user
      ? [
          {
            name: "Dashboard",
            href:
              user.role === "admin"
                ? "/dashboard/admin"
                : user.role === "writer"
                ? "/dashboard/writer"
                : "/dashboard/user",
          },
        ]
      : []),
  ];
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-black p-2 hover:bg-indigo-50 rounded-lg transition"
      >
        <Menu size={28} />
      </button>

      {/* ব্যাকড্রপ প্রিমিয়াম bg-black/40 ওভারলে */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible bg-black/40" : "invisible bg-black/0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#FAFAF8] border-l border-gray-200 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black text-black">Fable</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-2">
            {/* মোবাইল ইউজার প্রোফাইল ডিসপ্লে (লগইন থাকলে দেখাবে) */}
            {user && (
              <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm shrink-0">
                  {getInitial(user.name)}
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-indigo-900 truncate">{user.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                </div>
              </div>
            )}

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition text-sm ${
                  pathname === link.href
                    ? "bg-gray-200 text-indigo-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* ডাইনামিক অ্যাকশন বাটন (লগইন বনাম গেট স্টার্টেড) */}
            {user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="mt-6 bg-red-500 text-white py-3 rounded-xl text-center font-semibold hover:bg-red-600 transition text-sm cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-6 bg-indigo-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-indigo-700 transition text-sm"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
