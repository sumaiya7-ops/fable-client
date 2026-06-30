"use client";
import React from "react";


// 🟢 প্যারেন্ট ব্রাউজ পেজ থেকে সার্চ, ফিল্টার এবং সর্টিং স্টেটগুলো প্রপস আকারে রিসিভ করা হলো
export default function BrowseSidebar({
  search,
  setSearch,
  genreFilter,
  setGenreFilter,
  priceRange,
  setPriceRange,
  availability,
  setAvailability,
  sortBy,
  setSortBy
})
{
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24 border border-gray-100">

      <h3 className="text-xl font-bold text-black mb-6 tracking-tight">
        Filters
      </h3>

      <div className="space-y-5">

        {/* সার্চ ইনপুট ফিল্ড - রিয়েল টাইম স্টেট কানেক্টেড */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-gray-500 pl-1">Search Books</label>
          <input
            type="text"
            placeholder="Search Ebook or Writer..."
            value={search || ""}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium bg-gray-50/30"
          />
        </div>

        {/* জেনার ফিল্টার ড্রপডাউন - আপনার MongoDB ডাটাবেজে সিড করা ক্যাটাগরিগুলোর সাথে সিঙ্ক করা হলো */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-gray-500 pl-1">Category / Genre</label>
          <select 
            value={genreFilter || "All Genres"}
            onChange={(e) => setGenreFilter && setGenreFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium bg-white cursor-pointer"
          >
            <option value="All Genres">All Genres</option>
            <option value="Psychology">Psychology</option>
            <option value="History">History</option>
            <option value="Self Improvement">Self Improvement</option>
            {/* ফিউচার এক্সপেনশন প্যানেল অপশন (সেফ ফলব্যাক) */}
            <option value="Fiction">Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>
        <div>
  <label className="block mb-1.5 text-xs font-semibold text-gray-500 pl-1">
    Max Price
  </label>

  <input
    type="range"
    min="0"
    max="20"
    value={priceRange}
    onChange={(e)=>setPriceRange(Number(e.target.value))}
    className="w-full"
  />

  <p className="text-xs mt-1">
    $0 - ${priceRange}
  </p>
</div>
<div>
  <label className="block mb-2 text-xs font-semibold text-gray-500">
    Availability
  </label>

  <select
    value={availability}
    onChange={(e)=>setAvailability(e.target.value)}
    className="w-full border border-gray-300 rounded-xl p-3"
  >
    <option value="All">All</option>
    <option value="Available">Available</option>
    <option value="Sold">Sold</option>
  </select>
</div>

        {/* শর্টিং ড্রপডাউন - 🛠️ ব্যাকএন্ড কুয়েরির সাথে মিল রেখে "Newest First" ফিক্স করা হলো */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-gray-500 pl-1">Sort Collection</label>
          <select 
            value={sortBy || "Sort By"}
            onChange={(e) => setSortBy && setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black text-sm focus:outline-none focus:border-indigo-500 transition-colors font-medium bg-white cursor-pointer"
          >
            <option value="Sort By">Default Sorting</option>
            {/* 🛠️ এখানে 'Newest' এর জায়গায় 'Newest First' করা হলো যেন ব্যাকএন্ডের createdAt: -1 লকটি ট্রিগার হয় */}
            <option value="Newest First">Newest First</option>
            <option value="Price Low → High">Price Low → High</option>
            <option value="Price High → Low">Price High → Low</option>
          </select>
        </div>

      </div>
      <button
  onClick={() => {
    setSearch("");
    setGenreFilter("All Genres");
    setPriceRange(20);
    setAvailability("All");
    setSortBy("Sort By");
  }}
  className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition"
>
  Reset Filters
</button>

    </div>
  );
}
