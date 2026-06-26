"use client";

import { useState } from "react";

export default function EditProfilePage() {
  // পরবর্তীতে এই ইনিশিয়াল ডাটা আপনার Auth Context বা API থেকে আসবে
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@gmail.com",
    photoUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profile);
    alert("Profile Updates Saved Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-black tracking-tight">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-800">
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 font-medium bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 font-medium bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-600">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={profile.photoUrl}
              onChange={handleChange}
              placeholder="Paste image url"
              className="w-full border border-gray-200 p-4 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 font-medium bg-gray-50/50"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition shadow-lg shadow-indigo-600/10"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
