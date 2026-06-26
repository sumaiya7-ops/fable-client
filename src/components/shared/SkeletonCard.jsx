"use client";

import React from "react";

// 🟢 ডার্ক ও লাইট উভয় পেজে সেфলি ব্যবহারের জন্য isDark প্রপস যোগ করা হলো
export default function SkeletonCard({ isDark = false }) {
  return (
    /* 🟢 isDark true হলে ডার্ক থিমের কালার, false হলে লাইট থিমের অরিজিনাল সাদা কালার পাবে */
    <div className={`animate-pulse p-4 rounded-3xl ${
      isDark ? "bg-[#0f1123] border border-[#1e223d]" : "bg-white shadow-md"
    }`}>

      {/* ইমেজ এরিয়া স্কেলেটন */}
      <div className={`h-64 rounded-2xl ${
        isDark ? "bg-[#15182e]" : "bg-indigo-100"
      }`}></div>

      {/* টাইটেল এরিয়া স্কেলেটন */}
      <div className={`h-4 rounded mt-4 ${
        isDark ? "bg-[#15182e]" : "bg-indigo-100"
      }`}></div>

      {/* সাবটাইটেল এরিয়া স্কেলেটন */}
      <div className={`h-4 rounded mt-2 w-1/2 ${
        isDark ? "bg-[#15182e]" : "bg-indigo-100"
      }`}></div>

    </div>
  );
}
