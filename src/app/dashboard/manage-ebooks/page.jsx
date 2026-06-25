"use client";

import { useState } from "react";
import { Search, ChevronDown, Edit2, Trash2, BookOpen, CheckCircle, FileText } from "lucide-react";
import EmptyState from "../../../components/shared/EmptyState";

// রিয়েল ডার্ক থিমে টেস্ট করার জন্য মক ডেটা
const initialEbooks = [
  {
    id: 1,
    title: "Silent Watcher",
    price: "$4.99",
    status: "Published",
  },
  {
    id: 2,
    title: "Echoes",
    price: "$3.99",
    status: "Draft",
  },
];
export default function ManageEbooksPage() {
  const [ebooks, setEbooks] = useState(initialEbooks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ডিলিট হ্যান্ডলার লজিক
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
    if (confirmDelete) {
      setEbooks(ebooks.filter((ebook) => ebook.id !== id));
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

  // টোটাল ইউজার ডেটা যদি ০ হয়ে যায় তার জন্য এম্পটি স্টেট
  if (ebooks.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0b0c16]">
        <EmptyState
          title="No Ebooks Found"
          subtitle="Start publishing your first ebook."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c16] text-[#94a3b8] p-4 md:p-8 space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Manage Ebooks
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Monitor, search and filter your library database.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Ebooks */}
        <div className="bg-[#0f1123] border border-[#1e223d] p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Ebooks</h3>
            <BookOpen size={20} className="text-indigo-400" />
          </div>
          <p className="text-3xl font-bold text-white tracking-wide">
            {ebooks.length}
          </p>
        </div>

        {/* Published */}
        <div className="bg-[#0f1123] border border-[#1e223d] p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Published</h3>
            <CheckCircle size={20} className="text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-white tracking-wide">
            {publishedCount}
          </p>
        </div>

        {/* Draft */}
        <div className="bg-[#0f1123] border border-[#1e223d] p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Draft</h3>
            <FileText size={20} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white tracking-wide">
            {draftCount}
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search ebook..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#15182e] border border-[#272b4d] text-sm text-white pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#5826df] transition"
          />
        </div>

        <div className="relative w-full sm:w-44">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-[#15182e] border border-[#272b4d] text-sm text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#5826df] cursor-pointer pr-10"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#0f1123] border border-[#1e223d] rounded-2xl p-5 md:p-6 shadow-2xl overflow-x-auto">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm font-medium border-b border-[#1e223d]">
              <th className="pb-4 font-normal">Title</th>
              <th className="pb-4 font-normal">Price</th>
              <th className="pb-4 font-normal">Status</th>
              <th className="pb-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e223d]/40">
            {filteredEbooks.map((ebook) => (
              <tr key={ebook.id} className="text-sm text-gray-300 hover:bg-[#15182e]/30 transition">
                <td className="py-4 font-medium text-white">{ebook.title}</td>
                <td className="py-4 font-mono text-gray-400">{ebook.price}</td>
                <td className="py-4">
                  {ebook.status === "Published" ? (
                    <span className="bg-[#122b27] text-[#5eead4] text-xs font-semibold px-2.5 py-0.5 rounded border border-[#145346]">
                      Published
                    </span>
                  ) : (
                    <span className="bg-[#2a1b4e] text-[#c0a5f7] text-xs font-semibold px-2.5 py-0.5 rounded border border-[#442b80]">
                      Draft
                    </span>
                  )}
                </td>
                <td className="py-4 text-right">
                  <div className="inline-flex items-center gap-3">
                    {/* এডিট বাটন */}
                    <button className="text-gray-400 hover:text-indigo-400 transition" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    {/* ডিলিট বাটন */}
                    <button 
                      onClick={() => handleDelete(ebook.id)}
                      className="text-[#ef4444] bg-[#36161c] border border-[#6b1e28] p-1.5 rounded hover:bg-[#4c1c24] transition" 
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* সার্চ রেজাল্ট না থাকলে এম্পটি স্টেট */}
        {filteredEbooks.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">No matching ebooks found.</p>
          </div>
        )}
      </div>

    </div>
  );
}
