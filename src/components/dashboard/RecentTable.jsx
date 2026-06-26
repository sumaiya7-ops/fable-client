"use client";

import React from "react";

const transactions = [
  { id: "TXN1245", user: "john.doe@gmail.com", type: "Purchase", amount: "$4.99", date: "May 12, 2024" },
  { id: "TXN1246", user: "emily.stone@gmail.com", type: "Ebook Sale", amount: "$19.99", date: "May 12, 2024" },
];

export default function RecentTable() {
  return (
    /* 🟢 ড্যাশবোর্ডের মূল কন্টেইনারের সাথে ফিট করার জন্য এক্সট্রা ব্যাকগ্রাউন্ড, বর্ডার ও টাইটেল সরানো হলো */
    <div className="w-full bg-indigo-50  overflow-x-auto rounded-md border border-gray-800/30 bg-[#13152a]/20" style={{ padding: "8px"  }}>
      <table className="min-w-[500px] w-full text-left text-xs border-collapse">
        <thead>
          <tr className="text-gray-900 font-medium border-b border-indigo-400/60 bg-indigo-50">
            <th className="p-4 font-normal">ID</th>
            <th className="p-4 font-normal">User</th>
            <th className="p-4 font-normal">Type</th>
            <th className="p-4 font-normal">Amount</th>
            <th className="p-4 font-normal">Date</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-indigo-100 text-gray-600">
          {transactions.map((tx, i) => (
            <tr key={i} className="hover:bg-indigo-100 transition duration-150">
              <td className="p-4 font-mono text-gray-700">{tx.id}</td>
              <td className="p-4 text-black font-medium">{tx.user}</td>
              <td className="p-4 text-purple-600 font-medium">{tx.type}</td>
              <td className="p-4 text-red-600 font-mono font-semibold">{tx.amount}</td>
              <td className="p-4 text-gray-700">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
