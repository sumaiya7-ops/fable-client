"use client";

import { useState } from "react";
import { Search, ShoppingCart, Heart, Star, X, ChevronDown, SlidersHorizontal } from "lucide-react";

// স্ক্রিনশটের সাথে ম্যাচিং রিয়েল ডাটা
const realBooksData = [
   {
    id: 1,
    title: "Thinking, Fast and Slow",
    writer: "Daniel Kahneman",
    price: 4.99,
    rating: 4.8,
    genre: "Sci-Fi",
    badge: "Bestseller",
    badgeColor: "bg-red-500/20 text-red-400 border border-red-500/30",
   image: "https://i.postimg.cc/cJQpyMpp/book-1.jpg",
    description:
      "Explores how we think using fast and slow systems of decision making."
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    writer: "Yuval Noah Harari",
    price: 3.49,
    rating: 4.9,
    genre: "History",
    badge: null,
   image: "https://i.postimg.cc/0jNFSgb3/book-2.jpg",
    description:
      "A journey through the history of humankind from evolution to modern age."
  },
  {
    id: 3,
    title: "Atomic Habits",
    writer: "James Clear",
    price: 2.99,
    rating: 5.0,
    genre: "Romance",
    badge: "New",
    badgeColor: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
    image: "https://i.postimg.cc/DyHHSMFH/book-3.jpg",
    description:
      "An easy and proven way to build good habits and break bad ones."
  },
  {
    id: 4,
    title: "A Brief History of Time",
    writer: "Stephen Hawking",
    price: 4.99,
    rating: 4.7,
    genre: "Sci-Fi",
    badge: null,
    image: "https://i.postimg.cc/6qSjG8s9/book-4.jpg",
    description:
      "Explores the universe, black holes, time and space in simple language."
  },
  {
    id: 5,
    title: "The Selfish Gene",
    writer: "Richard Dawkins",
    price: 3.49,
    rating: 4.6,
    genre: "History",
    badge: "Sale",
    badgeColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
     image: "https://i.postimg.cc/MGxsRkLh/book-5.jpg",
    description:
      "Gene-centric view of evolution and natural selection."
  },
  {
    id: 6,
    title: "Deep Work",
    writer: "Cal Newport",
    price: 4.0,
    rating: 4.8,
    genre: "Sci-Fi",
    badge: null,
   image: "https://i.postimg.cc/bJVLKZwF/book-6.jpg",
    description:
      "Rules for focused success in a distracted world."
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-mist-50 backdrop-blur-sm p-4">
          <div className="bg-white border border-mist-200 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl flex flex-col sm:flex-row gap-5 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 bg-red-600 p-1.5 rounded-full text-white transition"
            >
              <X size={16} />
            </button>

            <div className="w-full sm:w-2/5 shrink-0 aspect-[3/4] sm:h-56  rounded-xl overflow-hidden">
              <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <span className="bg-[#edeafc] text-[#060011] text-[14px] font-bold px-2.5 py-0.5 rounded-2xl uppercase">
                  {selectedBook.genre}
                </span>
                <h2 className="text-lg font-bold text-gray-800 mt-2 leading-snug">{selectedBook.title}</h2>
                <p className="text-gray-600 text-xs mt-0.5">By {selectedBook.writer}</p>
                <p className="text-gray-500 text-xs mt-3 leading-relaxed">{selectedBook.description}</p>
              </div>

              <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-[10px] text-gray-700">Price</p>
                  <p className="text-lg font-black text-red-600">${selectedBook.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => {
                    alert(`Redirecting to payment checkout for "${selectedBook.title}"...`);
                    setSelectedBook(null);
                  }}
                  className="bg-[#d9d3f1]  text-gray-800 font-semibold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5"
                >
                  <ShoppingCart size={14} />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
