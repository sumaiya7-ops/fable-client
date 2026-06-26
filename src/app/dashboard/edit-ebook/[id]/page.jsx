"use client";

import { useParams, useState } from "next/navigation";
import React, { useState as useReactState } from "react";

// রিয়েল ডাটা অ্যারে ডিক্লেয়ার করা হলো (Unsplash হাই-কোয়ালিটি ইমেজের লিংকসহ)
const realBooksData = [
  {
    id: 1,
    title: "Thinking, Fast and Slow",
    writer: "Daniel Kahneman",
    price: 4.99,
    genre: "Psychology",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80",
    description: "Explores how we think using fast and slow systems of decision making. Daniel Kahneman takes readers through the cognitive biases and mental shortcuts that shape human judgment."
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    writer: "Yuval Noah Harari",
    price: 3.49,
    genre: "History",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80",
    description: "A fascinating exploration of humanity's journey from ancient hunter-gatherers to modern technological societies."
  },
  {
    id: 3,
    title: "Atomic Habits",
    writer: "James Clear",
    price: 2.99,
    genre: "Self Improvement",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    description: "An easy and proven framework for building good habits, breaking bad ones, and achieving remarkable results through small daily improvements."
  }
];

export default function EditEbookPage() {
  const { id } = useParams();
  
  // 🟢useState এরর ফিক্স করার জন্য সঠিক রিয়্যাক্ট স্টেট ডিক্লেয়ারেশন
  const [selectedImg, setSelectedImg] = useReactState(null);

  // আইডি অনুযায়ী নির্দিষ্ট বইয়ের ডাটা খুঁজে বের করা, না পেলে খালি অবজেক্ট ব্যাকআপ
  const book = realBooksData.find((b) => b.id === Number(id)) || {};

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md max-w-2xl mx-auto mt-10 border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Edit Ebook
      </h1>

      <form className="space-y-5">
        
        {/* ইবুক টাইটেল ইনপুট ফিল্ড */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ebook Title</label>
          <input
            defaultValue={book.title || "Silent Watcher"}
            className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* ইমেজ ডিসপ্লে ও আপলোড সেকশন */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cover Image</label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-200/60">
            
            {/* পুরাতন কভার ইমেজ প্রিভিউ */}
            <div className="sm:col-span-3 w-16 aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border border-gray-300/40 shadow-sm mx-auto sm:mx-0">
              <img 
                src={book.image || "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80"} 
                alt="Cover Preview" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* নতুন ইমেজ আপলোড করার বাটন */}
            <div className="sm:col-span-9 w-full">
              <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-indigo-300 rounded-xl cursor-pointer bg-white hover:bg-indigo-50/30 transition">
                <span className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shrink-0">Choose File</span>
                <span className="text-xs text-gray-500 truncate font-medium">
                  {selectedImg ? selectedImg.name : "Update new cover image"}
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setSelectedImg(e.target.files?.[0] || null)} 
                  className="hidden" 
                />
              </label>
            </div>

          </div>
        </div>

        {/* ইবুক ডেসক্রিপশন টেক্সট-এরিয়া ফিল্ড */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
          <textarea
            rows="6"
            defaultValue={book.description || "Book Description"}
            className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 resize-none font-medium leading-relaxed"
          />
        </div>

        {/* 🟢 আপডেট বাটন প্যাডিং ও টেক্সট ফিক্স */}
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-indigo-600/10"
          >
            Update Ebook
          </button>
        </div>
        
      </form>
    </div>
  );
}
