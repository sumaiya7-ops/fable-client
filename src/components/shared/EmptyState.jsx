"use client";

import React from "react";

// আমরা এখানে isDark নামে একটি অপশন যোগ করেছি, যা ডিফল্টভাবে true থাকবে
export default function EmptyState({ title, subtitle, isDark = true }) {
  return (
    <div className="text-center py-20 animate-fade-in">
      
      {/* 🟢 যদি isDark এর মান true হয় তবে ডার্ক কালার পাবে, false হলে লাইট কালার পাবে */}
      <h2 className={`text-3xl font-bold tracking-tight ${
        isDark ? "text-indigo-100" : "text-indigo-950"
      }`}>
        {title}
      </h2>

      <p className={`mt-3 text-sm font-medium ${
        isDark ? "text-indigo-300" : "text-gray-600"
      }`}>
        {subtitle}
      </p>

    </div>
  );
}
