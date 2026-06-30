"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";
import EmptyState from "../../../components/shared/EmptyState";
import dynamic from "next/dynamic";
import Link from "next/link"; // 🟢 রিকোয়ারমেন্ট অনুযায়ী বুক ডিটেইলস লিংকের জন্য

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("fable_token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        // ১. 👤 ইউজারের প্রোফাইল ডাটা তুলে আনা 
        const userRes = await axios.get("https://fable-server-z2xt.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = userRes.data;
        setCurrentUser(user);

      if (
  user?.role !== "user" &&
  user?.role !== "admin"
) {
  console.error("Access denied.");
  setLoading(false);
  return;
}

        // ২. 📦 শুধুমাত্র এই ইউজারের কেনা অর্ডারের লাইভ ডাটা নিয়ে আসা (সম্পূর্ণ আলাদা ইউজার এপিআই)
        const orderRes = await axios.get("https://fable-server-z2xt.onrender.com/user/purchases", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const myOrders = orderRes.data || [];

        // ৩. 📚 গ্লোবাল ইবুক কালেকশন থেকে বইয়ের আসল ডাটা তুলে আনা
        const ebookRes = await axios.get("https://fable-server-z2xt.onrender.com/ebooks");
        const allEbooks = ebookRes.data.ebooks || ebookRes.data || [];

        const getId = (id) => typeof id === "object" ? id?.$oid || id?.toString() : id;

        // ডুপ্লিকেট রিমুভার পাইপলাইন
        const uniqueIds = [...new Set(myOrders.map(o => getId(o.ebookId)))].filter(Boolean);

        // ৪. ট্রանজেকশন আইডির সাথে মেইন ইবুকের ডেটা অবজেক্ট নিখুঁতভাবে জয়েন করা
        const finalBooks = uniqueIds.map((bookId, index) => {
          const book = allEbooks.find(b => getId(b._id || b.id) === bookId);

          return {
            id: bookId || `book-${index}`,
            title: book?.title || "Premium Publication",
            author: book?.writerName || book?.writer || "Anonymous Writer",
            cover: book?.coverUrl || "https://via.placeholder.com/300x400",
            pdfFile: book?.pdfUrl || ""
          };
        });

        setPurchases(finalBooks);

      } catch (err) {
        console.error("Error loading purchases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenPdf = (pdfUrl, title) => {
    if (!pdfUrl) return alert("PDF file not available at this moment.");
    let finalUrl = pdfUrl;
    if (finalUrl.startsWith("/uploads")) {
      finalUrl = `https://fable-server-z2xt.onrender.com${finalUrl}`;
    }
    alert(`Opening: ${title}`);
    window.open(finalUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <EmptyState
          title="No Purchases Found"
          subtitle="You haven't purchased any ebooks yet."
        />
      </div>
    );
  }

  const userInitial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">My Purchased Ebooks</h1>
          <p className="text-sm text-gray-500">Access and read all your purchased ebooks</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-indigo-200">
          {userInitial}
        </div>
      </div>

      {/* 🟢 GALLERY VIEW GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {purchases.map((book) => (
          <div key={book.id} className="border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-xl hover:border-indigo-400 transition duration-300 bg-white flex flex-col justify-between group">
            {/* COVER */}
            <div className="h-64 w-full overflow-hidden rounded-xl bg-indigo-50 border shadow-inner">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300x400"; }}
              />
            </div>

            {/* INFO */}
            <div className="mt-4 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-gray-900 text-md line-clamp-1" title={book.title}>
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">by {book.author}</p>
                
                {/* 🟢 রিকোয়ারমেন্ট অনুযায়ী লিংক টু ডিটেইলস */}
                <Link href={`/ebook/${book.id}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-block mt-2 underline">
                  View Book Details →
                </Link>
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={() => handleOpenPdf(book.pdfFile, book.title)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <BookOpen size={14} />
                Read Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PurchasesPage), { ssr: false });
