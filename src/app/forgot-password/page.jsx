"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    console.log("Sending reset link to:", email);
    alert(`A password reset link has been sent to ${email} (If registered).`);
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

        {/* 🟢 div কেটে প্রফেশনাল form ট্যাগ ব্যবহার করা হলো */}
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
          <div className="h-2"></div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 h-6 hover:bg-indigo-700 text-white py-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-indigo-600/10 active:scale-[0.99]"
          >
            Send Reset Link
          </button>
        </form>

      </div>
    </div>
  );
}
