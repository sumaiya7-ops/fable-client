"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Search, ShoppingCart, Heart, Star, X, ChevronDown, SlidersHorizontal } from "lucide-react";

const genresList = ["All Genres", "Psychology", "History", "Self Improvement", "Fiction", "Mystery", "Sci-Fi", "Romance", "Fantasy"];
const MAX_PRICE = 100;
const FALLBACK_IMG = "https://i.postimg.cc/1znS3RDG/book-2.jpg";

export default function BrowsePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [priceRange, setPriceRange] = useState(MAX_PRICE);
  const [availability, setAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [selectedBook, setSelectedBook] = useState(null);
  const [expandedDescId, setExpandedDescId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // MongoDB থেকে ফিল্টার করা বই আনা
  const fetchFilteredEbooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fable-server-z2xt.onrender.com/ebooks", {
        params: {
          search: searchQuery,
          priceRange,
          sortBy,
          t: Date.now(),
          ...(selectedGenre !== "All Genres" && { genre: selectedGenre }),
          ...(availability !== "All" && { availability }),
        },
      });
      const extractedBooks = res.data.ebooks || (Array.isArray(res.data) ? res.data : []);
      setBooks(extractedBooks);
    } catch (err) {
      console.error("Failed to load filtered ebooks from MongoDB:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // debounce: ইউজার টাইপ থামালে ৪০০ms পর রিকোয়েস্ট যাবে
  useEffect(() => {
    const timer = setTimeout(fetchFilteredEbooks, 400);
    return () => clearTimeout(timer);
  }, [selectedGenre, searchQuery, priceRange, availability, sortBy]);

  // পেজিনেশন
  const lastBook = currentPage * booksPerPage;
  const firstBook = lastBook - booksPerPage;
  const currentBooks = books.slice(firstBook, lastBook);
  const totalPages = Math.max(1, Math.ceil(books.length / booksPerPage));

  const handleApplyFilters = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    fetchFilteredEbooks();
  };

  return (
    <div className="min-h-screen bg-[#ebecf3] text-[#989aaf] font-sans w-full flex justify-center selection:bg-[#633efd]">
      <div className="w-11/12 md:w-10/12 mx-auto py-10 max-w-7xl flex flex-col gap-6">

        {/* সার্চ বার */}
        <div className="flex gap-3 w-full" style={{ padding: "4px"  }}>
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
              className="w-full bg-indigo-50 border border-indigo-200 rounded-xl py-3 pl-12 pr-4 text-sm text-black focus:outline-none focus:border-[#8466fa] transition placeholder:text-gray-400" style={{ padding: "4px"  }}
            />
          </div>
          <button
            type="button"
            onClick={handleApplyFilters}
            className="bg-[#737ef7] border border-blue-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm text-black hover:bg-[#633efd] hover:text-white transition cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline text-xs font-medium" style={{ padding: "4px"  }}>Filters</span>
          </button>
        </div>

        {/* সাইডবার + গ্রিড */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">

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

            {/* প্রাইস রেঞ্জ */}
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price Range</h3>
                <span className="text-xs text-red-600 font-bold">$0-${priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#fe223f] bg-gray-300 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-red-400 mt-1 font-medium">
                <span>$0</span>
                <span>${MAX_PRICE}</span>
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-gray-300 pt-4 flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Availability</h3>
              {["All", "Available", "Sold"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="availability"
                    checked={availability === opt}
                    onChange={() => {
                      setAvailability(opt);
                      setCurrentPage(1);
                    }}
                    className="accent-[#633efd]"
                  />
                  {opt}
                </label>
              ))}
            </div>

            {/* Sort */}
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

          {/* ক্যাটালগ */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {currentBooks.map((book) => {
                    const bookId = book._id ? book._id.toString() : book.id;
                    const isDescExpanded = expandedDescId === bookId;
                    const bookCover = book.coverUrl || book.image || FALLBACK_IMG;
                    const isSold = book.status === "sold";
                    const rating = Number(book.rating) || 0;
                    const description = book.description || "";

                    return (
                      <div
                        key={bookId}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:border-[#633efd]/40 hover:shadow-md"
                      >
                        {/* Cover */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#161726]">
                          <Link href={`/ebook/${bookId}`} className="block h-full w-full">
                            <img
                              src={bookCover}
                              loading="lazy"
                              alt={book.title || "Book Cover"}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = FALLBACK_IMG;
                              }}
                            />
                          </Link>

                          {isSold && (
                            <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
                              Sold
                            </span>
                          )}

                          <button
                            type="button"
                            aria-label="Add to wishlist"
                            className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:text-red-500"
                          >
                            <Heart size={14} />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-4">
                          <Link href={`/ebook/${bookId}`}>
                            <h4
                              title={book.title}
                              className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-gray-800 transition hover:text-[#633efd]"
                            >
                              {book.title}
                            </h4>
                          </Link>

                          <p className="mt-1 line-clamp-1 text-[11px] font-medium text-gray-600">
                            by {book.writerName || book.writer || "Unknown Author"}
                          </p>

                          <p className="mt-2 inline-block w-fit rounded bg-indigo-500/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#633efd]">
                            {book.genre || "Premium"}
                          </p>

                          {/* Rating */}
                          <div className="mt-2 flex min-h-[16px] items-center gap-0.5 text-amber-500">
                            {rating > 0 && (
                              <>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={i < Math.round(rating) ? "fill-current" : "text-gray-300"}
                                  />
                                ))}
                                <span className="ml-1 text-[10px] font-medium text-gray-700">
                                  ({rating.toFixed(1)})
                                </span>
                              </>
                            )}
                          </div>

                          {/* Description */}
                          <div className="mt-2 text-[11px] font-medium leading-relaxed text-gray-600">
                            <p className={`min-h-[2.5rem] ${isDescExpanded ? "" : "line-clamp-2"}`}>
                              {description || "No description available."}
                            </p>
                            {description.length > 60 && (
                              <button
                                type="button"
                                onClick={() => setExpandedDescId(isDescExpanded ? null : bookId)}
                                className="mt-0.5 cursor-pointer text-[10px] font-bold text-[#633efd] hover:underline"
                              >
                                {isDescExpanded ? "Read Less" : "Read More"}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Footer: price + cart */}
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                          <span className="text-base font-extrabold text-red-600">
                            ${parseFloat(book.price || 0).toFixed(2)}
                          </span>

                          {isSold ? (
                            <button
                              disabled
                              className="cursor-not-allowed rounded-xl bg-gray-300 px-3 py-2 text-xs font-bold text-gray-600"
                            >
                              Sold
                            </button>
                          ) : (
                            <button
                              type="button"
                              aria-label="Add to cart"
                              onClick={() => setSelectedBook(book)}
                              className="cursor-pointer rounded-xl border border-[#633efd]/10 bg-indigo-50 p-2 text-indigo-600 transition hover:bg-[#633efd] hover:text-white"
                            >
                              <ShoppingCart size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
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

      {/* Checkout Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative space-y-4 text-gray-800 border border-gray-100 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="flex gap-4">
              <img
                src={selectedBook.coverUrl || selectedBook.image || FALLBACK_IMG}
                alt="Modal Cover"
                className="w-24 aspect-[3/4] object-cover rounded-xl shadow border border-gray-100"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
              <div>
                <h3 className="text-lg font-bold text-black leading-snug">{selectedBook.title}</h3>
                <p className="text-xs text-gray-500">by {selectedBook.writerName || selectedBook.writer || "Unknown"}</p>
                <p className="text-xl font-black text-indigo-600 mt-2">${parseFloat(selectedBook.price || 0).toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 font-medium">
              {selectedBook.description || "Premium publication content provided securely via Fable library setup."}
            </p>

            <button
              type="button"
              disabled={selectedBook.status === "sold"}
              onClick={() => {
                const token = localStorage.getItem("fable_token");
                if (!token) {
                  window.location.href = "/login";
                  return;
                }
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