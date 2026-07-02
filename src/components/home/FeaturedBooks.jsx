
"use client"; 

import { useState, useEffect } from "react";

import axios from "axios";
import { motion } from "framer-motion";


export default function FeaturedBooks() {
  const [expandedId, setExpandedId] = useState(null);
const [books, setBooks] = useState([]);
useEffect(() => {
  axios
    .get("https://fable-server-z2xt.onrender.com/ebooks?limit=6")
    .then((res) => {
      setBooks(res.data.ebooks);
    });
}, []);

  const toggleDescription = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section className="bg-indigo-100 py-16 md:py-20 w-full flex justify-center">
      <div className="w-11/12 md:w-10/12 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 tracking-tight text-left">
          Featured Ebooks
        </h2>
        <div className="h-2"></div>

        <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
>
          {books.map((item) => {
           const isExpanded = expandedId === item._id;
            
            return (
  <motion.div
    key={item._id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
   transition={{
  duration: 0.6,
  ease: "easeOut",
}}
   whileHover={{
  scale: 1.05,
  y: -10,
  boxShadow: "0px 20px 40px rgba(99,102,241,0.25)",
}}
    className="bg-white rounded-2xl overflow-hidden shadow-md transition duration-300 flex flex-col"
    style={{ padding: "6px" }}
  >
                <div className="w-full h-72 overflow-hidden bg-gray-100">
                  <img 
                    src={item.coverUrl}
                    alt={`Ebook Cover - ${item.title}`} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-black text-lg line-clamp-1" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-red-500 mt-1 text-sm font-medium">
                      By {item.writerName}
                    </p>
                    
                    <p className="text-gray-600 mt-3 text-sm">
                     {isExpanded
  ? item.description
  : `${(item.description || "").slice(0, 40)}...`}
                      <button
                        onClick={() => toggleDescription(item._id)}
                        className="text-indigo-600 font-semibold ml-1 hover:underline text-xs inline-block focus:outline-none"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    </p>
                  </div>

                  <p className="text-red-600 font-bold mt-5 text-base">
                   $ {item.price}
                  </p>
                </div>
              </motion.div>
            );
          })}
      
      </motion.div>
        </div>
    </section>
  );
}
