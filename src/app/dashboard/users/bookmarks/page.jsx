"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Bookmark } from "lucide-react";
import EmptyState from "../../../../components/shared/EmptyState"
import dynamic from "next/dynamic";
import Link from "next/link";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookmarks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("fable_token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        // 🟢 আপনার এক্সপ্রেস ব্যাকএন্ডের বুকমার্ক এপিআই এন্ডপয়েন্টে হিট
        const res = await axios.get(
  "https://fable-server-z2xt.onrender.com/bookmarks",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        // ব্যাকএন্ড থেকে আসা বুকমার্কড করা বইয়ের তালিকা
       console.log("Bookmarks Response:", res.data);
setBookmarks(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookmarked ebooks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <EmptyState
          title="No Bookmarks Found"
          subtitle="You haven't bookmarked any ebooks yet."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Bookmark className="w-7 h-7 text-indigo-600 fill-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold">My Bookmarked Ebooks</h1>
          <p className="text-sm text-gray-500">Your favorite saved ebooks gallery</p>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {bookmarks.map((item) => {
          // ব্যাকএন্ড ডাটা স্ট্রাকচার অনুযায়ী মেইন ইবুক অবজেক্ট এক্সট্র্যাক্ট করা
          const book = item.bookDetails || item.ebook || item;
          const bookId = book._id?.$oid || book._id || book.id;

          return (
            <div key={item._id?.$oid || item._id} className="border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-xl hover:border-indigo-400 transition duration-300 bg-white flex flex-col justify-between group">
              {/* COVER */}
              <div className="h-64 w-full overflow-hidden rounded-xl bg-indigo-50 border shadow-inner">
                <img
                  src={book.coverUrl || "https://ibb.co"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  onError={(e) => { e.target.src = "https://ibb.co"; }}
                />
              </div>

              {/* INFO */}
              <div className="mt-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-md line-clamp-1" title={book.title}>
                    {book.title || "Premium Publication"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">by {book.writerName || "Anonymous Writer"}</p>
                  
                  {/* 🟢 রিকোয়ারমেন্ট অনুযায়ী লিংক টু ডিটেইলস */}
                  <Link href={`/ebook/${bookId}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-block mt-2 underline">
                    View Book Details →
                  </Link>
                </div>

                {/* BUTTON */}
                <Link
                  href={`/ebook/${bookId}`}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  Read Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(BookmarkPage), { ssr: false });
