"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 5500 },
  { name: 'Mar', value: 4800 },
  { name: 'Apr', value: 6500 },
  { name: 'May', value: 5200 },
  { name: 'Jun', value: 8500 },
];

export default function RevenueChart() {
  return (
    /* 🟢 ড্যাশবোর্ডের মূল বক্সের সাথে ফিট করার জন্য এক্সট্রা ব্যাকগ্রাউন্ড, বর্ডার ও টাইটেল সরানো হলো */
    <div className="w-full bg-indigo-50 h-[240px]" style={{ padding: "8px"  }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
          <Tooltip contentStyle={{ backgroundColor: '#121222', borderColor: '#1f2937', borderRadius: '8px', color: '#fff' }} />
          <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fillOpacity={0.15} fill="#6366f1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
