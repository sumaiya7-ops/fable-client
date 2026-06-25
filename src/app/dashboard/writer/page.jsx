"use client";

import { useState } from "react";
import {
  BookOpen,
  DollarSign,
  ShoppingBag,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";

export default function WriterDashboard() {
  const [ebooks, setEbooks] = useState([
    {
      id: 1,
      title: "Midnight Whispers",
      status: "Published",
      statusColor:
        "bg-emerald-950/40 text-emerald-400 border-emerald-800",
      price: "$3.99",
      sales: 412,
    },
    {
      id: 2,
      title: "Echoes of Tomorrow",
      status: "Published",
      statusColor:
        "bg-emerald-950/40 text-emerald-400 border-emerald-800",
      price: "$5.40",
      sales: 310,
    },
    {
      id: 3,
      title: "Broken Memories",
      status: "Draft",
      statusColor:
        "bg-purple-950/40 text-purple-400 border-purple-800",
      price: "-",
      sales: 0,
    },
    {
      id: 4,
      title: "Whispers in the Dark",
      status: "Published",
      statusColor:
        "bg-emerald-950/40 text-emerald-400 border-emerald-800",
      price: "$1.99",
      sales: 210,
    },
  ]);

  const handleDeleteEbook = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ebook?"
    );

    if (confirmDelete) {
      setEbooks(ebooks.filter((ebook) => ebook.id !== id));
    }
  };

  const handleEditEbook = (id) => {
    const ebook = ebooks.find((book) => book.id === id);

    const newTitle = prompt(
      "Edit Ebook Title",
      ebook.title
    );

    if (!newTitle) return;

    setEbooks(
      ebooks.map((book) =>
        book.id === id
          ? {
              ...book,
              title: newTitle,
            }
          : book
      )
    );
  };

  const handleToggleStatus = (id) => {
    setEbooks(
      ebooks.map((book) => {
        if (book.id !== id) return book;

        const isPublished =
          book.status === "Published";

        return {
          ...book,
          status: isPublished
            ? "Unpublished"
            : "Published",
          statusColor: isPublished
            ? "bg-amber-950/40 text-amber-400 border-amber-800"
            : "bg-emerald-950/40 text-emerald-400 border-emerald-800",
        };
      })
    );
  };

  const publishedBooks = ebooks.filter(
    (book) => book.status === "Published"
  ).length;

  const totalSales = ebooks.reduce(
    (sum, book) => sum + book.sales,
    0
  );

  if (ebooks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No ebooks found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0813] text-gray-200 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Writer Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage all your ebooks from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-[#131126] border border-[#221f3b] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-950/50 text-purple-400">
            <BookOpen size={20} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              {ebooks.length}
            </h3>
            <p className="text-xs text-gray-400">
              Total Ebooks
            </p>
          </div>
        </div>

        <div className="bg-[#131126] border border-[#221f3b] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-950/50 text-emerald-400">
            <Clock size={20} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              {publishedBooks}
            </h3>
            <p className="text-xs text-gray-400">
              Published Books
            </p>
          </div>
        </div>

        <div className="bg-[#131126] border border-[#221f3b] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-950/50 text-blue-400">
            <DollarSign size={20} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              $245.60
            </h3>
            <p className="text-xs text-gray-400">
              Total Earnings
            </p>
          </div>
        </div>

        <div className="bg-[#131126] border border-[#221f3b] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-950/50 text-indigo-400">
            <ShoppingBag size={20} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              {totalSales}
            </h3>
            <p className="text-xs text-gray-400">
              Total Sales
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#131126] border border-[#221f3b] rounded-2xl p-6">

        <h2 className="text-lg font-semibold text-white mb-6">
          My Ebooks
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-[#221f3b] text-left text-gray-400 text-sm">
                <th className="pb-3">Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Sales</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {ebooks.map((ebook) => (
                <tr
                  key={ebook.id}
                  className="border-b border-[#221f3b]/50"
                >
                  <td className="py-4 font-medium text-white">
                    {ebook.title}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs ${ebook.statusColor}`}
                    >
                      {ebook.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {ebook.price}
                  </td>

                  <td className="py-4">
                    {ebook.sales}
                  </td>

                  <td className="py-4">
                    <div className="flex justify-end gap-4">

                      <button
                        onClick={() =>
                          handleEditEbook(
                            ebook.id
                          )
                        }
                        className="hover:text-indigo-400"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleToggleStatus(
                            ebook.id
                          )
                        }
                        className="text-xs text-indigo-400 hover:text-indigo-300"
                      >
                        {ebook.status ===
                        "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteEbook(
                            ebook.id
                          )
                        }
                        className="hover:text-red-400"
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