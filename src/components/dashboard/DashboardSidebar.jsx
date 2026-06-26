"use client"; 

import Link from "next/link";
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
  LogOut 
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname(); 

  return (
    <aside className="bg-white  text-gray-800  h-full min-h-screen border-r border-indigo-400 flex flex-col justify-between" style={{ paddingLeft: "16px" }}>
      <div>
       
        <h2 className="text-2xl font-bold text-indigo-700 mb-8 tracking-wide pl-2">
          Fable
        </h2>
         <div className="h-1"></div>
        <div className="space-y-1.5 text-[14px]">
          
         
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <LayoutDashboard size={18} /> Overview
          </Link>

          {/* 🟢 আপনার ফোল্ডারের আসল বানানের সাথে মিলিয়ে /dashboard/manage-all-ebooks লিংক ফিক্স করা হলো */}
          <Link href="/dashboard/manage-all-ebooks" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/manage-all-ebooks" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <BookOpen size={18} /> Manage Ebooks
          </Link>

          {/* Users */}
          <Link href="/dashboard/users" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/users" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <Users size={18} /> Users
          </Link>

          {/* Transactions */}
          <Link href="/dashboard/transactions" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/transactions" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <CreditCard size={18} /> Transactions
          </Link>

          {/* Analytics */}
          <Link href="/dashboard/analytics" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/analytics" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <TrendingUp size={18} /> Analytics
          </Link>
          {/* Purchase History */}
          <Link href="/dashboard/purchases" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/purchases" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <History size={18} /> Purchase History
          </Link>

          {/* Purchased Ebooks */}
          <Link href="/dashboard/my-ebooks" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/my-ebooks" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <BookOpen size={18} /> Purchased Ebooks
          </Link>

          {/* Bookmarks */}
          <Link href="/dashboard/bookmarks" className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/bookmarks" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-indigo-200 hover:text-white text-gray-600"
          }`}>
            <BookMarked size={18} /> Bookmarks
          </Link>
          <div className="h-2"></div>
          {/* Writer Panel */}
          <div className="border-t border-gray-300 my-4 pt-3 space-y-1">
            <div className="h-1"></div>
            <p className="px-4 text-md font-semibold text-red-600 uppercase tracking-wider mb-2">Writer Panel</p>
            <Link href="/dashboard/writer" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/writer" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Writer Home</Link>
            <Link href="/dashboard/add-ebook" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/add-ebook" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Add Ebook</Link>
            <Link href="/dashboard/sales-history" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/sales-history" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Sales History</Link>
          </div>
         <div className="h-2"></div>
          {/* Admin Panel */}
          <div className="border-t border-gray-300 my-4 pt-3 space-y-1">
            <div className="h-1"></div>
            <p className="px-4 text-md font-semibold text-red-600 uppercase tracking-wider mb-2">Admin Panel</p>
            <Link href="/dashboard/admin" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/admin" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Admin Home</Link>
            <Link href="/dashboard/manage-users" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/manage-users" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Manage Users</Link>
            <Link href="/dashboard/manage-all-ebooks" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/manage-all-ebooks" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Manage All Ebooks</Link>
          </div>
             <div className="h-2"></div>
          {/* Profile Link */}
          <div className="border-t border-gray-300 my-3 pt-3">
            <div className="h-1"></div>
            <Link href="/profile" className={`flex items-center gap-3 px-4 py-1.5 transition-all duration-200 ${pathname === "/profile" ? "text-green-400 font-bold" : "text-gray-700 hover:text-white"}`}>
              <User size={16} /> Profile
            </Link>
          </div>

        </div>
      </div>

      {/* Logout Box */}
      <div className="border-t border-gray-400/60 pt-4 text-[14px]">
        <Link href="/logout" className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition">
          <LogOut size={16} /> Logout
        </Link>
      </div>
    </aside>
  );
}
