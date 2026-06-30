"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  TrendingUp, 
  History, 
  BookMarked, 
  User,

  
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(null);

  // ডাটাবেজ থেকে টোকেন রিড করে লগইন থাকা ইউজারের রোল এবং নাম নিয়ে আসা
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("fable_token");
        if (!token) return;
        const res = await axios.get("https://fable-server-z2xt.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Failed to load sidebar user session", err);
      }
    };
    fetchUserRole();
  }, []);
    return (
    <aside className="bg-white text-gray-800 h-full min-h-screen border-r border-indigo-400 flex flex-col justify-between" style={{ paddingLeft: "16px" }}>
      <div>
       
        <h2 className="text-2xl font-bold text-indigo-700 mb-8 tracking-wide pl-2">
          Fable
        </h2>
        <div className="h-1"></div>
        <div className="space-y-1.5 text-[14px]">
          
          {/* ==========================================
              👑 কন্ডিশন ১: লগইন করা ব্যক্তি ADMIN হলে এই মেইন ৫টি অপশন দেখবে
              ========================================== */}
          {currentUser?.role === "admin" && (
            <>
              <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <LayoutDashboard size={18} /> Overview
              </Link>

              <Link href="/dashboard/manage-all-ebooks" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/manage-all-ebooks" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <BookOpen size={18} /> Manage Ebooks
              </Link>

              <Link href="/dashboard/users" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/users" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <Users size={18} /> Users
              </Link>

              <Link href="/dashboard/transactions" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/transactions" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <CreditCard size={18} /> Transactions
              </Link>

              <Link href="/dashboard/analytics" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/analytics" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <TrendingUp size={18} /> Analytics
              </Link>
            </>
          )}

          {/* ==========================================
              🟢 কন্ডিশন ২: লগইন করা ব্যক্তি সাধারণ USER (Reader) হলে এই অপশনগুলো দেখবে
              ========================================== */}
          {currentUser?.role === "user" && (
            <>
             
              
              <Link href="/dashboard/purchases" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/purchases" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <History size={18} /> Purchase History
              </Link>

              <Link href="/dashboard/my-ebooks" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/my-ebooks" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <BookOpen size={18} /> Purchased Ebooks
              </Link>

              <Link href="/dashboard/users/bookmarks" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard/users/bookmarks" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
                <BookMarked size={18} /> Bookmarks
              </Link>
            </>
          )}

          {/* ==========================================
              ✍️ কন্ডিশন ৩: লগইন করা ব্যক্তি WRITER হলে মেইন ওভারভিউ মেনু দেখবে
              ========================================== */}
          {currentUser?.role === "writer" && (
            <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${pathname === "/dashboard" ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" : "hover:bg-indigo-200 hover:text-white text-gray-600"}`}>
              <LayoutDashboard size={18} /> Overview
            </Link>
          )}

          {/* ==========================================
              ✍️ ৪. রাইটার প্যানেল সাব-মেনু (শুধুমাত্র writer অথবা admin হলে দৃশ্যমান হবে)
              ========================================== */}
          {(currentUser?.role === "writer" || currentUser?.role === "admin") && (
            <div className="border-t border-gray-300 my-4 pt-3 space-y-1">
              <div className="h-1"></div>
              <p className="px-4 text-md font-semibold text-red-600 uppercase tracking-wider mb-2">Writer Panel</p>
              <Link href="/dashboard/writer" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/writer" ? "text-indigo-600 font-bold" : "text-gray-500 hover:text-indigo-600"}`}>Writer Home</Link>
              <Link href="/dashboard/add-ebook" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/add-ebook" ? "text-indigo-600 font-bold" : "text-gray-500 hover:text-indigo-600"}`}>Add Ebook</Link>
              <Link
  href="/dashboard/manage-ebooks"
  className={`block px-4 py-1.5 ${
    pathname === "/dashboard/manage-ebooks"
      ? "text-indigo-600 font-bold"
      : "text-gray-500 hover:text-indigo-600"
  }`}
>
  Manage Ebooks
</Link>

              <Link href="/dashboard/sales-history" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/sales-history" ? "text-indigo-600 font-bold" : "text-gray-500 hover:text-indigo-600"}`}>Sales History</Link>
            </div>
          )}

          {/* ==========================================
              👑 ৫. অ্যাডমিন প্যানেল সাব-মেনু (কঠোরভাবে শুধুমাত্র admin লগইন করলেই দেখাবে)
              ========================================== */}
          {currentUser?.role === "admin" && (
            <div className="border-t border-gray-300 my-4 pt-3 space-y-1">
              <div className="h-1"></div>
              <p className="px-4 text-md font-semibold text-red-600 uppercase tracking-wider mb-2">Admin Panel</p>
              <Link href="/dashboard/admin" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/admin" ? "text-indigo-600 font-bold" : "text-gray-500 hover:text-indigo-600"}`}>Admin Home</Link>
              <Link href="/dashboard/manage-users" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/manage-users" ? "text-indigo-600 font-bold" : "text-gray-500 hover:text-indigo-600"}`}>Manage Users</Link>
            </div>
          )}

          <div className="h-2"></div>
          {/* Profile Link */}
          <div className="border-t border-gray-300 my-3 pt-3">
            <div className="h-1"></div>
            <Link href="/profile" className={`flex items-center gap-3 px-4 py-1.5 transition-all duration-200 ${pathname === "/profile" ? "text-indigo-600 font-bold" : "text-gray-700 hover:text-indigo-600"}`}>
              <User size={16} /> Profile
            </Link>
          </div>

        </div>
      </div>     
    </aside>
  );
}
