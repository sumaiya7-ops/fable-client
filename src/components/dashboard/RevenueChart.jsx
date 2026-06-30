"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// 🛠️ ডাটাবেজে কোনো রিয়াল ট্রানজেকশন না থাকলে ফলব্যাক হিসেবে দেখানোর জন্য সেফ স্ট্যান্ডার্ড গ্রাফ ডাটা
const defaultData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 250 },
  { name: 'Mar', value: 400 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 550 },
  { name: 'Jun', value: 800 },
];

export default function RevenueChart({ chartData }) {
  // 🛠️ যদি ব্যাকঅ্যান্ড থেকে রিয়াল ট্রানজেকশন অ্যানালিটিক্স ডেটা আসে তবে সেটি রেন্ডার হবে, না থাকলে ডিফল্ট চার্ট দেখাবে
  const displayData = chartData && chartData.length > 0 ? chartData : defaultData;

  return (
    <div className="w-full bg-indigo-50 h-[240px]" style={{ padding: "8px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            stroke="#4b5563" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#4b5563" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            // 🛠️ ডেটা যদি মেগা ফরম্যাটে (k) না হয়ে ডাইনামিক নরমাল রেভিনিউ অ্যামাউন্ট হয়, তবে সেটি স্ট্যান্ডার্ড দেখাবে
            tickFormatter={(v) => v >= 1000 ? `${v/1000}k` : `$${v}`} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#121222', borderColor: '#1f2937', borderRadius: '8px', color: '#fff' }} 
            formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, "Revenue"]}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366f1" 
            strokeWidth={2.5} 
            fillOpacity={0.15} 
            fill="#6366f1" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
