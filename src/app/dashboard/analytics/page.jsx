"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
} from "lucide-react";

// মক ডাটা সেটআপ
const topBooks = [
  { id: 1, title: "The Silent Watcher", sales: 452 },
  { id: 2, title: "Beyond the Horizon", sales: 320 },
  { id: 3, title: "Midnight Whispers", sales: 210 },
  { id: 4, title: "Whispers in the Dark", sales: 150 },
];

const recentActivities = [
  "New ebook published by Emily Stone",
  "John Doe purchased 'The Silent Watcher'",
  "New writer registered",
  "Revenue updated after ebook sale",
];
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0b0c16] text-[#94a3b8] p-4 md:p-8 space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
          Analytics Overview
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Monitor platform performance and growth.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Revenue */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <DollarSign className="text-emerald-400" size={26} />
            <TrendingUp className="text-emerald-500" size={18} />
          </div>
          <h3 className="text-gray-400 mt-4 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-white mt-1">$18,450</p>
        </div>

        {/* Total Sales */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <ShoppingCart className="text-indigo-400" size={26} />
            <TrendingUp className="text-emerald-500" size={18} />
          </div>
          <h3 className="text-gray-400 mt-4 text-sm font-medium">Total Sales</h3>
          <p className="text-3xl font-bold text-white mt-1">8,900</p>
        </div>

        {/* Total Users */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Users className="text-purple-400" size={26} />
          </div>
          <h3 className="text-gray-400 mt-4 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-white mt-1">2,450</p>
        </div>

        {/* Total Ebooks */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <BookOpen className="text-pink-400" size={26} />
          </div>
          <h3 className="text-gray-400 mt-4 text-sm font-medium">Total Ebooks</h3>
          <p className="text-3xl font-bold text-white mt-1">420</p>
        </div>

      </div>

      {/* Charts (গ্রোথ বক্স উইজেট) */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <h2 className="font-semibold text-lg text-white mb-4">
            Monthly Sales Chart
          </h2>
          <div className="h-64 rounded-xl bg-[#15182e] border border-[#272b4d] flex items-center justify-center text-gray-500 text-sm font-medium">
            Sales Chart Placeholder
          </div>
        </div>

        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <h2 className="font-semibold text-lg text-white mb-4">
            Genre Distribution
          </h2>
          <div className="h-64 rounded-xl bg-[#15182e] border border-[#272b4d] flex items-center justify-center text-gray-500 text-sm font-medium">
            Pie Chart Placeholder
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Top Selling Books */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <h2 className="font-semibold text-lg text-white mb-6">
            Top Selling Books
          </h2>
          <div className="space-y-4">
            {topBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between border-b border-[#1e223d]/50 pb-3 last:border-0 last:pb-0"
              >
                <span className="font-medium text-gray-200 text-sm">
                  {book.title}
                </span>
                <span className="text-indigo-400 font-semibold text-sm bg-[#1e1c3d] px-3 py-1 rounded-md border border-[#3b3370]">
                  {book.sales} Sales
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 text-purple-400">
            <Activity size={20} />
            <h2 className="font-semibold text-lg text-white">
              Recent Activities
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 bg-[#14162e] pl-4 py-2.5 rounded-r-lg text-gray-300 text-sm border-t border-b border-r border-[#242952]"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
