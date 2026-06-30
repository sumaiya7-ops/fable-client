"use client";

import { useState } from "react";
import axios from "axios"; // 🛠️ ব্যাকএন্ডে রিকোয়েস্ট পাঠানোর জন্য এক্সিওস ইমপোর্ট করা হলো

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // এরর বা সাকসেস মেসেজ স্ক্রিনে দেখানোর স্টেট
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // 🛠️ ব্যাকএন্ডের তৈরি করা নতুন এপিআই এন্ডপয়েন্টে লাইভ ডেটা পাঠানো হচ্ছে
      const response = await axios.post("https://fable-server-z2xt.onrender.com/forgot-password", { email });
      
      if (response.data.success) {
        setMessage(`🎉 ${response.data.message}`);
        setEmail(""); // সাকসেস হলে ইনপুট বক্স খালি হবে
      }
    } catch (err) {
      console.error("Password reset request failed:", err);
      // ব্যাকএন্ড থেকে আসা এক্সেক্ট এরর মেসেজ স্ক্রিনে দেখাবে
      setMessage(`❌ ${err.response?.data?.message || "Database server is offline!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-gray-100" style={{ paddingLeft: "8px" , paddingRight:"8px" , paddingTop:"10px" , gap:"10px"}}>
        
        <h1 className="text-3xl font-bold mb-3 text-black tracking-tight">
          Reset Password
        </h1>
        <p className="text-gray-500 text-xs mb-6">
          Enter your email address below and we'll send you a secure link to reset your password.
        </p>
        <div className="h-2"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-xl text-sm text-gray-800 bg-indigo-50 outline-none focus:border-indigo-500 transition-all font-medium placeholder-gray-400"
              required
            />
          </div>
          
          {/* 🛠️ এরর বা সাকসেস স্ট্যাটাস নোটিফিকেশন টেক্সট */}
          {message && (
            <p className="text-xs font-semibold pl-1 text-indigo-600 transition-all leading-relaxed">
              {message}
            </p>
          )}
          <div className="h-1"></div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 h-12 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-indigo-600/10 active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

      </div>
    </div>
  );
}
