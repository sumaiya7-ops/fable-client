"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, Star, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { BookOpen, Globe, HardDrive, Tag } from 'lucide-react';

// স্ক্রিনশটের সাথে ম্যাচিং রিয়েল ডাটা
const realBooksData = [
 
{
id: 1,
title: "Thinking, Fast and Slow",
writer: "Daniel Kahneman",
authorImage: "https://i.postimg.cc/vTPPbvw3/pic-1.jpg",
authorTotalBooks: 5,
authorTotalSales: 4520,
price: 4.99,
rating: 4.8,
reviewsCount: 125,
genre: "Psychology",
badge: "Bestseller",
badgeColor: "bg-red-500/20 text-red-400 border border-red-500/30",
image: "https://i.postimg.cc/cJQpyMpp/book-1.jpg",
publishDate: "October 25, 2011",
pages: 499,
fileSize: "3.1 MB",
language: "English",
isOwnBook: false,
description:
"Explores how we think using fast and slow systems of decision making. Daniel Kahneman takes readers through the cognitive biases and mental shortcuts that shape human judgment."
},

{
id: 2,
title: "Sapiens: A Brief History of Humankind",
writer: "Yuval Noah Harari",
authorImage: "https://i.postimg.cc/Cxwjm8yh/pic-2.jpg",
authorTotalBooks: 8,
authorTotalSales: 8700,
price: 3.49,
rating: 4.9,
reviewsCount: 248,
genre: "History",
badge: null,
image: "https://i.postimg.cc/0jNFSgb3/book-2.jpg",
publishDate: "September 4, 2014",
pages: 443,
fileSize: "2.8 MB",
language: "English",
isOwnBook: false,
description:
"A fascinating exploration of humanity's journey from ancient hunter-gatherers to modern technological societies."
},

{
id: 3,
title: "Atomic Habits",
writer: "James Clear",
authorImage: "https://i.postimg.cc/Qtct265n/pic-3.jpg",
authorTotalBooks: 3,
authorTotalSales: 12500,
price: 2.99,
rating: 5.0,
reviewsCount: 342,
genre: "Self Improvement",
badge: "New",
badgeColor: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
image: "https://i.postimg.cc/DyHHSMFH/book-3.jpg",
publishDate: "October 16, 2018",
pages: 320,
fileSize: "2.2 MB",
language: "English",
isOwnBook: false,
description:
"An easy and proven framework for building good habits, breaking bad ones, and achieving remarkable results through small daily improvements."
},

{
id: 4,
title: "A Brief History of Time",
writer: "Stephen Hawking",
authorImage: "https://i.postimg.cc/tJmL2bJT/pic-4.jpg",
authorTotalBooks: 12,
authorTotalSales: 6200,
price: 4.99,
rating: 4.7,
reviewsCount: 178,
genre: "Science",
badge: null,
image: "https://i.postimg.cc/6qSjG8s9/book-4.jpg",
publishDate: "April 1, 1988",
pages: 256,
fileSize: "1.9 MB",
language: "English",
isOwnBook: false,
description:
"Stephen Hawking explains complex concepts such as black holes, relativity, and the origins of the universe in accessible language."
},

{
id: 5,
title: "The Selfish Gene",
writer: "Richard Dawkins",
authorImage: "https://i.postimg.cc/02T4QcJB/pic-5.jpg",
authorTotalBooks: 10,
authorTotalSales: 4100,
price: 3.49,
rating: 4.6,
reviewsCount: 91,
genre: "Biology",
badge: "Sale",
badgeColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
image: "https://i.postimg.cc/MGxsRkLh/book-5.jpg",
publishDate: "March 13, 1976",
pages: 360,
fileSize: "2.4 MB",
language: "English",
isOwnBook: false,
description:
"A groundbreaking work introducing the gene-centered view of evolution and explaining how natural selection shapes life."
},

{
id: 6,
title: "Deep Work",
writer: "Cal Newport",
authorImage: "https://i.postimg.cc/XYKsv3WM/pic-6.jpg",
authorTotalBooks: 7,
authorTotalSales: 5300,
price: 4.0,
rating: 4.8,
reviewsCount: 157,
genre: "Productivity",
badge: null,
image: "https://i.postimg.cc/bJVLKZwF/book-6.jpg",
publishDate: "January 5, 2016",
pages: 304,
fileSize: "2.0 MB",
language: "English",
isOwnBook: false,
description:
"A practical guide to mastering focused work, eliminating distractions, and producing high-value results in a noisy world."
}
];


const genresList = ["All Genres", "Fantasy", "Mystery", "Romance", "Sci-Fi", "Horror", "Thriller", "History", "Poetry"];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [priceRange, setPriceRange] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [expandedDescId, setExpandedDescId] = useState(null);
  const [sortBy, setSortBy] = useState("Newest First");


  let filteredBooks = realBooksData.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.writer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All Genres" || book.genre === selectedGenre;
    const matchesPrice = book.price <= priceRange;
    return matchesSearch && matchesGenre && matchesPrice;
  });


  if (sortBy === "Price Low → High") {
  filteredBooks.sort((a, b) => a.price - b.price);
} else if (sortBy === "Price High → Low") {
  filteredBooks.sort((a, b) => b.price - a.price);
}


  return (
    <div className="min-h-screen bg-[#ebecf3] text-[#989aaf] font-sans w-full flex justify-center selection:bg-[#633efd]">
      <div className="w-11/12 md:w-10/12 mx-auto py-10 max-w-7xl flex flex-col gap-6">
        
        {/* টপ সার্চ এবং ফিল্টার বার */}
        <div className="flex gap-3 w-full">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search ebooks, authors or genres..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-indigo-50 border border-indigo-200 rounded-xl py-3 pl-12 pr-4 text-sm text-black focus:outline-none focus:border-[#8466fa] transition"
            />
          </div>
          <button className="bg-[#737ef7] border border-blue-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm text-black hover:bg-[#ec5050] transition">
            <SlidersHorizontal size={16} className="text-gray-800" />
            <span className="hidden sm:inline text-xs font-medium">Filters</span>
          </button>
        </div>

        {/* মেইন লেআউট: সাইডবার + গ্রিড */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          
          {/* স্ক্রিনশটের হুবহু বামদিকের ফিল্টার সাইডবার */}
          <aside className="w-full lg:w-60 flex flex-col gap-6 shrink-0">
            <div>
              <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">Genre</h3>
              <div className="flex flex-col gap-1">
                {genresList.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                      selectedGenre === genre 
                        ? "bg-indigo-100 text-[#1d1a24] font-semibold" 
                        : "text-gray-700 hover:bg-indigo-100 hover:text-gray-800"
                    }`}
                  >
                    <span>{genre}</span>
                    {(genre === "Fantasy" || genre === "Mystery") && <ChevronDown size={14} className="text-gray-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* প্রাইস রেঞ্জ স্লাইডার */}
            <div className="border-t border-gray-400 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price Range</h3>
                <span className="text-xs text-red-600 font-bold">0-${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#fe223f] bg-gray-800 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-red-400 mt-1 font-medium">
                <span>$0</span>
                <span>$50+</span>
              </div>
            </div>

            {/* অ্যাভেইলেবিলিটি রেডিও/চেকবক্স */}
            <div className="border-t border-gray-400 pt-4 flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Availability</h3>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="radio" name="availability" defaultChecked  className="accent-[#633efd] " />
                All
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="radio" name="availability" className="accent-[#633efd]" />
                Free
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="radio" name="availability" className="accent-[#633efd]" />
                Paid
              </label>
            </div>

            {/* সর্ট বাই ড্রপডাউন */}
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort By</h3>
            <select 
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="w-full bg-indigo-100 border border-indigo-300 text-xs text-gray-900 px-3 py-2.5 rounded-xl outline-none focus:border-[#633efd] cursor-pointer"
>
  <option>Newest First</option>
  <option>Price Low → High</option>
  <option>Price High → Low</option>
</select>

            </div>

            <button className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-[#5232db] transition shadow-lg shadow-[#633efd]/20 text-xs mt-2">
              Apply Filters
            </button>
          </aside>
          {/* ডানদিকের প্রোডাক্ট গ্রিড এবং অন্যান্য এলিমেন্ট */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBooks.map((book) => {
                const isDescExpanded = expandedDescId === book.id;

                return (
                  <div 
                    key={book.id} 
                    className="bg-white border border-blue-100 rounded-2xl overflow-hidden flex flex-col group hover:border-[#633efd]/40 transition-all duration-300 p-3 justify-between"
                  >
                    <div>
                      {/* কার্ডের ইমেজ এরিয়া */}
                           <Link href={`/ebook/${book.id}`} className="relative aspect-[3/4] w-full bg-[#161726] rounded-xl overflow-hidden block">

                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                        />
                        {book.badge && (
                          <span className={`absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${book.badgeColor}`}>
                            {book.badge}
                          </span>
                        )}
                        <button className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-red-500 transition">
                          <Heart size={13} />
                        </button>
                      </Link>

                      {/* বইয়ের ডিটেইলস */}
                    <Link href={`/ebook/${book.id}`}>
  <h4 className="font-bold text-gray-800 text-sm mt-3 line-clamp-1 leading-snug cursor-pointer hover:text-[#9059ff] transition">
    {book.title}
  </h4>
</Link>

                      <p className="text-gray-600 text-[11px] mt-0.5">{book.writer}</p>
                      
                      {/* স্টার রেটিং */}
                      <div className="flex items-center gap-0.5 mt-1.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-current" />
                        ))}
                        <span className="text-[10px] text-gray-700 ml-1 font-medium">({book.rating})</span>
                      </div>

                      {/* ডেসক্রিপশন ট্রিম (হাফ লাইন ও ক্লিক ফিচার) */}
                      <p className="text-gray-600 text-[11px] mt-2 leading-relaxed">
                        {isDescExpanded ? book.description : `${book.description.substring(0, 35)}...`}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescId(isDescExpanded ? null : book.id);
                          }}
                          className="text-[#9059ff] font-medium ml-1 hover:underline text-[10px]"
                        >
                          {isDescExpanded ? "Read Less" : "Read More"}
                        </button>
                      </p>
                    </div>

                    {/* প্রাইস এবং কার্ট বাটন */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-800/40">
                      <span className="text-red-600 font-bold text-sm">${book.price.toFixed(2)}</span>
                      <button 
                        onClick={() => setSelectedBook(book)}
                        className="text-[#0b0104e6] hover:bg-[#03010a] hover:text-white p-2 rounded-xl transition border border-[#633efd]/20 "
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* স্ক্রিনশটের মতো ডায়নামিক পেজিনেশন */}
            <div className="flex justify-center mt-12 gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#633efd] text-white shadow-md shadow-[#633efd]/20"
                      : "bg-[#11121d] text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </main>

        </div>
      </div>

      {/* ভিউ বুক ও বাইং মডাল */}
 
    </div>
  );
}
