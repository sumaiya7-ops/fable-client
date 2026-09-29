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
    <section className="w-full bg-indigo-100 py-16 sm:py-20">
      <div className="mx-auto w-11/12 max-w-7xl md:w-10/12">
        {/* Section Title */}
        <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
          Ebook Genres
        </h2>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {genres.map((genre) => {
            const Icon = iconMap[genre.name] || FaBookOpen;

            return (
              <Link
                key={genre.name}
                href={`/browse?genre=${encodeURIComponent(genre.name)}`}
                className="
                  group
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
                  p-5
                  text-center
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:bg-indigo-50
                  hover:shadow-2xl
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-100
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  <Icon className="text-3xl text-indigo-600" />
                </div>

                {/* Genre Name */}
                <h3 className="mt-5 text-base font-bold text-gray-900 sm:text-lg">
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