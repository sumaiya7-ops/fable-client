"use client";

import React from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaUserSecret,
  FaHeart,
  FaRocket,
  FaDragon,
  FaGhost,
  FaBolt,
  FaLandmark,
} from "react-icons/fa";

const genres = [
  { name: "Fiction", icon: FaBookOpen },
  { name: "Mystery", icon: FaUserSecret },
  { name: "Romance", icon: FaHeart },
  { name: "Sci-Fi", icon: FaRocket },
  { name: "Fantasy", icon: FaDragon },
  { name: "Horror", icon: FaGhost },
  { name: "Thriller", icon: FaBolt },
  { name: "History", icon: FaLandmark },
];

export default function Genres() {
  return (
    <section className="bg-indigo-100 w-full py-20 flex justify-center">
      <div className="w-11/12 md:w-10/12 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-white text-indigo-600 text-sm font-semibold shadow-sm">
              📚 Browse Categories
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
              Ebook Genres
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-gray-600 max-w-md">
            Explore thousands of books across your favorite genres and discover your next read.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {genres.map((genre, index) => {
            const Icon = genre.icon;

            return (
              <Link
                key={genre.name}
                href={`/browse?genre=${encodeURIComponent(genre.name)}`}
                className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-200 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                  <Icon className="text-2xl text-indigo-600" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 mt-5 text-center font-bold text-gray-900">
                  {genre.name}
                </h3>

                {/* Count */}
                <p className="relative z-10 text-center text-sm text-gray-500 mt-2">
                  {500 + index * 200}+ Books
                </p>

                {/* Hover CTA */}
                <div className="relative z-10 mt-4 text-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-indigo-600 font-semibold text-sm">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}