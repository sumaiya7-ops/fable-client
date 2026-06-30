"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TopSellingEbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ ডাটাবেজের ইবুক কালেকশন থেকে রিয়েল-টাইম বইয়ের তালিকা লোড করা
  useEffect(() => {
    const fetchTopEbooks = async () => {
      try {
        const token = localStorage.getItem("fable_token");
        
        // আমাদের তৈরি করা ব্যাকএন্ড এপিআই থেকে সর্বোচ্চ দামের ভিত্তিতে ৩টি বই নিয়ে আসা হচ্ছে
        const res = await axios.get("https://fable-server-z2xt.onrender.com/ebooks?limit=3&sortBy=Price High → Low", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // ব্যাকএন্ডের পেজিনেশন পেলোড থেকে বইয়ের অ্যারে ফিল্টার করা হলো
        setBooks(res.data.ebooks || []);
      } catch (err) {
        console.error("Failed to load top books from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopEbooks();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[150px] flex items-center justify-center bg-indigo-50 rounded-md border border-indigo-400">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3.5 bg-indigo-50 p-4 rounded-md border border-indigo-400" style={{ padding: "8px" }}>
      {books.length === 0 ? (
        <p className="text-xs text-gray-500 italic py-4 text-center">No ebooks found in database.</p>
      ) : (
        books.map((book, i) => (
          <div key={book._id || i} className="flex items-center justify-between text-xs border-b border-gray-400 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              {/* 🛠️ ডাটাবেজে আসল কভার ছবি থাকলে সেটি দেখাবে, না থাকলে ডিফল্ট ইমোজি বক্স লোড হবে */}
              {book.coverUrl && book.coverUrl.startsWith("http") ? (
                <img 
                  src={book.coverUrl} 
                  alt="Cover" 
                  className="w-8 h-10 object-cover rounded-md border border-gray-800/40 shrink-0 shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-gray-800/40 flex items-center justify-center text-sm shrink-0">
                  📖
                </div>
              )}
              <div>
                {/* 🛠️ ডাটাবেজের আসল বইয়ের টাইটেল */}
                <p className="font-semibold text-black line-clamp-1 max-w-[120px]" title={book.title}>
                  {book.title}
                </p>
                {/* 🛠️ ডাটাবেজের আসল জেনার (Genre) বা ক্যাটাগরি */}
                <p className="text-[10px] text-indigo-600 uppercase tracking-wider font-bold mt-0.5">
                  {book.genre || "Premium"}
                </p>
              </div>
            </div>
            {/* 🛠️ ডাটাবেজের রিয়েল ডলার প্রাইস */}
            <span className="font-bold text-red-600 font-mono shrink-0 pl-2">
              ${parseFloat(book.price || 4.99).toFixed(2)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
