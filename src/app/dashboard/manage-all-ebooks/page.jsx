"use client";

import { useState } from "react";
import { 
  Search, 
  Eye, 
  Edit2, 
  Trash2, 
  ChevronDown,
  BookOpen,
  CheckCircle,
  FileText,
  TrendingUp 
} from "lucide-react";

// ইমেজের ডেটা অনুযায়ী মক ডেটা
const initialEbooks = [
  {
    id: 1,
    title: "The Silent Watcher",
    author: "James Rollins",
    status: "Published",
    price: "$4.99",
    sales: 452,
  },
  {
    id: 2,
    title: "Beyond the Horizon",
    author: "James Rollins",
    status: "Published",
    price: "$3.49",
    sales: 320,
  },
  {
    id: 3,
    title: "Midnight Whispers",
    author: "Emily Stone",
    status: "Published",
    price: "$2.99",
    sales: 210,
  },
  {
    id: 4,
    title: "Broken Memories",
    author: "Emily Stone",
    status: "Draft",
    price: "-",
    sales: 0,
  },
  {
    id: 5,
    title: "Whispers in the Dark",
    author: "Emily Stone",
    status: "Published",
    price: "$3.99",
    sales: 150,
  },
];
export default function ManageAllEbooks() {
  // ডাইনামিক স্টেট এবং লজিক সেটআপ
  const [ebooks, setEbooks] = useState(initialEbooks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ডিলিট হ্যান্ডলার ফাংশন
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
    if (confirmDelete) {
      setEbooks(ebooks.filter((book) => book.id !== id));
    }
  };

  // সার্চ এবং ফিল্টার লজিক
  const filteredEbooks = ebooks.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || book.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // স্ট্যাটাস কার্ডের জন্য ডাইনামিক ক্যালকুলেশন
  const totalSalesCount = ebooks.reduce((sum, book) => sum + book.sales, 0);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 flex items-center justify-center font-sans">
      
      {/* মেইন কন্টেইনার */}
      <div className="bg-indigo-50 border border-indigo-200 p-5 md:p-8 rounded-xl w-full max-w-6xl shadow-2xl space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold  tracking-wide mb-1">
            Manage Ebooks
          </h1>
          <p className="text-sm text-gray-600">
            View and manage all ebooks.
          </p>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-indigo-100 border border-indigo-400 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <BookOpen className="text-indigo-700" size={24} />
              <span className="text-emerald-600 bg-white text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-700">+12%</span>
            </div>
            <h3 className="text-gray-500 mt-4 text-sm font-medium">Total Ebooks</h3>
            <p className="text-3xl font-bold text-red-500 mt-1">{ebooks.length}</p>
          </div>

          <div className="bg-[#15182e] border border-[#272b4d] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <CheckCircle className="text-emerald-400" size={24} />
              <span className="text-emerald-500 bg-[#162a2b] text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">+15%</span>
            </div>
            <h3 className="text-gray-400 mt-4 text-sm font-medium">Published</h3>
            <p className="text-3xl font-bold text-white mt-1">
              {ebooks.filter((b) => b.status === "Published").length}
            </p>
          </div>

          <div className="bg-[#15182e] border border-[#272b4d] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <FileText className="text-purple-400" size={24} />
              <span className="text-amber-500 bg-[#2b2416] text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-900">Steady</span>
            </div>
            <h3 className="text-gray-400 mt-4 text-sm font-medium">Draft</h3>
            <p className="text-3xl font-bold text-white mt-1">
              {ebooks.filter((b) => b.status === "Draft").length}
            </p>
          </div>

          <div className="bg-[#15182e] border border-[#272b4d] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <TrendingUp className="text-pink-400" size={24} />
              <span className="text-emerald-500 bg-[#162a2b] text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-900">+20%</span>
            </div>
            <h3 className="text-gray-400 mt-4 text-sm font-medium">Total Sales</h3>
            <p className="text-3xl font-bold text-white mt-1">{totalSalesCount}</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search ebooks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#15182e] border border-[#272b4d] text-sm text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#5826df] transition"
            />
          </div>
          
          <div className="relative w-full sm:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-[#15182e] border border-[#272b4d] text-sm text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#5826df] cursor-pointer pr-10"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* টেবিল এরিয়া */}
        <div className="overflow-x-auto rounded-xl border border-[#1e223d]/40">
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs md:text-sm font-medium border-b border-[#1e223d] bg-[#13152a]">
                <th className="p-4 font-normal">Title</th>
                <th className="p-4 font-normal">Author</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal">Price</th>
                <th className="p-4 font-normal">Sales</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#1e223d]/40">
              {filteredEbooks.map((book) => (
                <tr key={book.id} className="text-sm text-gray-300 hover:bg-[#15182e]/30 transition">
                  <td className="p-4 font-medium text-white">{book.title}</td>
                  <td className="p-4 text-gray-400">{book.author}</td>
                  <td className="p-4">
                    {book.status === "Published" ? (
                      <span className="bg-[#122b27] text-[#5eead4] text-xs font-medium px-2.5 py-0.5 rounded border border-[#145346]">
                        Published
                      </span>
                    ) : (
                      <span className="bg-[#2a1b4e] text-[#c0a5f7] text-xs font-medium px-2.5 py-0.5 rounded border border-[#442b80]">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-gray-300">{book.price}</td>
                  <td className="p-4 text-gray-400">{book.sales}</td>
                  
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button className="text-gray-400 hover:text-blue-400 transition" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-indigo-400 transition" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(book.id)}
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
        </div>

        {/* এম্পটি স্টেট */}
        {filteredEbooks.length === 0 && (
          <div className="text-center py-12 border border-t-0 border-[#1e223d]/40 rounded-b-xl">
            <p className="text-gray-500 text-sm">No ebooks found matching your criteria.</p>
          </div>
        )}

        {/* পেজিনেশন */}
        <div className="flex justify-center items-center gap-2">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#5826df] text-white text-xs font-semibold">
            1
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#15182e] text-xs transition">
            2
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#15182e] text-xs transition">
            3
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#15182e] text-xs transition">
            &gt;
          </button>
        </div>

      </div>
    </div>
  );
}
