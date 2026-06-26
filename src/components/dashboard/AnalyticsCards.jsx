"use client";

import React from "react";
// 🟢 রিকোয়ারমেন্ট অনুযায়ী প্রফেশনাল Lucide আইকনগুলো ইমপোর্ট করা হলো
import { Users, PenSquare, BookOpen, DollarSign } from "lucide-react";

const cards = [
  { title: "Total Users", value: "1,245", icon: Users, bg: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  { title: "Total Writers", value: "236", icon: PenSquare, bg: "bg-teal-500/10 text-teal-400 border border-teal-500/20" },
  { title: "Ebooks", value: "1,856", icon: BookOpen, bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  { title: "Total Revenue", value: "$12,560", icon: DollarSign, bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
];

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" >
      {cards.map((card, i) => {
        // 🟢 লুপের ভেতরে ডাইনামিক আইকন কম্পোনেন্ট অ্যাসাইন করা হলো
        const IconComponent = card.icon;
        
        return (
          <div key={i} className="bg-white border text-gray-900 border-indigo-200 rounded-2xl p-5 flex items-center justify-between shadow-lg hover:border-indigo-500 transition duration-300" style={{ padding: "4px"  }}>
            <div className="flex items-center gap-4">
              {/* আইকন বক্সকে আরও গ্লোয়িং ও ম্যাচিং করা হলো */}
              <div className={`p-3.5 rounded-xl ${card.bg}`}>
                <IconComponent size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold  tracking-wide">{card.value}</h3>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">{card.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
