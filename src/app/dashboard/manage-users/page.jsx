"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Edit2,
  Trash2,
  PenSquare,
  User,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "Reader",
    joined: "May 10, 2024",
  },
  {
    id: 2,
    name: "Emily Stone",
    email: "emily.stone@gmail.com",
    role: "Writer",
    joined: "May 11, 2024",
  },
  {
    id: 3,
    name: "Alex Mercer",
    email: "alex.mercer@gmail.com",
    role: "Writer",
    joined: "May 11, 2024",
  },
  {
    id: 4,
    name: "Sophia Bailey",
    email: "sophia.bailey@gmail.com",
    role: "Reader",
    joined: "May 12, 2024",
  },
  {
    id: 5,
    name: "Daniel Lewis",
    email: "daniel.lewis@gmail.com",
    role: "Reader",
    joined: "May 12, 2024",
  },
];

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "All" || user.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen bg-[#0b0c16] text-[#94a3b8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-[#0f1123] border border-[#1e223d] rounded-2xl p-5 md:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Manage Users
          </h1>
          <p className="text-gray-400">
            View, manage and monitor all registered users.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#15182e] border border-[#272b4d] rounded-xl p-5">
            <Users className="text-indigo-400 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-white">{users.length}</h3>
            <p className="text-sm text-gray-400 mt-1">Total Users</p>
          </div>

          <div className="bg-[#15182e] border border-[#272b4d] rounded-xl p-5">
            <PenSquare className="text-purple-400 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-white">
              {users.filter((u) => u.role === "Writer").length}
            </h3>
            <p className="text-sm text-gray-400 mt-1">Writers</p>
          </div>

          <div className="bg-[#15182e] border border-[#272b4d] rounded-xl p-5">
            <User className="text-emerald-400 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-white">
              {users.filter((u) => u.role === "Reader").length}
            </h3>
            <p className="text-sm text-gray-400 mt-1">Readers</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#15182e] border border-[#272b4d] pl-10 pr-4 py-3 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#15182e] border border-[#272b4d] px-4 py-3 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Roles</option>
            <option value="Reader">Reader</option>
            <option value="Writer">Writer</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-[#1e223d]">
          <table className="min-w-[800px] w-full">
            <thead className="bg-[#15182e]">
              <tr className="text-left text-gray-400 text-sm">
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
                  className="border-t border-[#1e223d] hover:bg-[#15182e]/30 transition"
                >
                  <td className="p-4 font-medium text-white">{user.name}</td>
                  <td className="p-4 text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <select 
                      defaultValue={user.role}
                      className="bg-[#15182e] border border-[#272b4d] rounded-md px-3 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Reader">Reader</option>
                      <option value="Writer">Writer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-400">{user.joined}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        className="text-blue-400 hover:text-blue-300 transition"
                        title="Edit User"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 transition"
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
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Users Found
            </h3>
            <p className="text-gray-400">
              Try changing your search or filter.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="w-9 h-9 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
            1
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#15182e] text-gray-400 hover:text-white transition">
            2
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#15182e] text-gray-400 hover:text-white transition">
            3
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#15182e] text-gray-400 hover:text-white transition">
            →
          </button>
        </div>

      </div>
    </div>
  );
}
