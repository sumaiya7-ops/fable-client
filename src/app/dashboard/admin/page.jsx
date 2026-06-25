"use client";

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
    <div className="min-h-screen bg-[#0b0c16] text-[#94a3b8] p-4 md:p-8 space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Monitor users, writers, books and platform performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Users */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Users className="text-indigo-400" size={26} />
            <span className="text-emerald-500 bg-[#162a2b] text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">
              +12%
            </span>
          </div>
          <h3 className="text-gray-400 mt-5 text-sm font-medium">Total Users</h3>
          <p className="text-4xl font-bold text-white mt-1">
            2,450
          </p>
        </div>

        {/* Writers */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <PenSquare className="text-purple-400" size={26} />
            <span className="text-emerald-500 bg-[#162a2b] text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">
              +8%
            </span>
          </div>
          <h3 className="text-gray-400 mt-5 text-sm font-medium">Writers</h3>
          <p className="text-4xl font-bold text-white mt-1">
            420
          </p>
        </div>

        {/* Books Sold */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <ShoppingBag className="text-pink-400" size={26} />
            <span className="text-emerald-500 bg-[#162a2b] text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">
              +15%
            </span>
          </div>
          <h3 className="text-gray-400 mt-5 text-sm font-medium">Books Sold</h3>
          <p className="text-4xl font-bold text-white mt-1">
            8,900
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <DollarSign className="text-emerald-400" size={26} />
            <span className="text-emerald-500 bg-[#162a2b] text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">
              +20%
            </span>
          </div>
          <h3 className="text-gray-400 mt-5 text-sm font-medium">Revenue</h3>
          <p className="text-4xl font-bold text-white mt-1">
            $18K
          </p>
        </div>

      </div>

      {/* Analytics Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Platform Growth */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="text-indigo-400" size={22} />
            <h2 className="text-xl font-semibold text-white">
              Platform Growth
            </h2>
          </div>
          <div className="h-64 flex items-center justify-center rounded-xl bg-[#15182e] border border-[#272b4d] text-gray-500 text-sm font-medium tracking-wide">
            Chart Coming From Backend
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-5">
            <BookOpen className="text-purple-400" size={22} />
            <h2 className="text-xl font-semibold text-white">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[#1e223d]/70 pb-3">
              <p className="font-medium text-gray-200">
                New Writer Joined
              </p>
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                Emily Stone • 2 hours ago
              </span>
            </div>

            <div className="border-b border-[#1e223d]/70 pb-3">
              <p className="font-medium text-gray-200">
                New Ebook Published
              </p>
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                Midnight Whispers • 5 hours ago
              </span>
            </div>

            <div>
              <p className="font-medium text-gray-200">
                New Purchase
              </p>
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                3 Books Purchased • Today
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
