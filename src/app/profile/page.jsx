"use client";

import { useEffect, useState } from "react";
import { Edit2, Check } from 'lucide-react';
import axios from "axios";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🛠️ ইনিশিয়াল স্টেট সম্পূর্ণ খালি রাখা হলো যাতে ডাটাবেজের রিয়েল ডাটা লোড হতে পারে
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    memberSince: "June 2026",
    bio: "Welcome to my Fable Profile page.",
    location: "Not Specified",
    website: "https://fable.com",
    avatar: "", // শুরুতে ছবি ফাঁকা থাকবে
  });

  const [formData, setFormData] = useState(user);

  // 🛠️ পেজ লোড হবামাত্রই ডাটাবেজ থেকে রিয়েল লগইনড ইউজারের প্রোফাইল নিয়ে আসা
  useEffect(() => {
    const fetchUserProfile = async () => {
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
        
        // ডাটাবেজের আসল অবজেক্ট ম্যাপিং
        const realUserData = {
          name: res.data.name || "Fable User",
          email: res.data.email || "",
          role: res.data.role || "Reader",
          memberSince: res.data.createdAt ? new Date(res.data.createdAt).toLocaleDateString() : "June 2026",
          bio: res.data.bio || "Welcome to my Fable Profile page.",
          location: res.data.location || "Not Specified",
          website: res.data.website || "https://fable.com",
          avatar: res.data.avatar || "" // ডাটাবেজে ছবি না থাকলে ব্ল্যাঙ্ক থাকবে
        };

        setUser(realUserData);
        setFormData(realUserData);
      } catch (err) {
        console.error("Failed to load profile data from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    alert("🎉 Standard client state saved perfectly!");
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, avatar: imageUrl });
      setUser({ ...user, avatar: imageUrl });
    }
  };

  // 🛠️ লগইন থাকা রিয়েল ইউজারের নামের ১ম অক্ষর বের করার লজিক
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    return fullName.trim().charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-100 flex justify-center py-10 px-4" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      <div className="w-11/12 md:w-10/12 max-w-6xl">
        <div className="bg-white rounded-xl shadow-sm border border-indigo-200 p-6 md:p-10" style={{ padding: "8px" }}>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-black">My Profile</h1>
              <p className="text-gray-500 mt-1">Manage your personal information</p>
            </div>

            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer" style={{ padding: "3px" }}>
                <Edit2 size={18} /> Edit Profile
              </button>
            ) : (
              <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer" style={{ padding: "4px" }}>
                <Check size={18} /> Save Changes
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Card */}
            <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col items-center" style={{ padding: "8px" }}>
              
              {/* 🛠️ ছবি থাকলে রিয়েল ছবি দেখাবে, না থাকলে লগইন থাকা রিয়েল নামের ১ম অক্ষর দেখাবে */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 shadow-sm"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-indigo-600 text-white flex items-center justify-center text-5xl font-black border-4 border-indigo-200 uppercase shadow-sm">
                  {getInitials(user.name)}
                </div>
              )}

              <label className="mt-5 bg-red-500 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl cursor-pointer text-xs font-semibold" style={{ padding: "2px" }}>
                Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>

              <div className="mt-6 text-center">
                <h2 className="text-xl font-bold text-black capitalize">{user.name}</h2>
                <p className="text-indigo-600 font-bold mt-1 uppercase text-xs tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{user.role}</p>
                <p className="text-gray-500 text-xs mt-2">Member since {user.memberSince}</p>
              </div>
            </div>

            {/* Right Fields */}
            <div className="lg:col-span-2 space-y-5">
              {/* Name */}
              <div>
                <label className="text-xs text-gray-600 font-semibold pl-1">Full Name</label>
                <div className="bg-indigo-50 p-4 rounded-xl mt-1.5">
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-indigo-200 text-gray-700 bg-white rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none" />
                  ) : (
                    <p className="text-gray-700 font-semibold text-sm capitalize pl-1">{user.name}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-xs text-gray-500 font-semibold pl-1">Bio</label>
                <div className="bg-indigo-50 p-4 rounded-xl mt-1.5">
                  {isEditing ? (
                    <textarea rows="3" name="bio" value={formData.bio} onChange={handleChange} className="w-full text-gray-700 border border-indigo-200 bg-white rounded-xl px-4 py-2.5 text-sm resize-none focus:border-indigo-500 outline-none" />
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed pl-1">{user.bio}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-gray-500 font-semibold pl-1">Email Address</label>
                <div className="bg-indigo-50 p-4 rounded-xl mt-1.5">
                  <p className="text-black font-semibold text-sm pl-1">{user.email}</p>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs text-gray-500 font-semibold pl-1">Location</label>
                <div className="bg-indigo-50 p-4 rounded-xl mt-1.5">
                  {isEditing ? (
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-indigo-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none" />
                  ) : (
                    <p className="text-gray-700 text-sm pl-1">{user.location}</p>
                  )}
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="text-xs text-gray-500 font-semibold pl-1">Website URL</label>
                <div className="bg-indigo-50 p-4 rounded-xl mt-1.5">
                  {isEditing ? (
                    <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full border border-indigo-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none" />
                  ) : (
                    <p className="text-gray-700 text-sm pl-1">{user.website}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
