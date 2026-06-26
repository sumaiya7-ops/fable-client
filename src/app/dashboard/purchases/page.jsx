"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import EmptyState from "../../../components/shared/EmptyState";
import Link from "next/link";

// ডার্ক থিমে টেস্ট করার জন্য মক পারচেজ ডেটা সেটআপ
const initialPurchases = [
  {
    id: 1,
    title: "The Silent Watcher",
    author: "James Rollins",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
  },
  {
    id: 2,
    title: "Beyond the Horizon",
    author: "James Rollins",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
  },
  {
    id: 3,
    title: "Midnight Whispers",
    author: "Emily Stone",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80",
  },
];

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState(initialPurchases);

  if (purchases.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0b0c16]" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
        <EmptyState
          title="No Purchases Yet"
          subtitle="You haven't purchased any ebooks."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8 space-y-6 font-sans" style={{ padding: "8px"  }}>
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-950 tracking-wide">
          My Purchases
        </h1>
        <p className="text-gray-700 mt-1 text-sm">
          Access and read all your purchased ebooks.
        </p>
      </div>
      <div className="h-1"></div>

      {/* Responsive Ebook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{ padding: "8px"  }}>
        {purchases.map((book) => (
          <div
            key={book.id}
            className="bg-indigo-50 border border-[#4457d5] rounded-2xl p-4 shadow-2xl hover:border-[#3b3370] transition flex flex-col justify-between group"
          >
           
            <div className="relative overflow-hidden rounded-xl bg-[#15182e] h-64 w-full">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="mt-4 flex-grow flex flex-col justify-between">
              <div>
                {/* 🟢 টাইটেল লিঙ্কিং (বানান ফিক্সড করে /ebooks/ করা হলো) */}
                <Link href={`/ebooks/${book.id}`}>
                  <h2 className="font-semibold  text-lg line-clamp-1 group-hover:text-indigo-700 transition cursor-pointer">
                    {book.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm mt-0.5">
                  by {book.author}
                </p>
              </div>

              {/* 🟢 Read Now বাটন লিঙ্কিং (বানান ফিক্সড করে /ebooks/ করা হলো) */}
              <Link 
                href={`/ebooks/${book.id}`}
                className="mt-5 w-full bg-[#5826df] hover:bg-[#471cb8] text-white py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-950/20 text-center"
              >
                <BookOpen size={16} />
                Read Now
              </Link>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}