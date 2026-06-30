"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // 🛠️ ব্যাকএন্ড কানেকশনের জন্য এক্সিওস ইমপোর্ট করা হলো

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  
  // 🛠️ ডামি ডাটার পরিবর্তে ইনিশিয়াল স্টেট সম্পূর্ণ ফাঁকা রাখা হলো
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photoUrl: ""
  });

  // ১. পেজ লোড হবামাত্রই ডাটাবেজ থেকে রিয়েল লগইনড ইউজারের কারেন্ট ইনফো নিয়ে আসা
  useEffect(() => {
    const fetchCurrentProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("fable_token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await axios.get("https://fable-server-z2xt.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // ডাটাবেজে থাকা রিয়েল ডেটা ইনপুট ফোর্সে সেট করা হচ্ছে
        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          photoUrl: res.data.avatar || "" // আপনার ডাটাবেজের ছবির ফিল্ড
        });
      } catch (err) {
        console.error("Failed to fetch initial profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ২. 🛠️ ফর্ম সাবমিট দিলে ডাটাবেজে PUT রিকোয়েস্টের মাধ্যমে ডেটা লক করার হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("fable_token");
      
      const res = await axios.put(
        "https://fable-server-z2xt.onrender.com/users/edit-profile", 
        { name: profile.name, photoUrl: profile.photoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("🎉 " + res.data.message);
        // প্রোফাইল সেভ হওয়ার পর সরাসরি মেইন প্রোফাইল পেজে রিডাইরেক্ট করবে
        window.location.href = "/profile"; 
      }
    } catch (err) {
      console.error("Failed to save profile changes:", err);
      alert(err.response?.data?.message || "Server engine error while saving updates!");
    }
  };

  // লোডিং স্পিনার গাইডলাইন
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50/10">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto" style={{ paddingLeft: "8px" , paddingRight:"8px", paddingTop: "40px" }}>
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
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled // 🔒 সিকিউরিটি প্রোটেকশন: ইমেইল যেহেতু ইউনিক চাবি, তাই এটি এডিট করা লক রাখা হলো
              className="w-full border border-gray-200 p-4 rounded-xl text-gray-400 font-medium bg-gray-100 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-600">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={profile.photoUrl}
              onChange={handleChange}
              placeholder="Paste image url (e.g. ImgBB link)"
              className="w-full border border-gray-200 p-4 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 font-medium bg-gray-50/50"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition shadow-lg shadow-indigo-600/10 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
