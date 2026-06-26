"use client";

import React from "react";

// 🟢 প্যারেন্ট ব্রাউজ পেজ থেকে সার্চ, ফিল্টার এবং শর্টিং স্টেটগুলো প্রপস আকারে রিসিভ করা হলো
export default function BrowseSidebar({
  search,
  setSearch,
  genreFilter,
  setGenreFilter,
  sortBy,
  setSortBy
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24 border border-gray-100">

      <h3 className="text-xl font-bold text-black mb-6 tracking-tight">
        Filters
      </h3>

      <div className="space-y-5">

        {/* সার্চ ইনপুট ফিল্ড - রিয়েল টাইম স্টেট কানেক্টেড */}
        <div>
          <input
            type="text"
            placeholder="Search Ebook..."
            value={search || ""}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium bg-gray-50/30"
          />
        </div>

        {/* জঁনরা ফিল্টার ড্রপডাউন - রিয়েল টাইম স্টেট কানেক্টেড */}
        <div>
          <select 
            value={genreFilter || "All Genres"}
            onChange={(e) => setGenreFilter && setGenreFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium bg-white cursor-pointer"
          >
            <option value="All Genres">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Psychology">Psychology</option>
            <option value="Self Improvement">Self Improvement</option>
          </select>
        </div>

        {/* শর্টিং ড্রপডাউন - রিয়েল টাইম স্টেট কানেক্টেড */}
        <div>
          <select 
            value={sortBy || "Sort By"}
            onChange={(e) => setSortBy && setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium bg-white cursor-pointer"
          >
            <option value="Sort By">Sort By</option>
            <option value="Newest">Newest</option>
            <option value="Price Low → High">Price Low → High</option>
            <option value="Price High → Low">Price High → Low</option>
          </select>
        </div>

      </div>

    </div>
  );
}
