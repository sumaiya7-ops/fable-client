"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";


export default function TopWriters() {
  const [writers, setWriters] = useState([]);

useEffect(() => {
  axios
    .get("https://fable-server-z2xt.onrender.com/writers/top")
    .then((res) => {
      setWriters(res.data);
    });
}, []);
  return (
    <section className="bg-indigo-100 mt-20 mb-20 w-full flex justify-center py-16">
      <div className="w-11/12 md:w-10/12 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-indigo-600 font-semibold tracking-widest uppercase mb-2">
              🌍 International Best Authors
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Top Writers
            </h2>
          </div>

          <p className="text-gray-600 mt-4 md:mt-0 max-w-md">
            Explore the most influential and best-selling writers who shaped
            literature around the world.
          </p>
        </div>
        <div className="h-2"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"  >
          {writers.map((writer) => (
            <div
              key={writer._id}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            style={{ padding: "6px"  }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                src={writer.avatar}
                  alt={writer.name}
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3 className="text-xl font-bold text-gray-900">
                  {writer.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {writer.totalSales} Sales
                </p>

                {/* 🟢 button কেটে রিকোয়ারমেন্ট অনুযায়ী Link ট্যাগ দেওয়া হলো যেন প্রোফাইল পেজে নিয়ে যায় */}
                <Link 
                  href={`/browse?search=${writer.name}`}
                  className="inline-block mt-5 text-black font-semibold hover:text-indigo-800 transition text-sm cursor-pointer"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
