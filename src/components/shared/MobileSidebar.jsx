"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Browse Ebooks",
      href: "/browse",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-black"
      >
        <Menu size={28} />
      </button>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open
            ? "visible bg-black"
            : "invisible bg-black/0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#FAFAF8] border-l border-gray-200 shadow-2xl transition-transform duration-300 ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black text-black">
              Fable
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition ${
                  pathname === link.href
                    ? "bg-gray-200 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-gray-900 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}