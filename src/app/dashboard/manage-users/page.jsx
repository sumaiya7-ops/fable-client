"use client";

import { useEffect, useState } from "react";
import axios from "axios"; 
import {
  Users,
  Search,
  Edit2,
  Trash2,
  PenSquare,
  User,
} from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // ডাটাবেজ থেকে সব রেজিস্ট্রেড ইউজারের আসল তালিকা টেনে আনার ফাংশন
  const fetchAllUsersFromDB = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fable_token"); 
      
      const res = await axios.get("https://fable-server-z2xt.onrender.com/users-list?t=" + new Date().getTime(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const allUsers = res.data.users || res.data || [];
      
      const mappedUsers = allUsers.map(u => {
        let dbRole = u.role || "Reader";
        if (dbRole.toLowerCase() === "writer") dbRole = "Writer";
        if (dbRole.toLowerCase() === "reader") dbRole = "Reader";
        if (dbRole.toLowerCase() === "admin") dbRole = "Admin";

        return {
          id: u._id ? u._id.toString() : u.id,
          name: u.name || "Anonymous User",
          email: u.email || "N/A",
          role: dbRole,
          joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "May 12, 2024"
        };
      });

      setUsers(mappedUsers);
    } catch (err) {
      console.error("Failed to load user records from MongoDB Atlas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsersFromDB();
  }, []);

  // ডাটাবেজ ইন্টারেক্টিভ ইউজার ডিলিট হ্যান্ডলার
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user permanently from DB?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("fable_token");
      
      await axios.delete(`https://fable-server-z2xt.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("🎉 User successfully deleted from database archive!");
      fetchAllUsersFromDB(); 
    } catch (err) {
      console.error("User deletion error:", err);
      alert("Failed to execute account removal from server engine.");
    }
  };

  // কেস-ইনসেনসিটিভ ফিল্টারিং লজিক
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const userRole = (user.role || "").toLowerCase();
    const currentFilter = roleFilter.toLowerCase();
    
    const matchRole = currentFilter === "all" || userRole === currentFilter;

    return matchSearch && matchRole;
  });

  // ডাইনামিক কাউন্টার ভ্যারিয়েবল ডিক্লেয়ারেশন
  const totalWriters = users.filter((u) => (u.role || "").toLowerCase() === "writer").length;
  const totalReaders = users.filter((u) => (u.role || "").toLowerCase() === "reader").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#94a3b8] p-4 md:p-8" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      <div className="max-w-7xl mx-auto bg-indigo-50 border border-indigo-400 rounded-xl p-5 md:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Users
          </h1>
          <p className="text-gray-700">
            View, manage and monitor all registered users.
          </p>
        </div>

        {/* Stats — ডাটাবেজ কাউন্টার ডাইনামিক প্যানেল */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5">
            <Users className="text-indigo-800 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-red-500">{users.length}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Users</p>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5">
            <PenSquare className="text-purple-600 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-red-500">{totalWriters}</h3>
            <p className="text-sm text-gray-600 mt-1">Writers</p>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5">
            <User className="text-emerald-600 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-red-500">{totalReaders}</h3>
            <p className="text-sm text-gray-600 mt-1">Readers</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative w-full text-gray-800 md:w-80">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearchQuery ? setSearch(e.target.value) : setSearch(e.target.value)}
              className="w-full bg-indigo-50 text-gray-700 border border-[#adb2e2] pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* 🛠️ ফিক্সড কোড: setSortFilter টাইপোটি সম্পূর্ণ রিমুভ করে সঠিক রিয়্যাক্ট স্টেট সেট করা হলো */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-indigo-100 border border-indigo-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="Reader">Reader</option>
            <option value="Writer">Writer</option>
          </select>
        </div>

        {/* Table — MongoDB লাইভ ডেটা কালেকশন রেন্ডারার */}
        <div className="overflow-x-auto rounded-xl border border-indigo-200 bg-white">
          <table className="min-w-[800px] w-full">
            <thead className="bg-indigo-50">
              <tr className="text-left text-gray-600 text-sm border-b border-indigo-200">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-indigo-200 hover:bg-indigo-100/40 transition duration-150"
                >
                  <td className="p-4 font-medium text-gray-700">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  
                  {/* 🛠️ আপনার ওরিজিনাল প্রফেশনাল কালার লকড ব্যাজ — ৩টি রোলের কাস্টম কালার থিম সহ */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase ${
                      user.role === "Admin"
                        ? "bg-red-100 text-red-600 border border-red-200"
                        : user.role === "Writer"
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">{user.joined}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => alert(`Reviewing metadata for profile archive: ${user.name}`)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer transition"
                        title="Edit User"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer transition"
                        title="Delete User"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16 bg-white border border-t-0 border-indigo-200 rounded-b-xl">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-400">
              Try changing your search or filter.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
