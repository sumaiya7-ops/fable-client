"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, Heart } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function EbookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fable-server-z2xt.onrender.com/ebook/${id}`);
        
        if (response.data.book) {
          setBook(response.data.book);
          setRelatedBooks(response.data.relatedBooks || []);
        } else {
          setBook(response.data);
        }
      } catch (err) {
        console.error("Error loading ebook from server:", err);
        setError("Ebook not found or database server is offline.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

 const defaultBookCover =
  "https://i.postimg.cc/1znS3RDG/book-2.jpg";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center text-gray-900 justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-800 bg-white font-semibold">
        <div className="text-center">
          <p className="text-xl">{error || "Ebook not found!"}</p>
        </div>
      </div>
    );
  }
const handleBuyNow = async () => {
  const token = localStorage.getItem("fable_token");

  if (!token) {
    alert("Please login first!");
    window.location.href = "/login";
    return;
  }

  try {
    const res = await axios.post(
      "https://fable-server-z2xt.onrender.com/create-checkout-session",
      {
        ebookId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = res.data.url;
  } catch (err) {
    console.error(err);
    alert("Failed to start payment.");
  }
};

const rating = Number(book.rating) || 4;


const handleBookmark = async () => {
  console.log("Book ID:", id);

  const token = localStorage.getItem("fable_token");

  if (!token) {
    alert("Please login first!");
    window.location.href = "/login";
    return;
  }

  try {
    const res = await axios.post(
      "https://fable-server-z2xt.onrender.com/bookmarks",
      {
        ebookId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", res.data);
    alert("Bookmarked Successfully ❤️");
  } catch (err) {
    console.log(err.response?.data);
    console.log(err.response?.status);
    console.log(err);

    alert("Bookmark Failed");
  }
};
  return (
    <div className="w-10/12 mx-auto py-16" style={{ padding: "8px" }}>

      {/* Top Section */}
      <div className="grid lg:grid-cols-2 gap-10 items-start pb-20">

        {/* Book Cover */}
        <div>
          <img
            src={book.coverUrl || book.image || defaultBookCover}
            alt={book.title}
            className="w-full max-w-md bg-white h-[520px] object-cover rounded-3xl shadow-2xl border border-white/10"
          style={{ padding: "8px" }}
          />
        </div>

        {/* Book Info */}
        <div className="text-gray-800 bg-white" style={{ padding: "8px" }}>
          <span className="bg-indigo-500 text-white  rounded-full text-sm font-medium border border-indigo-500/30" style={{ padding: "3px" }}>
            {book.genre || "Fantasy"}
          </span>

          <h1 className="text-5xl font-bold  mt-5 tracking-tight">
            {book.title}
          </h1>

          <p className="text-gray-700 mt-4 font-medium">
     <Link href={`/writer/${book.writerEmail || "#"}`}>
  By {book.writerName || "Unknown Writer"}
</Link>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-6">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
  <Star
    key={i}
    size={18}
   fill={i < Math.round(rating) ? "currentColor" : "transparent"}
  />
))}
            </div>
            <span className="text-gray-600 text-sm font-medium">
              {book.rating || "4.9"} ({book.reviewsCount || "120"} Reviews)
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-red-500 mt-8">
           ${Number(book.price || 0).toFixed(2)}
          </h2>

          <p className="text-gray-600 mt-6 leading-8 text-base">
            {book.description || "No description provided for this ebook."}
          </p>

          {/* Buttons Actions */}
          <div className="flex flex-wrap gap-4 mt-10">
                       {/* 🛠️ এখানে onClick যুক্ত করে বাটনটি অ্যাক্টিভেট করা হলো */}
       
<button 
  onClick={handleBuyNow}
  disabled={book.status === "sold"}
  className={`px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg cursor-pointer 
  ${book.status === "sold" 
    ? "bg-gray-400 cursor-not-allowed" 
    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30"
  }`}
>
  {book.status === "sold" ? "Already Sold" : "Buy Now"}
</button>

           <button
  onClick={handleBookmark}
  className="border border-indigo-500/40 text-white bg-indigo-500 hover:bg-indigo-600 rounded-2xl flex items-center gap-2 transition-all cursor-pointer"
  style={{ padding: "3px" }}
>
  <Heart size={18} />
  Bookmark
</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="pb-20 text-gray-900" style={{ padding: "8px" }}>
        <h2 className="text-3xl font-bold  mb-8">
          Reviews
        </h2>
        <div className="space-y-5">
          <div className="p-6 rounded-3xl bg-white border border-white/10 backdrop-blur-md shadow-sm" style={{ padding: "8px" }}>
            <h3 className="font-semibold ">Sarah Johnson</h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">Amazing story. Couldn't stop reading.</p>
          </div>
          <div className="h-2"></div>
          <div className="p-6 rounded-3xl bg-white border border-white/10 backdrop-blur-md shadow-sm" style={{ padding: "8px" }}>
            <h3 className="font-semibold ">Michael Smith</h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">One of the best fantasy books I've read.</p>
          </div>
        </div>
      </section>

      {/* Related Books Section */}
      <section className="text-gray-900 bg-white rounded-xl" style={{ padding: "8px" }}>
        <h2 className="text-3xl font-bold  mb-8">
          Related Books
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {relatedBooks.length > 0 ? (
            relatedBooks.map((relBook) => (
              <div key={relBook._id || relBook.id} className="p-4 rounded-3xl bg-white text-gray-700 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/30 transition-all">
                <img
                  src={relBook.coverUrl || relBook.image || defaultBookCover}
                  onError={(e) => {
  e.target.src = defaultBookCover;
}}
                  alt={relBook.title}
                  className="rounded-2xl object-cover aspect-[3/4] w-full shadow-md"
                />
                <h3 className="mt-4 text-gray-700 font-semibold text-sm line-clamp-1">
                  {relBook.title}
                </h3>
                <p className="text-sm mt-2 font-bold text-gray-500">
                   Status: {relBook.status === "sold" ? "Sold" : "Available"}
</p>
<p className="text-xs text-gray-500 mt-1">
 Uploaded: {relBook.createdAt ? new Date(relBook.createdAt).toLocaleDateString() : "N/A"}
 </p>
                <p className="text-red-500 text-sm mt-1 font-bold">
                  ${relBook.price ? relBook.price.toFixed(2) : "0.00"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-sm idalic pl-1">No related books found in this genre.</p>
          )}
        </div>
      </section>
    </div>
  );
}
