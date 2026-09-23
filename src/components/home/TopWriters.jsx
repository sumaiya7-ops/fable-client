"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Feather,
  Sparkles,
} from "lucide-react";

const defaultAvatar =
  "https://postimg.cc";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    axios
      .get("https://onrender.com")
      .then((res) => {
        setWriters(res.data);
      })
      .catch((error) => {
        console.error("Failed to load top writers:", error);
      });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#EEF2FF] py-20 sm:py-24 lg:py-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
              <Feather size={16} />
              <span>Featured Authors</span>
              <Sparkles size={15} className="text-emerald-500" />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl lg:text-5xl">
              Meet the voices behind
              <span className="block bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                unforgettable stories.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:pb-1">
            Discover talented writers whose stories, ideas, and imagination
            continue to inspire readers around the world.
          </p>
        </div>

        {/* Writer cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
          {writers.map((writer, index) => (
            <article
              key={writer._id}
              className="group relative flex flex-col h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-2 shadow-[0_15px_45px_rgba(79,70,229,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-[0_25px_60px_rgba(79,70,229,0.16)]"
            >
              {/* Rank badge */}
              <div className="absolute left-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-sm font-bold text-indigo-600 shadow-md backdrop-blur">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-[22px] flex-shrink-0">
                <img
                  src={writer.avatar?.trim() || defaultAvatar}
                  alt={writer.name}
                  className="h-72 w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent opacity-70" />

                {/* Book count */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  <BookOpen size={14} />
                  {writer.totalBooks} Books
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-5 pt-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1E1B4B] transition-colors duration-300 group-hover:text-indigo-600 line-clamp-1">
                    {writer.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">
                    Explore books and stories by this featured author.
                  </p>
                </div>

                <div className="mt-5 pt-2">
                  <Link
                    href={`/browse?search=${encodeURIComponent(writer.name)}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-all duration-300 hover:gap-3 hover:text-indigo-800"
                  >
                    Explore Books
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {writers.length === 0 && (
          <div className="rounded-3xl border border-white/80 bg-white/70 px-6 py-14 text-center shadow-sm backdrop-blur">
            <BookOpen className="mx-auto text-indigo-400" size={32} />

            <h3 className="mt-4 text-lg font-bold text-[#1E1B4B]">
              No featured writers yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check back soon to discover amazing authors.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
