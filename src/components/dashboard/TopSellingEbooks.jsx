"use client";

import React from "react";

const ebooks = [
  { title: "The Silent Watcher", price: "$245.00", sales: "High Profit" },
  { title: "Midnight Whispers", price: "$185.40", sales: "Popular" },
  { title: "Beyond the Horizon", price: "$156.80", sales: "Trending" },
];

export default function TopSellingEbooks() {
  return (
    /* 🟢 ড্যাশবোর্ডের মূল বক্সের সাথে ফিট করার জন্য এক্সট্রা ব্যাকগ্রাউন্ড, বর্ডার ও টাইটেল সরানো হলো */
    <div className="w-full space-y-3.5 bg-indigo-50 p-4 rounded-md border border-indigo-400" style={{ padding: "8px"  }}>
      {ebooks.map((book, i) => (
        <div key={i} className="flex items-center justify-between text-xs border-b border-gray-400 pb-3 last:border-0 last:pb-0">
          <div className="flex items-center gap-3">
            {/* বইয়ের ইমোজি কন্টেইনারকে ড্যাশবোর্ড ফ্রেন্ডলি করা হলো */}
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-gray-800/40 flex items-center justify-center text-sm shrink-0">
              📖
            </div>
            <div>
              <p className="font-semibold text-black line-clamp-1">{book.title}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{book.sales}</p>
            </div>
          </div>
          <span className="font-bold text-red-600 font-mono shrink-0 pl-2">{book.price}</span>
        </div>
      ))}
    </div>
  );
}
