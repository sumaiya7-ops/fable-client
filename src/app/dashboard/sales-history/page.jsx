"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const SalesHistoryPage = () => {
  const [salesList, setSalesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("fable_token"); 
        
        if (!token) {
          console.error("No authentication token found in localStorage.");
          setLoading(false);
          return;
        }

        // লাইভ আলাদা রাইটার এপিআই এন্ডপয়েন্ট কল
        const res = await axios.get(
  "https://fable-server-z2xt.onrender.com/writer-orders",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setSalesList(res.data);
        
    
      } catch (err) {
        console.error("Failed to stream sales invoice data from database engine:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (salesList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 italic text-sm">
        No sales transactions recorded in your library database history yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md" style={{ paddingLeft: "8px" , paddingRight:"8px" , paddingTop:"6px" }}>
      <h1 className="text-3xl font-bold mb-6 text-black">
        Sales History
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="text-left py-4">Ebook</th>
              <th className="text-left py-4">Buyer</th>
              <th className="text-left py-4">Amount</th>
              <th className="text-left py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {salesList.map((sale, i) => {
              const bookTitle = sale.bookTitle || "Premium Publication";
              const buyerName = sale.buyerName || sale.buyerEmail || "Anonymous Reader";
              const rawPrice = sale.amount || 0;
              const rawDate = sale.date?.$date || sale.date;
              const formattedDate = rawDate 
                ? new Date(rawDate).toLocaleDateString("en-GB") 
                : "Recent Order";

              return (
                <tr key={sale._id?.$oid || sale._id || i} className="text-sm text-gray-700 hover:bg-gray-50/50 transition">
                  <td className="py-4 font-medium text-gray-900">{bookTitle}</td>
                  <td className="py-4 text-gray-600 font-medium">{buyerName}</td>
                  <td className="py-4 font-mono text-red-600 font-semibold">
                    ${parseFloat(rawPrice).toFixed(2)}
                  </td>
                  <td className="py-4 text-gray-500">{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SalesHistoryPage), { ssr: false });
