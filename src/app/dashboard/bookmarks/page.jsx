"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import EmptyState from "../../../components/shared/EmptyState";

// উদাহরণস্বরূপ কিছু বুকমার্ক করা মক ডাটা (পরবর্তীতে এটি ডাটাবেজ থেকে আসবে)
const initialBookmarks = [
  {
    id: 1,
    title: "Thinking, Fast and Slow",
    writer: "Daniel Kahneman",
    price: 4.99,
    genre: "Psychology",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&q=80",
  },
  {
    id: 2,
    title: "The Psychology of Money",
    writer: "Morgan Housel",
    price: 3.99,
    genre: "Finance",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80",
  },
  {
    id: 3,
    title: "Atomic Habits",
    writer: "James Clear",
    price: 2.99,
    genre: "Self Improvement",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
  },
  {
    id: 4,
    title: "Deep Work",
    writer: "Cal Newport",
    price: 5.99,
    genre: "Productivity",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
  },
];

export default function BookmarksPage() {
  // বুকমার্ক ডাটা হ্যান্ডেল করার জন্য স্টেট
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  // বুকমার্ক থেকে কোনো বই রিমুভ (Delete) করার ফাংশন
  const handleRemoveBookmark = (id) => {
    setBookmarks((prev) => prev.filter((book) => book.id !== id));
  };

  // যদি বুকমার্ক একদম খালি হয়ে যায়, তবে এম্পটি স্টেট দেখাবে
  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No Bookmarks Found"
        subtitle="Explore the browse page and add ebooks to read or purchase later."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#ebecf3] p-4 md:p-8 w-full" style={{ padding: "8px"  }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8" style={{ padding: "8px"  }}>
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-950">
            My Bookmarked Ebooks
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Review, purchase, or manage your saved digital books.
          </p>
        </div>

        {/* Gallery Grid View (রিকোয়ারমেন্টের গ্যালারি লেআউট) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarks.map((book) => (
            <div 
              key={book.id} 
              className="bg-white border border-indigo-100 rounded-2xl p-3 flex flex-col justify-between group hover:border-[#633efd]/40 transition duration-300 shadow-sm" style={{ padding: "8px"  }}
            >
              <div>
                {/* কভার ইমেজ এবং রিমুভ বাটন */}
                <div className="relative aspect-[3/4] w-full bg-white rounded-xl overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500" style={{ paddingBottom: "8px"  }}
                  />
                  {/* হার্ট আইকন ক্লিক করলে বুকমার্ক থেকে ডিলিট হবে */}
                  <button 
                    onClick={() => handleRemoveBookmark(book.id)}
                    className="absolute top-2.5 right-2.5 bg-white backdrop-blur-sm p-1.5 rounded-full text-red-500 hover:scale-110 transition" style={{ padding: "8px"  }}
                  >
                    <Heart size={14} className="fill-current" />
                  </button>
                </div>

                {/* বইয়ের ডিটেইলস */}
                <Link href={`/ebook/${book.id}`}>
                  <h4 className="font-bold text-gray-800 text-sm mt-3 line-clamp-1 cursor-pointer hover:text-[#9059ff] transition">
                    {book.title}
                  </h4>
                </Link>
                <p className="text-gray-500 text-[11px] mt-0.5">{book.writer}</p>
                <span className="inline-block mt-2 text-[10px] text-indigo-50 bg-indigo-700 font-semibold px-2 py-0.5 rounded-md" style={{ padding: "2px"  }}>
                  {book.genre}
                </span>
              </div>

              {/* প্রাইস এবং বাই অ্যাকশন বাটন */}
              <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200">
                <span className="text-red-600 font-bold text-sm">${book.price.toFixed(2)}</span>
                <Link 
                  href={`/ebook/${book.id}`}
                  className="text-white bg-indigo-300 hover:bg-[#633efd] hover:text-white p-2 rounded-xl transition border border-[#633efd]/20 flex items-center justify-center"
                >
                  <ShoppingCart size={16} />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
