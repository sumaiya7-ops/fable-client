"use client";

import RevenueChart from "../../../components/dashboard/RevenueChart"
import GenrePieChart from "../../../components/dashboard/GenrePieChart"

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
    <div className="min-h-screen bg-indigo-50 text-[#94a3b8] p-4 md:p-8 space-y-8 font-sans" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 tracking-wide">
          Analytics Overview
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Monitor platform performance and growth.
        </p>
      </div>
      <div className="h-1"></div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Revenue */}
        <div className="bg-white border border-[#7889f4] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <DollarSign className="text-emerald-600" size={26} />
            <TrendingUp className="text-emerald-600" size={18} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">$18,450</p>
        </div>

        {/* Total Sales */}
        <div className="bg-white border border-[#7080e8] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <ShoppingCart className="text-indigo-700" size={26} />
            <TrendingUp className="text-emerald-600" size={18} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Sales</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">8,900</p>
        </div>

        {/* Total Users */}
        <div className="bg-white border border-[#7483e4] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <Users className="text-purple-700" size={26} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">2,450</p>
        </div>

        {/* Total Ebooks */}
        <div className="bg-white border border-[#6879e7] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <BookOpen className="text-pink-700" size={26} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Ebooks</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">420</p>
        </div>

      </div>
      <div className="h-2"></div>

      {/* Charts (গ্রোথ বক্স উইজেট) */}
          {/* 🟢 প্লেসহোল্ডার কেটে এই সম্পূর্ণ চার্ট গ্রিডটি বসিয়ে দিন */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* মান্থলি সেলস রেভিনিউ চার্ট (২ কলাম জুড়ে থাকবে) */}
        <div className="xl:col-span-2 bg-white  border border-[#6876d0] rounded-2xl p-6 shadow-2xl overflow-hidden">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Monthly Sales Chart</h2>
          <div className="w-full">
            <RevenueChart />
          </div>
        </div>

        {/* জঁনরা পাই চার্ট (১ কলাম জুড়ে থাকবে) */}
        <div className="bg-white border border-[#6370c7] rounded-2xl p-6 shadow-2xl overflow-hidden">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Genre Distribution</h2>
          <div className="w-full flex justify-center">
            <GenrePieChart />
          </div>
        </div>

      </div>
      <div className="h-1"></div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Top Selling Books */}
        <div className="bg-white border border-[#5e70e4] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <h2 className="font-semibold text-lg text-gray-950 mb-6">
            Top Selling Books
          </h2>
          <div className="space-y-4">
            {topBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center  justify-between border-b border-[#1e223d]/50 pb-3 last:border-0 last:pb-0"
              >
                <span className="font-medium text-gray-600 text-sm">
                  {book.title}
                </span>
                <span className="bg-indigo-300 text-black font-semibold text-sm  px-3 py-1 rounded-md border border-[#7a6ae0]">
                  {book.sales} Sales
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-[#6e7cd6] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
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
                className="border-l-4 border-indigo-500  pl-4 py-2.5 rounded-r-lg text-gray-700 text-sm border-t border-b border-r border-[#242952]"
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
