"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useRouter } from "next/navigation"; 
import { 
  ShoppingCart, 
  Library, 
  Heart, 
  DollarSign, 
  CheckCircle, 
  Flame, 
  ChevronDown,
  Award,
  Clock
} from 'lucide-react';

export default function UserDashboardPage() {
  const router = useRouter(); 
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [loading, setLoading] = useState(true);
  
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const user = {
    name: "sumaiya",
    lastLogin: "Today, 01:29 PM",
    memberSince: "Jan 2026"
  };

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("fable_token"); 
        
        const userRes = await axios.get("https://fable-server-z2xt.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(userRes.data);
        
        const res = await axios.get("https://fable-server-z2xt.onrender.com/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const ordersData = res.data || [];
        const myEmail = userRes.data?.email || "sumaiyanew@gmail.com";
        const myOrders = ordersData.filter(order => order.buyerEmail === myEmail);
        
        const spentSum = myOrders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);
        setTotalSpent(spentSum);

        const ebooksRes = await axios.get("https://fable-server-z2xt.onrender.com/ebooks");
        const allEbooks = ebooksRes.data.ebooks || ebooksRes.data || [];

        const mappedPurchased = myOrders.map((order) => {

          const bookId = order.ebookId?.$oid || order.ebookId;
          const matchedBook = allEbooks.find(b => {
            if (!b) return false;
            const currentDbId = b._id || b.id || "";
            const cleanDbId = currentDbId.$oid ? currentDbId.$oid.toString() : currentDbId.toString();
            return cleanDbId === (bookId ? bookId.toString() : "");
          });

         

          return {
            title: order.bookTitle || matchedBook?.title || "kookie",
            author: matchedBook?.writerName || matchedBook?.writer || "sumaiya",
            price: `$${parseFloat(order.amount || 4.99).toFixed(2)}`,
            img: matchedBook?.coverUrl || matchedBook?.image || "https://co.com",
            pdfFile: matchedBook?.pdfUrl || matchedBook?.fileUrl || ""
          };
        });

        setPurchasedBooks(mappedPurchased);

        // রিকমেন্ডেড সেকশনে ডাটাবেজের পরবর্তী বইগুলো ম্যাপ করা
        const mappedRecommended = allEbooks.slice(0, 3).map(book => ({
          title: book.title || "Premium Book",
          author: book.writerName || book.writer || "Unknown Author",
          price: `$${parseFloat(book.price || 0).toFixed(2)}`,
          img: book.coverUrl || book.image || "https://unsplash.com"
        }));
        setRecommendedBooks(mappedRecommended);

      } catch (err) {
        console.error("User dashboard pipeline fallback crash:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDashboardData();
  }, []);

  const getUserInitial = () => {
    const activeName = currentUser?.name || user.name;
    return activeName.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900 font-sans selection:bg-purple-600" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 space-y-8" style={{ padding: "8px" }}>
        
        {/* ─── WELCOME & HEADER SECTION ─── */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm" style={{ padding: "16px" }}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Welcome back, <span className="text-purple-800">{isLoggedIn ? (currentUser?.name || user.name) : "Guest"}</span> 👋
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs md:text-sm text-gray-600">
              <p>Last Login: <span className="text-gray-400">{isLoggedIn ? user.lastLogin : "N/A"}</span></p>
              <p className="hidden sm:block">•</p>
              <p>Member Since: <span className="text-gray-400">{isLoggedIn ? user.memberSince : "N/A"}</span></p>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5826df] to-[#8b5cf6] text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-white">
              {getUserInitial()}
            </div>
          ) : null}
        </div>
        
        <div className='h-2'></div>

        {/* ─── STATS CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border gap-4 border-indigo-500 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg"><ShoppingCart size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? purchasedBooks.length : "0"}</p>
              <p className="text-xs text-gray-600">Purchased</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border gap-4 border-indigo-500 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-purple-200 text-purple-700 rounded-xl"><Library size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? purchasedBooks.length : "0"}</p>
              <p className="text-xs text-gray-600">In Library</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-red-100 text-red-700 rounded-xl"><Heart size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "2" : "0"}</p>
              <p className="text-xs text-gray-600">Wishlist</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-emerald-600/10 text-emerald-700 rounded-xl"><DollarSign size={20} /></div>
            <div>
              <p className="text-lg font-bold">${isLoggedIn ? totalSpent.toFixed(2) : "0.00"}</p>
              <p className="text-xs text-gray-600">Total Spent</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-indigo-600/10 text-indigo-700 rounded-lg"><CheckCircle size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "1" : "0"}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-orange-600/10 text-orange-700 rounded-xl"><Flame size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "7 Days" : "0"}</p>
              <p className="text-xs text-gray-600">Streak</p>
            </div>
          </div>
        </div>
        
        <div className='h-2'></div>
        {/* ─── মেইন গ্রিড লেআউট ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <div className="xl:col-span-2 space-y-6">
            
            {/* ─── RECENTLY PURCHASED — লাইভ MongoDB Atlas ডেটা ─── */}
            <div className="bg-white p-6 rounded-xl border border-indigo-700 bg-white shadow-md" style={{ padding: "16px" }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recently Purchased</h2>
                <button onClick={() => router.push("/dashboard/purchases")} className="text-xs text-purple-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">View all</button>
              </div>

              {isLoggedIn ? (
                purchasedBooks.length === 0 ? (
                  <p className="text-sm text-gray-400 italic text-center py-6">You haven't purchased any ebooks yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {purchasedBooks.map((book, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl flex space-x-4 border border-gray-100 shadow-sm hover:border-purple-400 transition duration-300" style={{ padding: "12px" }}>
                        <img 
                          src={book.img} 
                          alt={book.title} 
                          className="w-16 h-22 object-cover rounded-lg shadow-md border border-gray-50" 
                          onError={(e) => { e.target.src = "https://co.com"; }}
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{book.title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">by {book.author}</p>
                            <p className="text-xs font-bold text-red-500 mt-1">{book.price}</p>
                          </div>
                          {/* 🟢 ওরিজিনাল বাটন অ্যাকশন ফিক্স: ক্লিক করলেই সরাসরি ছোট হাতেরPurchases পেজে নিয়ে যাবে */}
                          <button 
                            type="button" 
                            onClick={() => router.push("/dashboard/purchases")}
                            className="flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800 font-bold mt-2 transition cursor-pointer bg-transparent border-none text-left"
                          >
                            <span>Continue Reading</span>
                            <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-700 text-center py-6">Please log in to see your purchased books.</p>
              )}
            </div>

            {/* ─── RECOMMENDED BOOKS — ডাটাবেজের লাইভ ইবুক ম্যাপ ─── */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-500 shadow-md" style={{ padding: "16px" }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
                <button onClick={() => router.push("/dashboard/browse")} className="text-xs text-purple-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">Explore</button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {recommendedBooks.map((book, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl flex flex-col justify-between border border-gray-100 shadow-sm group hover:border-purple-400 transition duration-300" style={{ padding: "12px" }}>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-indigo-50">
                      <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-103 transition duration-500" onError={(e) => { e.target.src = "https://co.com"; }} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-1" title={book.title}>{book.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">by {book.author}</p>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                        <span className="text-xs font-bold text-purple-700">{book.price}</span>
                        <button type="button" className="p-1.5 text-purple-600 hover:bg-purple-600 hover:text-white border border-purple-100 rounded-lg transition shadow-sm cursor-pointer">
                          <Heart size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          {/* সাইডবার কলাম — অল ডিভাইস ফুল রেসপনসিভ গেটওয়ে */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-indigo-200 space-y-6 shadow-md" style={{ padding: "16px" }}>
              <div>
                <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-600" /> Reading Progress
                </h2>
                {isLoggedIn ? (
                  <div className="space-y-4">
                    {[
                      { title: purchasedBooks[0]?.title || "kookie", pct: 50, chapter: "Ch. 12/24", timeLeft: "3h left" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-indigo-50/40 p-3 rounded-xl border border-gray-100 shadow-inner" style={{ padding: "12px" }}>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="line-clamp-1 max-w-[150px] text-gray-800">{item.title}</span>
                          <span className="text-purple-700">{item.pct}%</span>
                        </div>
                        <div className='h-1'></div>
                        <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full" style={{ width: `${item.pct}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                          <span>{item.chapter}</span>
                          <span>{item.timeLeft}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 text-center py-4">No active reading progress.</p>
                )}
              </div>
              
              {/* ─── READING GOAL ─── */}
              <div className="pt-4 border-t border-gray-100">
                <div className='h-1'></div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-1.5" style={{ paddingBottom: "6px" }}>
                    <Award size={18} className="text-amber-500" />
                    <h3 className="text-sm font-bold text-gray-900">Monthly Reading Goal</h3>
                  </div>
                  <span className="text-xs text-gray-500 font-bold">
                    <strong className="text-purple-700">{isLoggedIn ? purchasedBooks.length : "0"}</strong> / {isLoggedIn ? "5" : "0"} Books
                  </span>
                </div>
                <div className="w-full bg-indigo-50 h-2 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: isLoggedIn ? '20%' : '0%' }}></div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium mt-2 text-center" style={{ paddingTop: "6px" }}>
                  {isLoggedIn ? "20% Completed. Keep it up!" : "Log in to set your reading goals."}
                </p>
              </div> 
            </div>
          </div> 

        </div> 
      </main> 
    </div> 
  );
}
