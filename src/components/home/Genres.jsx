"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

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

const iconMap = {
  Fiction: FaBookOpen,
  Mystery: FaUserSecret,
  Romance: FaHeart,
  "Sci-Fi": FaRocket,
  Fantasy: FaDragon,
  Horror: FaGhost,
  Thriller: FaBolt,
  History: FaLandmark,
};

export default function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          "https://fable-server-z2xt.onrender.com/genres/count"
        );

        setGenres(res.data);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section className="flex w-full justify-center bg-indigo-100 py-20">
      <div className="w-11/12 md:w-8/12 max-w-7xl">
        {/* Section Title */}
        <h2 className="mb-10 text-4xl font-bold text-gray-900">
          Ebook Genres
        </h2>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {genres.map((genre) => {
            const Icon = iconMap[genre.name] || FaBookOpen;

            return (
              <Link
                key={genre.name}
                href={`/browse?genre=${encodeURIComponent(genre.name)}`}
                className="
                  flex
                  min-h-[200px]
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-gray-100
                  bg-white
                  p-6
                  text-center
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-3
                  hover:bg-indigo-50
                  hover:shadow-2xl
                "
              >
                {/* Fixed Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Icon className="text-3xl text-indigo-600" />
                </div>

                {/* Genre Name */}
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {genre.name}
                </h3>

                {/* Book Count */}
                <p className="mt-2 text-sm font-semibold text-indigo-600">
                  {genre.count} Books
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}