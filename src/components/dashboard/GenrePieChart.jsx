"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// 🛠️ ডাটাবেজে কোনো রিয়াল ডেটা না থাকলে ফলব্যাক হিসেবে দেখানোর জন্য সেফ স্ট্যান্ডার্ড ডেমো ডাটা
const defaultData = [
  { name: 'Psychology', value: 40, color: '#593cfb' },
  { name: 'History', value: 35, color: '#06b6d4' },
  { name: 'Self Help', value: 25, color: '#f43f5e' },
];

export default function GenrePieChart({ chartData }) {
  // 🛠️ যদি ব্যাকঅ্যান্ড থেকে রিয়াল এগ্রিগেশন ডেটা আসে তবে সেটি রেন্ডার হবে, না থাকলে ডিফল্ট চার্ট দেখাবে
  const displayData = chartData && chartData.length > 0 ? chartData : defaultData;

  return (
    <div className="w-full flex items-center bg-indigo-50 justify-between h-[200px]" style={{ padding: "8px" }}>
      
      {/* বাম পাশে গোল পাই চার্ট (রিয়াল ডাটাবেজ ড্রিভেন) */}
      <div className="w-1/2 h-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={displayData} 
              innerRadius={50} 
              outerRadius={70} 
              paddingAngle={4} 
              dataKey="value"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#593cfb'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ডান পাশে সুন্দর সমান্তরাল টেক্সট লিস্ট (লেজেন্ড) */}
      <div className="w-1/2 space-y-2.5 pl-4">
        {displayData.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color || '#593cfb' }}></span>
              <span className="text-gray-700 font-medium truncate max-w-[80px]">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
  );
}
