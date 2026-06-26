"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 🟢 useRouter ইমপোর্ট করা হলো
import {
  BookOpen,
  DollarSign,
  ShoppingBag,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";

export default function WriterDashboard() {
  const router = useRouter(); // 🟢 নেভিগেশনের জন্য রাউটার ডিক্লেয়ারেশন
  const [ebooks, setEbooks] = useState([
    {
      id: 1,
      title: "Thinking, Fast and Slow",
      status: "Published",
      statusColor: "bg-emerald-950/40 text-emerald-400 border-emerald-800",
      price: "$4.99",
      sales: 412,
    },
    {
      id: 2,
      title: "Sapiens: A Brief History of Humankind",
      status: "Published",
      statusColor: "bg-emerald-950/40 text-emerald-400 border-emerald-800",
      price: "$3.49",
      sales: 310,
    },
    {
      id: 3,
      title: "Atomic Habits",
      status: "Draft",
      statusColor: "bg-purple-950/40 text-purple-400 border-purple-800",
      price: "-",
      sales: 0,
    },
  ]);

  const handleDeleteEbook = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
    if (confirmDelete) {
      setEbooks(ebooks.filter((ebook) => ebook.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setEbooks(
      ebooks.map((book) => {
        if (book.id !== id) return book;
        const isPublished = book.status === "Published";
        return {
          ...book,
          status: isPublished ? "Unpublished" : "Published",
          statusColor: isPublished
            ? "bg-red-600 text-white border-red-800"
            : "bg-green-800 text-white border-green-800",
        };
      })
    );
  };

  const publishedBooks = ebooks.filter((book) => book.status === "Published").length;
  const totalSales = ebooks.reduce((sum, book) => sum + book.sales, 0);

  if (ebooks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b0813]">
        No ebooks found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900 p-6 md:p-8" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      {/* Header */}
      <div className="mb-8" style={{ padding: "8px"  }}>
        <h1 className="text-xl md:text-2xl font-bold ">Writer Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Manage all your ebooks from one place.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#6a5ddf] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-200 text-purple-700" style={{ padding: "3px"  }}><BookOpen size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">{ebooks.length}</h3>
            <p className="text-xs text-gray-600">Total Ebooks</p>
          </div>
        </div>

        <div className="bg-white border border-[#6256ce] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-600 text-emerald-800" style={{ padding: "3px"  }}><Clock size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">{publishedBooks}</h3>
            <p className="text-xs text-gray-600">Published Books</p>
          </div>
        </div>

        <div className="bg-white border border-[#5c51bc] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-400 text-red-700" style={{ padding: "3px"  }}><DollarSign size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">$245.60</h3>
            <p className="text-xs text-gray-600">Total Earnings</p>
          </div>
        </div>

        <div className="bg-white border border-[#554bb0] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-400 text-indigo-800" style={{ padding: "3px"  }}><ShoppingBag size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">{totalSales}</h3>
            <p className="text-xs text-gray-600">Total Sales</p>
          </div>
        </div>
      </div>
      <div className="h-2"></div>

      {/* Table */}
      <div className="bg-white border border-[#4235ba] rounded-2xl p-6" style={{ padding: "8px"  }}>
        <h2 className="text-lg font-semibold  mb-6">My Ebooks</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#4b4777] text-left text-gray-900 text-sm">
                <th className="pb-3">Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Sales</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((ebook) => (
                <tr key={ebook.id} className="border-b border-[#221f3b]/30">
                  <td className="py-4 font-medium text-gray-700">{ebook.title}</td>
                  <td className="py-4" >
                    <span className={`px-3 py-1 rounded-full border text-xs ${ebook.statusColor}`} >
                      {ebook.status}
                    </span>
                  </td>
                  <td className="py-4 text-red-500">{ebook.price}</td>
                  <td className="py-4">{ebook.sales}</td>
                  <td className="py-4">
                    <div className="flex justify-end gap-4">
                      {/* 🟢 প্রম্পট বাদ দিয়ে রিয়াল ডাইনামিক পেজে রিডাইরেকশন লিংক সেট করা হলো */}
                      <button
                        onClick={() => router.push(`/dashboard/edit-ebook/${ebook.id}`)}
                        className="hover:text-indigo-400"
                        title="Edit Ebook"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(ebook.id)}
                        className="text-xs text-indigo-400 hover:text-indigo-300"
                      >
                        {ebook.status === "Published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => handleDeleteEbook(ebook.id)}
                        className="hover:text-red-600"
                        title="Delete Ebook"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
