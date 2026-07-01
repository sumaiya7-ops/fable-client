"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Search, ShoppingCart, Heart, Star, X, ChevronDown, SlidersHorizontal } from "lucide-react";

const genresList = ["All Genres", "Psychology", "History", "Self Improvement", "Fiction", "Mystery", "Sci-Fi", "Romance", "Fantasy"];

export default function BrowsePage() { 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres"); 
  const [priceRange, setPriceRange] = useState(100); 
  const [availability, setAvailability] = useState("All"); 
  const [sortBy, setSortBy] = useState("Newest First"); 
  const [selectedBook, setSelectedBook] = useState(null); 
  const [expandedDescId, setExpandedDescId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // ⚙️ MongoDB ডাটাবেজ থেকে রিয়েল-টাইমে ফিল্টার করা বইগুলো টেনে আনার ইঞ্জিন
  const fetchFilteredEbooks = async () => {
    try { 
      setLoading(true);
      let url = `https://fable-server-z2xt.onrender.com/ebooks?search=${searchQuery}&priceRange=${priceRange}&t=${new Date().getTime()}`; 
      
      if (selectedGenre !== "All Genres") { 
        url += `&genre=${selectedGenre}`; 
      } 
      if (availability !== "All") { 
        url += `&availability=${availability}`; 
      } 
      if (sortBy !== "Sort By") { 
        url += `&sortBy=${sortBy}`; 
      } 
      
      const res = await axios.get(url); 
      // ডাটাবেজ রেসপন্স অবজেক্ট বা অ্যারে চেক লজিক (Anti-Crash Protection)
      const extractedBooks = res.data.ebooks || (Array.isArray(res.data) ? res.data : []); 
      setBooks(extractedBooks); 
    } catch (err) { 
      console.error("Failed to load filtered ebooks from MongoDB:", err); 
      setBooks([]); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  useEffect(() => {
    fetchFilteredEbooks();
  }, [selectedGenre, searchQuery, priceRange, availability, sortBy]);

  // ক্লায়েন্ট-সাইড পেজিনেশন ম্যাথ ক্যালকুলেশন
  const lastBook = currentPage * booksPerPage;
  const firstBook = lastBook - booksPerPage;
  const currentBooks = books.slice(firstBook, lastBook);

  const totalPages = Math.max(1, Math.ceil(books.length / booksPerPage));

  const handleApplyFilters = (e) => { 
    setCurrentPage(1);
    if (e) e.preventDefault(); 
    fetchFilteredEbooks(); 
  };
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-indigo-50 border border-indigo-200 rounded-xl py-3 pl-12 pr-4 text-sm text-black focus:outline-none focus:border-[#8466fa] transition placeholder:text-gray-400"
            />
          </div>
          <button type="button" onClick={handleApplyFilters} className="bg-[#737ef7] border border-blue-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm text-black hover:bg-[#633efd] hover:text-white transition cursor-pointer">
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline text-xs font-medium">Filters</span>
          </button>
        </div>

        {/* মেইন লেআউট: সাইডবার + গ্রিড */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          
          {/* বামদিকের ফিল্টার সাইডবার */}
          <aside className="w-full lg:w-60 flex flex-col gap-6 shrink-0">
            <div>
              <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">Genre</h3>
              <div className="flex flex-col gap-1">
                {genresList.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      setSelectedGenre(genre);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      selectedGenre === genre 
                        ? "bg-indigo-100 text-[#1d1a24] font-bold" 
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
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price Range</h3>
                <span className="text-xs text-red-600 font-bold">0-${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#fe223f] bg-gray-300 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-red-400 mt-1 font-medium">
                <span>$0</span>
                <span>$20</span>
              </div>
            </div>

            {/* অ্যাভেইলেবিলিটি রেডিও */}
            <div className="border-t border-gray-300 pt-4 flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Availability</h3>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer font-medium">
                <input type="radio" name="availability" checked={availability === "All"} onChange={() => { setAvailability("All"); setCurrentPage(1); }} className="accent-[#633efd]" />
                All
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer font-medium">
                <input type="radio" name="availability" checked={availability === "Available"} onChange={() => { setAvailability("Available"); setCurrentPage(1); }} className="accent-[#633efd]" />
                Available
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer font-medium">
                <input type="radio" name="availability" checked={availability === "Sold"} onChange={() => { setAvailability("Sold"); setCurrentPage(1); }} className="accent-[#633efd]" />
                Sold
              </label>
            </div>

            {/* সর্ট বাই ড্রপডাউন */}
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort By</h3>
              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-indigo-100 border border-indigo-300 text-xs text-gray-900 px-3 py-2.5 rounded-xl outline-none focus:border-[#633efd] cursor-pointer font-medium"
              >
                <option value="Newest First">Newest First</option>
                <option value="Price Low → High">Price Low → High</option>
                <option value="Price High → Low">Price High → Low</option>
              </select>
            </div>

            <button 
              type="button"
              onClick={handleApplyFilters}
              className="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-[#5232db] transition shadow-lg shadow-[#633efd]/20 text-xs mt-2 cursor-pointer"
            >
              Apply Filters
            </button>
          </aside>
          {/* ক্যাটালগ রেন্ডারার মেইন সেকশন */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100"></div>
                ))}
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-400 italic font-medium">No ebooks match your live filters.</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {currentBooks.map((book) => {
                    const bookId = book._id ? book._id.toString() : book.id;
                    const isDescExpanded = expandedDescId === bookId;
                    const bookCover = book.coverUrl || book.image || "/no-book.png";

                    return (
                      <div 
                        key={bookId} 
                        className="bg-white border border-blue-100 rounded-2xl overflow-hidden flex flex-col group hover:border-[#633efd]/40 transition-all duration-300 p-3 justify-between shadow-sm hover:shadow-md"
                      >
                        <div>
                          {/* কার্ডের ইমেজ এরিয়া */}
                          <Link href={`/ebook/${bookId}`} className="relative aspect-[3/4] w-full bg-[#161726] rounded-xl overflow-hidden block">
                            <img
                              src={bookCover}
                              loading="lazy"
                              alt={book.title || "Book Cover"}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              onError={(e) => { e.target.src = "https://co.com"; }}
                            />
                            {book.status === "sold" && (
                              <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-1 rounded shadow-sm">
                                Sold
                              </span>
                            )}
                            <button type="button" className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-red-500 transition z-10 cursor-pointer">
                              <Heart size={13} />
                            </button>
                          </Link>

                          
                          <Link href={`/ebook/${bookId}`}>
                            <h4 className="font-bold text-gray-800 text-sm mt-3 line-clamp-1 leading-snug cursor-pointer hover:text-[#633efd] transition" title={book.title}>
                              {book.title}
                            </h4>
                          </Link>

                         
                          <p className="text-gray-600 text-[11px] mt-0.5 font-medium">
  by {book.writerName || book.writer || "Unknown Author"}
</p>
                          
                          <div className="mt-1">
                            <p className="text-xs text-[#633efd] font-bold bg-indigo-500/5 px-2 py-0.5 rounded inline-block uppercase text-[10px] tracking-wider">{book.genre || "Premium"}</p>
                          </div>
                        
                       
                          <div className="flex items-center gap-0.5 mt-1.5 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={11} className={i < Math.round(book.rating || 4.8) ? "fill-current" : "text-gray-300"} />
                            ))}
                            <span className="text-[10px] text-gray-700 ml-1 font-medium">({book.rating || "4.8"})</span>
                          </div>

                          <p className="text-gray-600 text-[11px] mt-2 leading-relaxed font-medium">
                            {isDescExpanded ? (book.description || "") : `${(book.description || "").substring(0, 35)}...`}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setExpandedDescId(isDescExpanded ? null : bookId);
                              }}
                              className="text-[#633efd] font-bold ml-1 hover:underline text-[10px] cursor-pointer"
                            >
                              {isDescExpanded ? "Read Less" : "Read More"}
                            </button>
                          </p>
                        </div>

                        {/* 🛠️ প্রাইস এবং কার্ট বাটন */}
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                          <span className="text-red-600 font-extrabold text-sm">
                            ${parseFloat(book.price || 0).toFixed(2)}
                          </span>

                          {book.status === "sold" ? (
                            <button
                              disabled
                              className="bg-gray-300 text-gray-600 px-3 py-2 rounded-xl text-xs font-bold cursor-not-allowed"
                            >
                              Sold
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedBook(book)}
                              className="text-indigo-600 bg-indigo-50 hover:bg-[#633efd] hover:text-white p-2 rounded-xl transition border border-[#633efd]/10 cursor-pointer"
                            >
                              <ShoppingCart size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 rounded text-xs font-bold text-gray-700 disabled:opacity-40 cursor-pointer"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-2 rounded text-xs font-bold cursor-pointer ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded text-xs font-bold text-gray-700 disabled:opacity-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative space-y-4 text-gray-800 border border-gray-100 shadow-2xl">
            <button type="button" onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black transition cursor-pointer">
              <X size={20} />
            </button>
            <div className="flex gap-4">
              <img
                src={selectedBook.coverUrl || selectedBook.image ||  "https://i.postimg.cc/1znS3RDG/book-2.jpg"}
                alt="Modal Cover"
                className="w-24 aspect-[3/4] object-cover rounded-xl shadow border border-gray-100"
                onError={(e) => { e.target.src =  "https://i.postimg.cc/1znS3RDG/book-2.jpg";; }}
              />
              <div>
                <h3 className="text-lg font-bold text-black leading-snug">{selectedBook.title}</h3>
                <p className="text-xs text-gray-500">by {selectedBook.writerName || selectedBook.writer || "Unknown"}</p>
                <p className="text-xl font-black text-indigo-600 mt-2">${parseFloat(selectedBook.price || 0).toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 font-medium">{selectedBook.description || "Premium publication content provided securely via Fable library setup."}</p>
            
            <button
              type="button"
              disabled={selectedBook.status === "sold"}
              onClick={() => {
                const token = localStorage.getItem("fable_token"); // সিকিউর টোকেন কি সিঙ্ক
                if (!token) {
                  return window.location.href = "/login";
                }
                // আপনার ডার্ক থিমের চেকআউট ইউআরএল লিঙ্কিং পাইপলাইন
                window.location.href = `/checkout?id=${selectedBook._id || selectedBook.id}`;
              }}
              className={`w-full py-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedBook.status === "sold"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#633efd] hover:bg-[#5232db] text-white shadow-md shadow-indigo-600/10"
              }`}
            >
              {selectedBook.status === "sold" ? "Already Sold" : "Proceed to Secure Checkout"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
