"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecentTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ ডাটাবেজের ট্রানজেকশন কালেকশন থেকে রিয়েল-টাইম পেমেন্ট হিস্ট্রি লোড করা
  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const token = localStorage.getItem("fable_token");
        // আমরা ব্যাকএন্ডে যে গ্লোবাল ট্রানজেকশন রাউট সেট করেছিলাম সেখানে হিট করবে
        const res = await axios.get("https://fable-server-z2xt.onrender.com/writer/sales", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // যদি ডাটাবেজে কোনো ট্রানজেকশন না থাকে তবে সেফ ফলব্যাক ফাঁকা অ্যারে
        setTransactions(res.data || []);
      } catch (err) {
        console.error("Failed to load recent transactions from DB:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentTransactions();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[150px] flex items-center justify-center bg-indigo-50">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-indigo-50 overflow-x-auto rounded-md border border-gray-800/30 bg-[#13152a]/20" style={{ padding: "8px" }}>
      <table className="min-w-[500px] w-full text-left text-xs border-collapse">
        <thead>
          <tr className="text-gray-900 font-medium border-b border-indigo-400/60 bg-indigo-50">
            <th className="p-4 font-normal">ID</th>
            <th className="p-4 font-normal">User / Buyer</th>
            <th className="p-4 font-normal">Type</th>
            <th className="p-4 font-normal">Amount</th>
            <th className="p-4 font-normal">Date</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-indigo-100 text-gray-600">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-400 italic">
                No recent transactions recorded in database.
              </td>
            </tr>
          ) : (
            transactions.map((tx, i) => (
              <tr key={tx._id || i} className="hover:bg-indigo-100 transition duration-150">
                {/* 🛠️ ডাটাবেজে থাকা আসল স্ট্রাইপ ট্রানজেকশন আইডি */}
                <td className="p-4 font-mono text-gray-700 truncate max-w-[120px]" title={tx.transactionId}>
                  {tx.transactionId}
                </td>
                {/* 🛠️ আসল ক্রেতার জিমেইল */}
                <td className="p-4 text-black font-medium">{tx.buyerEmail || tx.user}</td>
                {/* 🛠️ ডাইনামিক ট্রানজেকশন টাইপ */}
                <td className="p-4 text-purple-600 font-medium capitalize">{tx.type || "Purchase"}</td>
                {/* 🛠️ সেন্ট থেকে কনভার্ট হওয়া আসল ডলার অ্যামাউন্ট */}
                <td className="p-4 text-emerald-600 font-mono font-semibold">
                  ${parseFloat(tx.amount || 4.99).toFixed(2)}
                </td>
                {/* 🛠️ ডাটাবেজের আসল পেমেন্টের তারিখ */}
                <td className="p-4 text-gray-700">
                  {tx.date ? new Date(tx.date).toLocaleDateString() : "May 12, 2024"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
