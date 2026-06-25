"use client";

import { useState } from "react";
import { Search, ChevronDown, DollarSign, ArrowUpRight, ArrowDownLeft, AlertCircle } from "lucide-react";

// ইমেজের ডেটা অনুযায়ী রিয়েল ডাটা সেটআপ
const initialTransactions = [
  {
    id: "TXN1245",
    user: "john.doe@gmail.com",
    type: "Purchase",
    amount: "$4.99",
    date: "May 12, 2024",
    status: "Success",
  },
  {
    id: "TXN1244",
    user: "emily.stone@gmail.com",
    type: "Ebook Sale",
    amount: "$19.90",
    date: "May 12, 2024",
    status: "Success",
  },
  {
    id: "TXN1243",
    user: "alex.mercer@gmail.com",
    type: "Purchase",
    amount: "$3.49",
    date: "May 11, 2024",
    status: "Success",
  },
  {
    id: "TXN1242",
    user: "sophia.bailey@gmail.com",
    type: "Purchase",
    amount: "$4.99",
    date: "May 11, 2024",
    status: "Success",
  },
  {
    id: "TXN1241",
    user: "daniel.lewis@gmail.com",
    type: "Purchase",
    amount: "$3.90",
    date: "May 11, 2024",
    status: "Others",
  },
];
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // সার্চ এবং ফিল্টার লজিক
  const filteredTransactions = transactions.filter((trx) => {
    const matchSearch =
      trx.id.toLowerCase().includes(search.toLowerCase()) ||
      trx.user.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter === "All" || trx.type === typeFilter;

    return matchSearch && matchType;
  });

  // স্ট্যাটাস কার্ডের জন্য ডাইনামিক ক্যালকুলেশন
  const totalRevenue = transactions
    .filter(t => t.status === "Success")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace("$", "")), 0);

  return (
    <div className="min-h-screen bg-[#0b0c16] text-[#94a3b8] p-4 md:p-8 flex items-center justify-center font-sans">
      
      {/* মেইন কন্টেইনার */}
      <div className="bg-[#0f1123] border border-[#1e223d] p-5 md:p-8 rounded-2xl w-full max-w-6xl shadow-2xl space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-wide mb-1">
            All Transactions
          </h1>
          <p className="text-sm text-gray-400">
            View all platform transactions.
          </p>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Transactions */}
          <div className="bg-[#15182e] border border-[#272b4d] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <DollarSign className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-gray-400 mt-4 text-sm font-medium">Total Volume</h3>
            <p className="text-3xl font-bold text-white mt-1">${totalRevenue.toFixed(2)}</p>
          </div>

          {/* Success Sales */}
          <div className="bg-[#15182e] border border-[#272b4d] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <ArrowUpRight className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-gray-400 mt-4 text-sm font-medium">Successful</h3>
            <p className="text-3xl font-bold text-white mt-1">
              {transactions.filter(t => t.status === "Success").length}
            </p>
          </div>

          {/* Pending/Others */}
          <div className="bg-[#15182e] border border-[#272b4d] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <AlertCircle className="text-rose-400" size={24} />
            </div>
            <h3 className="text-gray-400 mt-4 text-sm font-medium">Failed / Others</h3>
            <p className="text-3xl font-bold text-white mt-1">
              {transactions.filter(t => t.status !== "Success").length}
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
          {/* সার্চ ইনপুট বার */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#15182e] border border-[#272b4d] text-sm text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#5826df] transition"
            />
          </div>
          
          {/* ড্রপডাউন ফিল্টার */}
          <div className="relative w-full sm:w-44">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full appearance-none bg-[#15182e] border border-[#272b4d] text-sm text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#5826df] cursor-pointer pr-10"
            >
              <option value="All">All Types</option>
              <option value="Purchase">Purchase</option>
              <option value="Ebook Sale">Ebook Sale</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* টেবিল এরিয়া */}
        <div className="overflow-x-auto rounded-xl border border-[#1e223d]/40">
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs md:text-sm font-medium border-b border-[#1e223d] bg-[#13152a]">
                <th className="p-4 font-normal">ID</th>
                <th className="p-4 font-normal">User</th>
                <th className="p-4 font-normal">Type</th>
                <th className="p-4 font-normal">Amount</th>
                <th className="p-4 font-normal">Date</th>
                <th className="p-4 font-normal text-center">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#1e223d]/40">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="text-sm text-gray-300 hover:bg-[#15182e]/30 transition">
                  <td className="p-4 font-mono text-gray-400">{trx.id}</td>
                  <td className="p-4 text-white font-medium">{trx.user}</td>
                  <td className="p-4 text-gray-400">{trx.type}</td>
                  <td className="p-4 font-mono text-gray-200">{trx.amount}</td>
                  <td className="p-4 text-gray-400">{trx.date}</td>
                  
                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="p-4 text-center">
                    {trx.status === "Success" ? (
                      <span className="bg-[#122b27] text-[#5eead4] text-xs font-semibold px-3 py-1 rounded border border-[#145346] tracking-wide inline-block w-20">
                        Success
                      </span>
                    ) : (
                      <span className="bg-[#36161c] text-[#ef4444] text-xs font-semibold px-3 py-1 rounded border border-[#6b1e28] tracking-wide inline-block w-20">
                        Others
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* এম্পটি স্টেট */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 border border-t-0 border-[#1e223d]/40 rounded-b-xl">
            <p className="text-gray-500 text-sm">No transactions found.</p>
          </div>
        )}

        {/* পেজিনেশন */}
        <div className="flex justify-center items-center gap-2">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#5826df] text-white text-xs font-semibold">
            1
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#15182e] text-xs transition">
            2
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#15182e] text-xs transition">
            3
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#15182e] text-xs transition">
            &gt;
          </button>
        </div>

      </div>
    </div>
  );
}
