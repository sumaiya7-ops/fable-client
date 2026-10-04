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

// তোমার backend-এর আসল Top Writers endpoint এখানে বসাবে
 const TOP_WRITERS_API = "https://fable-server-z2xt.onrender.com/top-writers";


const defaultAvatar = "/default-avatar.png";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopWriters = async () => {
      try {
        const res = await axios.get(TOP_WRITERS_API);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.writers ||
            res.data?.topWriters ||
            [];

        setWriters(data);
      } catch (error) {
        console.error("Failed to load top writers:", error);
        setWriters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopWriters();
  }, []);

  return (
    <section className="flex w-full justify-center bg-indigo-100 py-20">
      <div className="w-10/12 max-w-7xl">       

      {/* Main Container */}
      <div className="w-11/12 md:w-10/12 ">
        {/* Heading */}
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
              <Feather size={16} />

              <span>Featured Authors</span>

              <Sparkles
                size={15}
                className="text-emerald-500"
              />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl lg:text-5xl">
              Meet the voices behind

              <span className="mt-2 block bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                unforgettable stories.
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:pb-1">
            Discover talented writers whose stories, ideas, and imagination
            continue to inspire readers around the world.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl border border-white bg-white p-2 shadow-sm"
              >
                <div className="h-72 w-full rounded-[22px] bg-slate-200" />

                <div className="px-4 pb-5 pt-5">
                  <div className="h-6 w-3/4 rounded bg-slate-200" />

                  <div className="mt-4 h-4 w-full rounded bg-slate-200" />

                  <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Writer Cards */}
        {!loading && writers.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {writers.map((writer, index) => {
              const writerName =
                writer?.name ||
                writer?.writerName ||
                writer?.authorName ||
                "Unknown Author";

              const avatar =
                writer?.avatar?.trim() ||
                writer?.photo?.trim() ||
                writer?.image?.trim() ||
                defaultAvatar;

              const totalBooks =
                writer?.totalBooks ??
                writer?.bookCount ??
                writer?.booksCount ??
                0;

              return (
                <article
                  key={writer?._id || writer?.id || index}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-2 shadow-[0_15px_45px_rgba(79,70,229,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-[0_25px_60px_rgba(79,70,229,0.16)]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[22px]">
                    <img
                      src={avatar}
                      alt={writerName}
                      onError={(e) => {
                        e.currentTarget.src = defaultAvatar;
                      }}
                      className="h-72 w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Ranking */}
                    <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-sm font-bold text-indigo-600 shadow-md backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Book Count */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      <BookOpen size={14} />

                      <span>
                        {totalBooks}{" "}
                        {totalBooks === 1 ? "Book" : "Books"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col px-4 pb-5 pt-5">
                    <h3 className="truncate text-xl font-bold text-[#1E1B4B] transition-colors duration-300 group-hover:text-indigo-600">
                      {writerName}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Explore books and stories by this featured author.
                    </p>

                    {/* Button */}
                    <Link
                      href={`/browse?search=${encodeURIComponent(
                        writerName
                      )}`}
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-indigo-600 transition-all duration-300 hover:gap-3 hover:text-indigo-800"
                    >
                      <span>Explore Books</span>

                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && writers.length === 0 && (
          <div className="rounded-3xl border border-white/80 bg-white/70 px-6 py-14 text-center shadow-sm backdrop-blur">
            <BookOpen
              className="mx-auto text-indigo-400"
              size={36}
            />

            <h3 className="mt-4 text-lg font-bold text-[#1E1B4B]">
              No featured writers yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check back soon to discover amazing authors.
            </p>
          </div>
        )}
           </div> 
      </div>
    </section>
  );
}