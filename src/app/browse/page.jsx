"use client";

import { useState } from "react";
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

  let filteredBooks = realBooksData.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.writer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All Genres" || book.genre === selectedGenre;
    const matchesPrice = book.price <= priceRange;
    return matchesSearch && matchesGenre && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#ebecf3] text-[#a5a6b5] font-sans w-full flex justify-center selection:bg-[#633efd]/30">
      <div className="w-11/12 md:w-10/12 mx-auto py-10 max-w-7xl flex flex-col gap-6">
        
        {/* টপ সার্চ এবং ফিল্টার বার */}
        <div className="flex gap-3 w-full">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search ebooks, authors or genres..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11121d] border border-gray-800/60 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#633efd] transition"
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
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Genre</h3>
              <div className="flex flex-col gap-1">
                {genresList.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                      selectedGenre === genre 
                        ? "bg-[#251c4a] text-[#9059ff] font-semibold" 
                        : "text-gray-400 hover:bg-[#11121d] hover:text-white"
                    }`}
                  >
                    <span>{genre}</span>
                    {(genre === "Fantasy" || genre === "Mystery") && <ChevronDown size={14} className="text-gray-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* প্রাইস রেঞ্জ স্লাইডার */}
            <div className="border-t border-gray-900/60 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price Range</h3>
                <span className="text-xs text-[#9059ff] font-bold">0-${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#633efd] bg-gray-800 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-medium">
                <span>$0</span>
                <span>$50+</span>
              </div>
            </div>

            {/* অ্যাভেইলেবিলিটি রেডিও/চেকবক্স */}
            <div className="border-t border-gray-900/60 pt-4 flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Availability</h3>
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input type="radio" name="availability" defaultChecked className="accent-[#633efd]" />
                All
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input type="radio" name="availability" className="accent-[#633efd]" />
                Free
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input type="radio" name="availability" className="accent-[#633efd]" />
                Paid
              </label>
            </div>

            {/* সর্ট বাই ড্রপডাউন */}
            <div className="border-t border-gray-900/60 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort By</h3>
              <select className="w-full bg-[#11121d] border border-gray-800/60 text-xs text-gray-300 px-3 py-2.5 rounded-xl outline-none focus:border-[#633efd] cursor-pointer">
                <option>Newest First</option>
                <option>Price Low → High</option>
                <option>Price High → Low</option>
              </select>
            </div>

            <button className="w-full bg-[#633efd] text-white font-semibold py-3 rounded-xl hover:bg-[#5232db] transition shadow-lg shadow-[#633efd]/20 text-xs mt-2">
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
                      <div className="relative aspect-[3/4] w-full bg-[#161726] rounded-xl overflow-hidden cursor-pointer" onClick={() => setSelectedBook(book)}>
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
                      </div>

                      {/* বইয়ের ডিটেইলস */}
                      <h4 
                        className="font-bold text-gray-800 text-sm mt-3 line-clamp-1 leading-snug cursor-pointer hover:text-[#9059ff] transition" 
                        onClick={() => setSelectedBook(book)}
                      >
                        {book.title}
                      </h4>
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
     
{selectedBook && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-md p-4 animate-fadeIn">
    {/* মেইন প্যানেল: স্ক্রিনশটের মতো ডার্ক নেভি ব্লু কালার থিম এবং বড় সাইজ (max-w-4xl) */}
    <div className="bg-[#f4f4f7] border border-[#e6e8f4] rounded-2xl max-w-4xl lg:w-10/12 md:w-10/12 w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-[#0c0c0d]">
      
      {/* ক্লোজ বাটন */}
      <button 
        onClick={() => setSelectedBook(null)}
        className="absolute top-4 right-4 bg-red-600/80 p-2 rounded-full text-white transition-colors duration-200 z-10"
      >
        <X size={16} />
      </button>

      {/* ওপরের সেকশন: গ্রিড লেআউট (বামে বড় কভার, ডানে মূল তথ্য) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ১. বাম পাশে: বইয়ের বড় কভার ইমেজ (MD স্ক্রিনে ৫ কলাম পাবে) */}
        <div className="md:col-span-5 w-full aspect-[3/4] rounded-xl overflow-hidden border border-[#a9b2e5] shadow-xl bg-[#0b0e24]">
          <img 
            src={selectedBook.image} 
            alt={selectedBook.title} 
            className="w-full h-full object-cover transform hover:scale-102 transition duration-500" 
          />
        </div>

        {/* ২. ডান পাশে: টাইটেল, রেট, প্রাইস এবং বাটন (MD স্ক্রিনে ৭ কলাম পাবে) */}
        <div className="md:col-span-7 flex flex-col  h-full space-y-4 pt-1">
          <div>
            {/* টাইটেল */}
            <h2 className="text-2xl sm:text-2xl font-semibold text-gray-800 leading-tight tracking-wide pr-6">
              {selectedBook.title}
            </h2>
            
            {/* লেখক প্রোফাইল লাইন */}
            <div className="flex items-center gap-2 mt-3">
               <img 
                  src={selectedBook.authorImage || "https://placeholder.com"} 
                  alt={selectedBook.writer} 
                  className="w-12 h-12 rounded-full object-cover border border-[#1f2442]"
                />
              <p className="text-xs">
                by <span className="text-[#635bff] font-medium hover:underline cursor-pointer">{selectedBook.writer}</span>
              </p>
            </div>

            {/* গোল্ডেন স্টার রেটিং এবং রিভিউ সংখ্যা */}
            <div className="flex items-center gap-1 mt-3.5 text-xs">
              <div className="flex text-[#f4ca16] text-sm">★★★★★</div>
              <span className="text-[#515975] ml-1 font-medium">
                {selectedBook.rating || "4.8"} ({selectedBook.reviewsCount || "125"} reviews)
              </span>
            </div>

            {/* জনরা/ক্যাটাগরি ট্যাগসমূহ */}
            <div className="flex flex-wrap gap-2 mt-4.5">
              {(Array.isArray(selectedBook.genre) ? selectedBook.genre : [selectedBook.genre]).map((g, idx) => (
                <span key={idx} className="text-[#0e0e18] bg-[#bebbed] text-[11px] font-semibold px-4 py-1 rounded-sm capitalize">
                  {g}
                </span>
              ))}
            </div>

            {/* প্রাইস এবং স্ট্যাটাস */}
            <div className="mt-6">
              <p className="text-3xl font-medium text-red-600">${selectedBook.price.toFixed(2)}</p>
              <div className="flex items-center gap-1.5 text-[#28d972] text-md font-semibold mt-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71] inline-block animate-pulse"></span>
                Available
              </div>
              <p className="text-[#515975] text-[11px] mt-1">Published: {selectedBook.publishDate || "October 25, 2011"}</p>
            </div>
          </div>

          {/* অ্যাকশন বাটনসমূহ (Buy Now & Wishlist) */}
          <div className="h-14 md:h-20"></div> 
          <div className="flex items-center gap-10  max-w-md">
            <button 
              onClick={() => {
                alert(`Redirecting to payment checkout for "${selectedBook.title}"...`);
                setSelectedBook(null);
              }}
              className="flex-1 bg-red-600 hover:bg-[#11e011] text-white font-medium  h-8 sm:h-6 md:h-12 rounded-xl transition duration-300 text-xs flex items-center justify-center gap-4 shadow-lg shadow-[#563bf2]/10"
            >
              <ShoppingCart size={16} />
              Buy Now
            </button>
            
            <button className="border border-[#5169f4] bg-blue-400  h-8 sm:h-6 md:h-12 text-gray-800 font-medium  rounded-xl transition text-xs flex items-center gap-1">
              <Heart size={14} className="text-[#f50606f7]" />
              Add to Wishlist
            </button>
          </div>

          {/* অনারশিপ নোটিশ */}
          {selectedBook.isOwnBook && (
            <p className="text-[#103fe9] text-[10px] mt-2">🛑 You are not able to purchase your own ebook.</p>
          )}
        </div>
      </div>

      {/* নিচের সেকশন: ডেসক্রিপশন, মেটাডাটা এবং অথর বক্স (হুবহু ছবির লেআউট) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mt-8 pt-6 border-t border-[#b7beed]">
        
        {/* বামের অংশ: Description এবং Meta Grid (MD স্ক্রিনে ৭ কলাম) */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-2">Description</h3>
            <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-line">
              {selectedBook.description}
            </p>
          </div>

          {/* টেকনিক্যাল মেটাডাটা লিস্ট (ছবির বাম-নিচের স্টাইল) */}
          <div className="space-y-2.5 text-xs text-[#8794b9]">
            <div className="flex items-center gap-3 py-0.5">
              <BookOpen size={14} className="text-[#496ef2]" />
              <span className="w-20 text-[#51576c]">Pages:</span>
              <strong className="text-gray-600 font-medium">{selectedBook.pages || "499"}</strong>
            </div>
            <div className="flex items-center gap-3 py-0.5">
              <Globe size={14} className="text-[#353845]" />
              <span className="w-20 text-[#51576c]">Language:</span>
              <strong className="text-gray-600 font-medium">{selectedBook.language || "English"}</strong>
            </div>
            <div className="flex items-center gap-3 py-0.5">
              <HardDrive size={14} className="text-[#5277fc]" />
              <span className="w-20 text-[#51576c]">File Size:</span>
              <strong className="text-gray-600 font-medium">{selectedBook.fileSize || "3.1 MB"}</strong>
            </div>
            <div className="flex items-center gap-3 py-0.5">
              <Tag size={14} className="text-[#ec0c0c]" />
              <span className="w-20 text-[#51576c]">Category:</span>
              <strong className="text-gray-600 font-medium truncate capitalize">
                {Array.isArray(selectedBook.genre) ? selectedBook.genre.join(', ') : selectedBook.genre}
              </strong>
            </div>
          </div>
        </div>

        {/* ডানের অংশ: About the Author বক্স (MD স্ক্রিনে ৫ কলাম) */}
        <div className="md:col-span-5">
          <div className="bg-indigo-50 border border-[#a0aefb] p-5 rounded-xl flex flex-col justify-between min-h-[180px]">
            <div>
              <h3 className="text-[12px] font-semibold text-[#3d455f] mb-3 tracking-wider uppercase">
                About the Author
              </h3>
              <div className="flex items-center gap-3">
                <img 
                  src={selectedBook.authorImage || "https://placeholder.com"} 
                  alt={selectedBook.writer} 
                  className="w-12 h-12 rounded-full object-cover border border-[#1f2442]"
                />
                <div>
                  <h4 className="font-medium text-black text-sm">{selectedBook.writer}</h4>
                  <div className="text-[11px] text-[#2f323e] mt-0.5 space-y-0.5">
                    <p>Total Books: <span className="text-[#f91e30] font-medium">{selectedBook.authorTotalBooks || "5"}</span></p>
                    <p>Total Sales: <span className="text-[#ea2222] font-medium">{selectedBook.authorTotalSales || "4520"}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-indigo-100  border border-indigo-200 text-[#635bff] font-medium py-2 rounded-xl transition text-[11px] tracking-wide">
              View Profile
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
)}

      
    </div>
  );
}
