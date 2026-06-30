"use client";

import React from "react";
// 🟢 Lucide আইকনগুলো ইমপোর্ট করা হলো
import { Users, PenSquare, BookOpen, DollarSign } from "lucide-react";

export default function AnalyticsCards({ stats }) {
  // 🛠️ ডাটাবেজে রিয়াল ডেটা না থাকলে ফলব্যাক হিসেবে ০ বা স্ট্যান্ডার্ড লাইভ কাউন্ট সেট হবে
  const totalUsers = stats?.totalUsers ?? 0;
  const totalWriters = stats?.totalWriters ?? 0;
  const totalEbooksSold = stats?.totalEbooksSold ?? 0;
  const totalRevenue = `$${stats?.totalRevenue ?? 0}`;
  
  const cards = [
    { title: "Total Users", value: totalUsers, icon: Users, bg: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
    { title: "Total Writers", value: totalWriters, icon: PenSquare, bg: "bg-teal-500/10 text-teal-400 border border-teal-500/20" },
    { title: "Ebooks Sold", value: totalEbooksSold, icon: BookOpen, bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
    { title: "Total Revenue", value: totalRevenue, icon: DollarSign, bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const IconComponent = card.icon;
        
        return (
          <div key={i} className="bg-white border text-gray-900 border-indigo-200 rounded-2xl p-5 flex items-center justify-between shadow-lg hover:border-indigo-500 transition duration-300" style={{ padding: "4px" }}>
            <div className="flex items-center gap-4">
              {/* আইকন বক্স */}
              <div className={`p-3.5 rounded-xl ${card.bg}`}>
                <IconComponent size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wide">{card.value}</h3>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">{card.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
