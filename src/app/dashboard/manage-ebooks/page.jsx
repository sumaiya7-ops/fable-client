"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // 🛠️ MongoDB ডাটাবেজ এবং লাইভ পারচেজ ডাটা সিঙ্কের জন্য এক্সিওস ইমপোর্ট করা হলো
import { ChevronDown, Edit2, Trash2, BookOpen, CheckCircle, FileText } from "lucide-react";
import EmptyState from "../../../components/shared/EmptyState";

export default function ManageEbooksPage() {
  // 🛠️ রিকোয়ারমেন্ট অনূযায়ী ইনিশিয়াল স্টেট ফাঁকা অ্যারে, কোনো ডামি মক ডেটা নেই
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ⚙️ ১. ডাটাবেজ থেকে সব রাইটারের আপলোড করা আসল বইগুলো টেনে আনার কোর ফাংশন
  const fetchAllEbooksFromDB = async () => {
    try {
      setLoading(true);
      // ক্যাশ লক ভাঙতে টাইমস্ট্যাম্প প্যারামস সিঙ্ক
      const res = await axios.get("https://fable-server-z2xt.onrender.com/ebooks?t=" + new Date().getTime());
      
      const extractedBooks = res.data.ebooks || (Array.isArray(res.data) ? res.data : []);
      
      // ডাটাবেজের স্ট্যাটাস ফিল্ড (available/draft) ফ্রন্টঅ্যান্ডের সাথে ডাইনামিক ম্যাপিং
      const mappedBooks = extractedBooks.map((book) => ({
        ...book,
        id: book._id ? book._id.toString() : book.id,
        status: book.status === "available" ? "Published" : "Draft"
      }));

      setEbooks(mappedBooks);
    } catch (err) {
      console.error("Failed to stream library ebooks from MongoDB:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEbooksFromDB();
  }, []);

  // ⚙️ ২. ডাটাবেজ ইন্টারেক্টিভ ডিলিট ইভেন্ট হ্যান্ডলার (Simulated Notification সহ)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ebook permanently from Database?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("fable_token");
      
      // আপনার তৈরি করা এক্সপ্রেস ব্যাকএন্ড ডিলিট রাউটে (`DELETE /users/:id`) হিট করা হলো
      await axios.delete(`https://fable-server-z2xt.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("🎉 Ebook permanently erased from MongoDB Atlas Registry!");
      fetchAllEbooksFromDB(); // ডাটাবেজ রি-ফেচ করে কাউন্টার ও টেবিল ইনস্ট্যান্ট আপডেট
    } catch (err) {
      console.error("Deletion API failed:", err);
      alert("Failed to delete ebook from server gateway.");
    }
  };

  // সার্চ ও ফিল্টার ফিল্টারিং লজিক
  const filteredEbooks = ebooks.filter((ebook) => {
    const matchSearch = ebook.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || ebook.status === filter;
    return matchSearch && matchFilter;
  });

  const publishedCount = ebooks.filter((book) => book.status === "Published").length;
  const draftCount = ebooks.filter((book) => book.status === "Draft").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (ebooks.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <EmptyState
          title="No Ebooks Found"
          subtitle="Start publishing your first ebook."
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 space-y-8 font-sans w-full" style={{padding: "8px"}}>
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-wide">
          Manage Ebooks
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Monitor, search and filter your library database.
        </p>
      </div>
      
      <div className="h-1"></div>

      {/* Stats Cards Section — ডাটাবেজ লাইভ কাউন্টার প্যানেল */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Ebooks */}
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-2xl" style={{padding: "4px"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Total Ebooks</h3>
            <BookOpen size={20} className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-red-600 tracking-wide">
            {ebooks.length}
          </p>
        </div>

        {/* Published */}
        <div className="bg-indigo-50 border border-indigo-300 p-6 rounded-xl shadow-2xl" style={{padding: "4px"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Published</h3>
            <CheckCircle size={20} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-red-600 tracking-wide">
            {publishedCount}
          </p>
        </div>

        {/* Draft */}
        <div className="bg-indigo-50 border border-indigo-400 p-6 rounded-xl shadow-2xl" style={{padding: "4px"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Draft</h3>
            <FileText size={20} className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-red-500 tracking-wide">
            {draftCount}
          </p>
        </div>
      </div>
      <div style={{paddingTop: "8px" }}></div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search ebook..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-indigo-100 text-gray-700 border border-indigo-400 text-sm pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#5826df] transition placeholder:text-gray-400"
          style={{padding: "3px"}}
          />
        </div>

        <div className="relative w-full sm:w-44" >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-indigo-100 border border-indigo-300 text-sm text-gray-700 px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#5826df] cursor-pointer pr-10"
         style={{padding: "3px"}}
         >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>
      </div>
      <div className="h-2"></div>

      {/* Table Container — MongoDB লাইভ ডেটা কালেকশন রেন্ডারার */}
      <div className="bg-indigo-100 border border-indigo-300 rounded-2xl p-5 md:p-6 shadow-2xl overflow-x-auto" style={{padding: "8px"}}>
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="text-gray-700 text-md font-medium border-b border-indigo-300">
              <th className="pb-4 font-normal">Title</th>
              <th className="pb-4 font-normal">Price</th>
              <th className="pb-4 font-normal">Status</th>
              <th className="pb-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500">
            {filteredEbooks.map((ebook) => {
              const bookPrice = ebook.price && !isNaN(ebook.price) ? `$${parseFloat(ebook.price).toFixed(2)}` : (ebook.price || "-");
              
              return (
                <tr key={ebook.id} className="text-sm text-gray-500 hover:bg-indigo-200 transition">
                  <td className="py-4 font-medium text-gray-600 max-w-[300px] truncate" title={ebook.title}>{ebook.title}</td>
                  <td className="py-4 font-mono text-red-500 font-bold">{bookPrice}</td>
                  <td className="py-4">
                    {ebook.status === "Published" ? (
                      <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-[#3d8072]">
                        Published
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-red-700">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button type="button" className="text-gray-600 hover:text-indigo-700 cursor-pointer transition" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDelete(ebook.id)}
                        className="text-[#fa2828] bg-white border border-white p-1.5 rounded cursor-pointer hover:bg-red-50 transition shadow-sm" 
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* সার্চ রেজাল্ট না থাকলে এম্পটি স্টেট */}
        {filteredEbooks.length === 0 && (
          <div className="py-12 text-center bg-white rounded-xl border border-indigo-200 mt-2">
            <p className="text-gray-400 text-sm italic">No matching ebooks found inside database archive.</p>
          </div>
        )}
      </div>

    </div>
  );
}
