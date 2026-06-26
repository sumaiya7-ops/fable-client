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
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8 flex items-center justify-center font-sans" style={{ padding: "8px"  }}>
      
      {/* মেইন কন্টেইনার */}
      <div className="bg-indigo-50 border border-indigo-200 p-5 md:p-8 rounded-2xl w-full max-w-6xl shadow-2xl space-y-8" style={{ padding: "8px"  }}>
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-indigo-600 tracking-wide mb-1">
            All Transactions
          </h1>
          <p className="text-sm text-gray-600">
            View all platform transactions.
          </p>
        </div>
        <div className="h-2"></div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Transactions */}
          <div className="bg-white border border-indigo-300 rounded-2xl p-5 shadow-lg" style={{ padding: "8px"  }}>
            <div className="flex items-center justify-between">
              <DollarSign className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-gray-800 mt-4 text-sm font-medium">Total Volume</h3>
            <p className="text-3xl font-bold text-red-500 mt-1">${totalRevenue.toFixed(2)}</p>
          </div>

          {/* Success Sales */}
          <div className="bg-white border border-indigo-300 rounded-2xl p-5 shadow-lg" style={{ padding: "8px"  }}>
            <div className="flex items-center justify-between">
              <ArrowUpRight className="text-emerald-600" size={24} />
            </div>
            <h3 className="text-gray-700 mt-4 text-sm font-medium">Successful</h3>
            <p className="text-3xl font-bold text-red-500 mt-1">
              {transactions.filter(t => t.status === "Success").length}
            </p>
          </div>

          {/* Pending/Others */}
          <div className="bg-white border border-indigo-300 rounded-2xl p-5 shadow-lg" style={{ padding: "8px"  }}>
            <div className="flex items-center justify-between">
              <AlertCircle className="text-rose-600" size={24} />
            </div>
            <h3 className="text-gray-700 mt-4 text-sm font-medium">Failed / Others</h3>
            <p className="text-3xl font-bold text-red-500 mt-1">
              {transactions.filter(t => t.status !== "Success").length}
            </p>
          </div>
        </div>
             <div className="h-2"></div>
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
          {/* সার্চ ইনপুট বার */}
          <div className="relative w-full  sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-indigo-700 border border-[#1c2cb5] text-sm text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#5826df] transition"
            />
          </div>
          
          {/* ড্রপডাউন ফিল্টার */}
          <div className="relative w-full sm:w-44">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full appearance-none bg-indigo-700 border border-[#2837c1] text-sm text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#5826df] cursor-pointer pr-10"
            >
              <option value="All">All Types</option>
              <option value="Purchase">Purchase</option>
              <option value="Ebook Sale">Ebook Sale</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-100 pointer-events-none" />
          </div>
        </div>
          <div className="h-2"></div>
        {/* টেবিল এরিয়া */}
        <div className="overflow-x-auto rounded-xl border border-indigo-600 bg-white"  style={{ paddingLeft: "8px" , paddingRight:"8px" }}  >
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-900 text-md md:text-sm font-medium border-b border-[#7a89e8] bg-indigo-50">
                <th className="p-4 font-normal">ID</th>
                <th className="p-4 font-normal">User</th>
                <th className="p-4 font-normal">Type</th>
                <th className="p-4 font-normal">Amount</th>
                <th className="p-4 font-normal">Date</th>
                <th className="p-4 font-normal text-center">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#1e223d]/30">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="text-sm text-gray-900 hover:bg-indigo-100 transition">
                  <td className="p-4 font-mono text-gray-700">{trx.id}</td>
                  <td className="p-4 text-gray-500 front-medium">{trx.user}</td>
                  <td className="p-4 text-gray-700">{trx.type}</td>
                  <td className="p-4 font-mono text-red-500">{trx.amount}</td>
                  <td className="p-4 text-gray-600">{trx.date}</td>
                  
                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="p-4 text-center">
                    {trx.status === "Success" ? (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded border border-green-700 tracking-wide inline-block w-20">
                        Success
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded border border-[#e81c37] tracking-wide inline-block w-20">
                        Others
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 border border-t-0 border-[#1e223d]/40 rounded-b-xl">
            <p className="text-gray-700 text-sm">No transactions found.</p>
          </div>
        )}

       
        <div className="flex justify-center items-center gap-2">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#5826df] text-white text-xs font-semibold">
            1
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-[#9da7f7] text-xs transition">
            2
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-[#9da7f7] text-xs transition">
            3
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-[#9da7f7] text-xs transition">
            &gt;
          </button>
        </div>

      </div>
    </div>
  );
}
