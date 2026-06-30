"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios"; 
import {
  BookOpen,
  DollarSign,
  ShoppingBag,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";
import { style } from "framer-motion/client";

export default function WriterDashboard() {
  const router = useRouter(); 
  const [ebooks, setEbooks] = useState([]); 
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে এই রাইটারের আপলোড করা আসল বইগুলো টেনে আনার ফাংশন
  const fetchWriterEbooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fable_token");
      
      const res = await axios.get("https://fable-server-z2xt.onrender.com/ebooks?t=" + new Date().getTime(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const allBooks = res.data.ebooks || res.data || [];
      
      const mappedBooks = allBooks.map(book => ({
        ...book,
        id: book._id, 
        status: book.status === "available" ? "Published" : "Draft",
        statusColor: book.status === "available" 
          ? "bg-emerald-950/40 text-emerald-400 border-emerald-800" 
          : "bg-purple-950/40 text-purple-400 border-purple-800"
      }));

      setEbooks(mappedBooks);
    } catch (err) {
      console.error("Failed to load writer ebooks from MongoDB Atlas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWriterEbooks();
  }, []);

  // ডাটাবেজ ইন্টারেক্টিভ ডিলিট ইভেন্ট হ্যান্ডলার
  const handleDeleteEbook = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ebook permanently from DB?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("fable_token");
      
      await axios.delete(`https://fable-server-z2xt.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("🎉 Ebook removed from database successfully!");
      fetchWriterEbooks(); 
    } catch (err) {
      console.error("Deletion error:", err);
      alert("Failed to delete ebook from server engine.");
    }
  };

  // 🛠️ স্ট্যাটাস আপডেট রাউট ফিক্স: এপিআই পাথ /ebooks থেকে পরিবর্তন করে /users করা হলো
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("fable_token");
      // যদি বর্তমানে Published থাকে তবে হবে draft, আর draft থাকলে হবে available
      const nextStatus = currentStatus === "Published" ? "draft" : "available";

      // 🟢 এখানে সঠিক পাথ /users/${id} সেট করা হলো যেন ব্যাকএন্ড রাউটে সঠিক ডেটা পৌঁছায়
      await axios.put(`https://fable-server-z2xt.onrender.com/users/${id}`, 
        { status: nextStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`🎉 Ebook status updated to ${nextStatus === 'available' ? 'Published' : 'Draft'}!`);
      fetchWriterEbooks(); // ডাটাবেজ রি-ফেচ করে ইনস্ট্যান্ট স্ট্যাটাস টেক্সট ও কালার পরিবর্তন
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status on server engine.");
    }
  };

  const publishedBooks = ebooks.filter((book) => book.status === "Published").length;
  const totalSales = ebooks.reduce((sum, book) => sum + (book.sales || 0), 0);
  const totalEarnings = ebooks.reduce((sum, book) => sum + ((book.sales || 0) * parseFloat(book.price || 0) * 0.70), 0); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (ebooks.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-indigo-50 text-gray-500">
        <p className="italic">No ebooks published yet by this writer profile.</p>
        <button onClick={() => router.push("/dashboard/add-ebook")} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md">
          + Add New Ebook First
        </button>
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
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800" style={{ padding: "3px"  }}><Clock size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">{publishedBooks}</h3>
            <p className="text-xs text-gray-600">Published Books</p>
          </div>
        </div>

        <div className="bg-white border border-[#5c51bc] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-100 text-red-700" style={{ padding: "3px"  }}><DollarSign size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">${totalEarnings.toFixed(2)}</h3>
            <p className="text-xs text-gray-600">Total Earnings</p>
          </div>
        </div>

        <div className="bg-white border border-[#554bb0] p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-100 text-indigo-800" style={{ padding: "3px"  }}><ShoppingBag size={20} /></div>
          <div>
            <h3 className="text-2xl font-bold ">{totalSales}</h3>
            <p className="text-xs text-gray-600">Total Sales</p>
          </div>
        </div>
      </div>
      <div className="h-2"></div>

      {/* Table */}
      <div className="bg-white border border-[#4235ba] rounded-2xl p-6" style={{ padding: "8px"  }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">My Ebooks</h2>
          <button onClick={() => router.push("/dashboard/add-ebook")} className="bg-red-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition" style={{padding: "2px"}}>
            + Create Ebook
          </button>
        </div>
        
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
                <tr key={ebook.id} className="border-b border-[#221f3b]/30  transition duration-150">
                  <td className="py-4 font-medium text-gray-700 max-w-[250px] truncate" title={ebook.title}>
                    {ebook.title}
                  </td>
                  <td className="py-4">
                    <span
  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase text-white ${
    ebook.status === "Published"
      ? "bg-green-500"
      : "bg-red-500"
  }`}
  style={{ padding: "2px" }}
>
  {ebook.status}
</span>
                  </td>
                  <td className="py-4 font-mono font-bold text-red-500">
                    ${parseFloat(ebook.price || 0).toFixed(2)}
                  </td>
                  <td className="py-4 font-medium">{ebook.sales || 0}</td>
                  <td className="py-4">
                    <div className="flex justify-end gap-4 items-center">
                      <button
                        onClick={() => router.push(`/dashboard/edit-ebook/${ebook.id}`)}
                        className="hover:text-indigo-600 text-gray-500 cursor-pointer transition"
                        title="Edit Ebook"
                      >
                        <Edit2 size={16} />
                      </button>

                    <button
  onClick={() => handleToggleStatus(ebook.id, ebook.status)}
  className={`text-xs font-bold px-2.5 py-1 rounded-lg cursor-pointer transition ${
    ebook.status === "Published"
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-green-500 text-white hover:bg-green-600"
  }` } style={{padding: '2px'}}
>
  {ebook.status === "Published" ? "Unpublish" : "Publish"}
</button>

                      <button
                        onClick={() => handleDeleteEbook(ebook.id)}
                        className="hover:text-red-800 text-red-500 cursor-pointer transition"
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
