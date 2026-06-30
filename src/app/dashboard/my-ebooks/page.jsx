"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"; 

export default function MyEbooksPage() {
  const [purchasedList, setPurchasedList] = useState([]);
  const [loading, setLoading] = useState(true);

  // MongoDB ডাটাবেজ থেকে আপনার কেনা বই ও তার আসল অ্যাসেট টেনে আনার ইঞ্জিন
  useEffect(() => {
    const fetchMyEbooks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("fable_token"); 
        
        // ১. ট্রানজেকশন কালেকশন থেকে আপনার কেনা অর্ডারের লাইভ ডাটা নিয়ে আসা
        const res = await axios.get("https://fable-server-z2xt.onrender.com/user/purchases", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const ordersData = res.data || [];
        
     
        // ৩. ট্রানজেকশন আইডির সাথে মেইন ইবুকের ডেটা অবজেক্ট নিখুঁতভাবে জয়েন (Join) করা
       const finalRealBooks = ordersData.map((item) => ({
  id: item.ebook._id,
  title: item.ebook.title,
  writer: item.ebook.writerName || item.ebook.writer,
  image: item.ebook.coverUrl || item.ebook.image,
  pdfFile: item.ebook.pdfUrl,
}));

setPurchasedList(finalRealBooks);
 
      } catch (err) {
        console.error("Failed to fetch real purchased ebooks from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEbooks();
  }, []);

  // পিডিএফ রিডার ট্রিগার ইঞ্জিন ফাংশন
const handleOpenPdfReader = (pdfUrl, title) => {
  if (!pdfUrl) {
    alert("PDF file not found!");
    return;
  }

  const finalUrl = pdfUrl.startsWith("http")
    ? pdfUrl
    : `https://fable-server-z2xt.onrender.com${pdfUrl}`;

  alert(`Opening ${title}`);

  window.open(finalUrl, "_blank");
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen w-full">

      <h1 className="text-3xl font-bold text-black mb-8" style={{ padding: "8px" }}>
        Purchased Ebooks
      </h1>

      {/* Gallery Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" style={{ padding: "8px" }}>
        {purchasedList.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between group hover:shadow-lg transition duration-300 max-w-sm" 
            style={{ padding: "8px" }}
          >
            <div>
              {/* কভার ইমেজ এরিয়া */}
              <div className="w-full aspect-[3/4] bg-indigo-50 rounded-lg overflow-hidden relative border border-gray-100 shadow-sm">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  onError={(e) => { e.target.src = "https://co.com"; }}
                />
              </div>

              <div className="p-5">
                <h3 className="font-bold text-black text-lg hover:text-indigo-600 transition line-clamp-1" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">by {book.writer}</p>
              </div>
            </div>

            {/* পিডিএফ ওপেন অ্যাকশন বাটন */}
            <div className="px-5 pb-5">
              <button 
                type="button" 
                onClick={() => handleOpenPdfReader(book.pdfFile, book.title)}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md shadow-indigo-600/10" 
                style={{ padding: "10px 20px" }}
              >
                Read Now
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
