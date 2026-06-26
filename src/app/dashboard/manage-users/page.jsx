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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5">
            <Users className="text-indigo-800 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-red-500">{users.length}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Users</p>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5">
            <PenSquare className="text-purple-600 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-red-500">
              {users.filter((u) => u.role === "Writer").length}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Writers</p>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5">
            <User className="text-emerald-600 mb-3" size={24} />
            <h3 className="text-3xl font-bold text-red-500">
              {users.filter((u) => u.role === "Reader").length}
            </h3>
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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-indigo-50 text-gray-700 border border-[#adb2e2] pl-10 pr-4 py-3 rounded-lg  focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-indigo-100 border border-indigo-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Roles</option>
            <option value="Reader">Reader</option>
            <option value="Writer">Writer</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-indigo-200">
          <table className="min-w-[800px] w-full">
            <thead className="bg-indigo-50">
              <tr className="text-left text-gray-600 text-sm">
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
                  className="border-t border-indigo-300 hover:bg-indigo-100 transition"
                >
                  <td className="p-4 font-medium text-gray-700">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <select 
                      defaultValue={user.role}
                      className="bg-indigo-100 border border-indigo-300 rounded-md px-3 py-1 text-xs text-red-500 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Reader">Reader</option>
                      <option value="Writer">Writer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-600">{user.joined}</td>
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
