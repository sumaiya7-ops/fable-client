"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation"; 

export default function DashboardSidebar() {
  const pathname = usePathname(); 

  return (
    <aside className="bg-[#121222] text-gray-400 p-6 h-full min-h-screen border-r border-gray-800/30 flex flex-col justify-between">
      <div>
        {/* ব্র্যান্ড লোগো */}
        <h2 className="text-2xl font-bold text-white mb-8 tracking-wide pl-2">
          Fable
        </h2>

        {/* মেইন লিংকসমূহ */}
        <div className="space-y-1.5 text-[14px]">
          
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>🎛️</span> Overview
          </Link>

          <Link href="/dashboard/manage-ebooks" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/manage-ebooks" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>📚</span> Manage Ebooks
          </Link>

          <Link href="/dashboard/users" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/users" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>👥</span> Users
          </Link>

          <Link href="/dashboard/transactions" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/transactions" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>💳</span> Transactions
          </Link>

          <Link href="/dashboard/analytics" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/analytics" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>📈</span> Analytics
          </Link>
          
          <Link href="/dashboard/purchases" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/purchases" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>🛒</span> Purchase History
          </Link>

          <Link href="/dashboard/my-ebooks" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/my-ebooks" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>📖</span> Purchased Ebooks
          </Link>

          <Link href="/dashboard/bookmarks" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard/bookmarks" 
              ? "bg-green-600 text-white font-medium shadow-lg shadow-green-600/20" 
              : "hover:bg-gray-800/40 hover:text-white text-gray-400"
          }`}>
            <span>🔖</span> Bookmarks
          </Link>
          
          {/* রাইটার প্যানেল */}
          <div className="border-t border-gray-800/60 my-4 pt-3 space-y-1">
            <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Writer Panel</p>
            <Link href="/dashboard/writer" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/writer" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Writer Home</Link>
            <Link href="/dashboard/add-ebook" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/add-ebook" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Add Ebook</Link>
            <Link href="/dashboard/sales-history" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/sales-history" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Sales History</Link>
          </div>

          {/* এডমিন প্যানেল */}
          <div className="border-t border-gray-800/60 my-4 pt-3 space-y-1">
            <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Admin Panel</p>
            <Link href="/dashboard/admin" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/admin" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Admin Home</Link>
            <Link href="/dashboard/manage-users" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/manage-users" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Manage Users</Link>
            <Link href="/dashboard/manage-all-ebooks" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/dashboard/manage-all-ebooks" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>Manage All Ebooks</Link>
          </div>

          {/* প্রোফাইল লিংক */}
          <div className="border-t border-gray-800/60 my-3 pt-3">
            <Link href="/profile" className={`block px-4 py-1.5 transition-all duration-200 ${pathname === "/profile" ? "text-green-400 font-bold" : "text-gray-400 hover:text-white"}`}>👤 Profile</Link>
          </div>

        </div>
      </div>

      {/* লগআউট বাটন */}
      <div className="border-t border-gray-800/60 pt-4 text-[14px]">
        <Link href="/logout" className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/5 transition">
          <span>🚪</span> Logout
        </Link>
      </div>
    </aside>
  );
}
