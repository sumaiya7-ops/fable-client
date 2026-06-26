"use client";
import RevenueChart from "../../../components/dashboard/RevenueChart"
import GenrePieChart from "../../../components/dashboard/GenrePieChart"
import {
  Users,
  PenSquare,
  BookOpen,
  DollarSign,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900 p-4 md:p-8 space-y-8 font-sans" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Monitor users, writers, books and platform performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Users */}
        <div className="bg-white border border-[#606ec7] rounded-2xl p-6 shadow-2xl" style={{ padding: "4px"  }}>
          <div className="flex items-center justify-between">
            <Users className="text-indigo-600" size={26} />
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-800">
              +12%
            </span>
          </div>
          <h3 className="text-gray-600 mt-5 text-sm font-medium">Total Users</h3>
          <p className="text-4xl font-bold text-red-500 mt-1">
            2,450
          </p>
        </div>

        {/* Writers */}
        <div className="bg-white border border-[#5e6ed5] rounded-2xl p-6 shadow-2xl" style={{ padding: "4px"  }}>
          <div className="flex items-center justify-between">
            <PenSquare className="text-purple-700" size={26} />
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-800">
              +8%
            </span>
          </div>
          <h3 className="text-gray-600 mt-5 text-sm font-medium">Writers</h3>
          <p className="text-4xl font-bold text-red-500 mt-1">
            420
          </p>
        </div>

        {/* Books Sold */}
        <div className="bg-white border border-[#4d5cb8] rounded-2xl p-6 shadow-2xl" style={{ padding: "4px"  }}>
          <div className="flex items-center justify-between">
            <ShoppingBag className="text-pink-700" size={26} />
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">
              +15%
            </span>
          </div>
          <h3 className="text-gray-600 mt-5 text-sm font-medium">Books Sold</h3>
          <p className="text-4xl font-bold text-red-500 mt-1">
            8,900
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white border border-[#5c6cd4] rounded-2xl p-6 shadow-2xl" style={{ padding: "4px"  }}>
          <div className="flex items-center justify-between">
            <DollarSign className="text-red-600" size={26} />
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-800">
              +20%
            </span>
          </div>
          <h3 className="text-gray-600 mt-5 text-sm font-medium">Revenue</h3>
          <p className="text-4xl font-bold text-red-500 mt-1">
            $18K
          </p>
        </div>

      </div>
      <div className="h-2"></div>

      {/* Analytics Section */}
 {/* 🟢 এই কোডটি আগের Platform Growth বক্সের জায়গায় রিপ্লেস করে দিন */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  
  {/* সেলস রেভিনিউ চার্ট (২ কলাম জুড়ে থাকবে) */}
  <div className="xl:col-span-2 bg-white border border-[#6c7de8] rounded-2xl p-6 shadow-2xl overflow-hidden" style={{ padding: "8px"  }}>
    <div className="flex items-center gap-3 mb-5">
      <TrendingUp className="text-indigo-700" size={22} />
      <h2 className="text-xl font-semibold ">Sales Overview</h2>
    </div>
    <div className="w-full">
      <RevenueChart />
    </div>
  </div>

  {/* জঁনরা পাই চার্ট (১ কলাম জুড়ে থাকবে) */}
  <div className="bg-white border border-[#6875ca] rounded-2xl p-6 shadow-2xl overflow-hidden" style={{ padding: "8px"  }}>
    <div className="flex items-center gap-3 mb-5">
      <TrendingUp className="text-purple-700" size={22} />
      <h2 className="text-xl font-semibold ">Ebooks by Genre</h2>
    </div>
    <div className="w-full flex justify-center">
      <GenrePieChart />
    </div>
  </div>

</div>
<div className="h-2"></div>


        {/* Recent Activity */}
        <div className="bg-white border border-[#6576e6] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center gap-3 mb-5">
            <BookOpen className="text-purple-700" size={22} />
            <h2 className="text-xl font-semibold ">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[#1e223d]/30 pb-3">
              <p className="font-medium text-gray-700">
                New Writer Joined
              </p>
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                Emily Stone • 2 hours ago
              </span>
            </div>

            <div className="border-b border-[#1e223d]/30 pb-3">
              <p className="font-medium text-gray-700">
                New Ebook Published
              </p>
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                Midnight Whispers • 5 hours ago
              </span>
            </div>

            <div>
              <p className="font-medium text-gray-700">
                New Purchase
              </p>
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                3 Books Purchased • Today
              </span>
            </div>
          </div>
        </div>

      </div>

   
  );
}
