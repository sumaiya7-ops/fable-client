"use client";

import { useState } from "react";
import { Edit2, Check } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Emily Storm",
    email: "emily.storm@gmail.com",
    role: "Writer",
    memberSince: "May 10, 2024",
    bio: "Passionate fiction writer creating immersive stories for readers worldwide.",
    location: "New York, USA",
    website: "www.emilystorm.com",
    facebook: "facebook.com/emilystorm",
    twitter: "x.com/emilystorm",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
  });

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);

      setFormData({
        ...formData,
        avatar: imageUrl,
      });

      setUser({
        ...user,
        avatar: imageUrl,
      });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 flex justify-center py-10 px-4">
      <div className="w-11/12 md:w-10/12 max-w-6xl">

        <div className="bg-white rounded-xl shadow-sm border border-indigo-200 p-6 md:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-black">
                My Profile
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your personal information
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-500  text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Check size={18} />
                Save Changes
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left */}
            <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col items-center">

              <img
                src={user.avatar}
                alt={user.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200"
              />

              <label className="mt-5 bg-red-500 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl cursor-pointer">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>

              <div className="mt-6 text-center">
                <h2 className="text-xl font-bold text-black">
                  {user.name}
                </h2>

                <p className="text-indigo-600 font-medium mt-1">
                  {user.role}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Member since {user.memberSince}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-2 space-y-5">

              {/* Name */}
               <label className="text-xs text-gray-600">
                  Full Name
                </label>
              <div className="bg-indigo-50 p-5 border-red-400 rounded-xl">
               

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-2 border border-indigo-300 text-gray-700 rounded-xl px-4 py-3"
                  />
                ) : (
                  <p className="text-gray-700 font-semibold mt-2">
                    {user.name}
                  </p>
                )}
              </div>

              {/* Email */}
                <label className="text-xs text-gray-500">
                  Email
                </label>
              <div className="bg-indigo-50 p-5 rounded-sm">
              

                <p className="text-black font-medium mt-2">
                  {user.email}
                </p>
              </div>

              {/* Bio */}
                  <label className="text-xs text-gray-500">
                  Bio
                </label>
              <div className="bg-indigo-50 p-5 rounded-sm">
              

                {isEditing ? (
                  <textarea
                    rows="4"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full mt-2 text-gray-700 border border-indigo-300 rounded-xl px-4 py-3"
                  />
                ) : (
                  <p className="text-gray-700 mt-2">
                    {user.bio}
                  </p>
                )}
              </div>

              {/* Location */}
                  <label className="text-xs text-gray-500">
                  Location
                </label>
              <div className="bg-indigo-50 text-gray-700 p-5 rounded-xl flex items-center gap-3">
                

                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 text-gray-700 rounded-sm px-4 py-3"
                  />
                ) : (
                  <p>{user.location}</p>
                )}
              </div>

              {/* Website */}
                  <label className="text-xs text-gray-500">
                  Website
                </label>
              <div className="bg-indigo-50 p-5 rounded-sm text-gray-700 flex items-center gap-3">
              
                {isEditing ? (
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded-sm px-4 py-3"
                  />
                ) : (
                  <p>{user.website}</p>
                )}
              </div>

              {/* Social */}
              <div className="grid md:grid-cols-2 gap-4">

               


              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}