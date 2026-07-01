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
        console.log(err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section className="bg-indigo-100 w-full py-20 flex justify-center">
      <div className="w-11/12 md:w-10/12 max-w-7xl">

        <h2 className="text-4xl font-bold mb-10 text-gray-900">
          Ebook Genres
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {genres.map((genre) => {
            const Icon = iconMap[genre.name] || FaBookOpen;

            return (
              <Link
                key={genre.name}
                href={`/browse?genre=${genre.name}`}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-center">
                  <Icon className="text-3xl text-indigo-600" />
                </div>

                <h3 className="text-center mt-4 font-bold">
                  {genre.name}
                </h3>

                <p className="text-center text-sm text-gray-500">
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