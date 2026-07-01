"use client"; 

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ইনপুট হ্যান্ডলার (টাইপো ফিক্সড: e.target.type এর বদলে e.target.name ব্যবহার করা হলো)
   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    localStorage.setItem("fable_token", token);
    router.push("/");
  }
}, [router]);

  // ইমেইল/পাসওয়ার্ড দিয়ে লগইন সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ১. টোকেন জেনারেট করার জন্য ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
    const response = await axios.post(
  "https://fable-server-z2xt.onrender.com/jwt",
  {
    email: formData.email,
    password: formData.password,
  }
);
      if (response.data.token) {
        // ২. টোকেন লোকাল স্টোরেজে সংরক্ষণ করা
        localStorage.setItem("fable_token", response.data.token);

        // ৩. ইউজারের রোল চেক করার জন্য প্রোফাইল রিকোয়েস্ট পাঠানো
        const userResponse = await axios.get("https://fable-server-z2xt.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${response.data.token}` }
        });

        const loggedInUser = userResponse.data;

        // ৪. রিকোয়ারমেন্ট অনুযায়ী রোল-ভিত্তিক রিডাইরেকশন
        if (loggedInUser?.role === "admin") {
          router.push("/dashboard/admin");
        } else if (loggedInUser?.role === "writer") {
          router.push("/dashboard/writer");
        } else {
          router.push("/"); // সাধারণ রিডার/ইউজারদের জন্য হোম পেজে রিডাইরেক্ট
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials or login failed!");
    } finally {
      setLoading(false);
    }
  };

  // BetterAuth / Google ওঅথ লগইন হ্যান্ডলার
const handleGoogleLogin = () => {
  setError("");
  window.location.href =
    "https://fable-server-z2xt.onrender.com/auth/google";
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf8] px-4 py-12" >
      
      <h1 className="text-4xl font-bold text-center text-[#6c43f5] mb-10 tracking-wide drop-shadow-[0_0_15px_rgba(126,91,239,0.3)]">
        Fable
      </h1>

      <div className="w-8/12 max-w-[480px] mx-auto bg-[#eceff9] rounded-3xl p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.4)] flex flex-col gap-8" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Welcome Back!
          </h2>
          <p className="text-gray-800 text-sm mt-2 opacity-80">
            Login to continue to Fable.
          </p>
        </div>

        {/* এরর মেসেজ ডিসপ্লে */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-600 block pl-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-[#dee2f5] border border-indigo-200 rounded-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              required
            /> 
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-600 block pl-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 bg-[#dee2f5] border border-indigo-200 rounded-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              required
            />
          </div>

          <div className="flex justify-end mt-1">
            <Link
              href="/forgot-password"
              className="text-[#f03737] hover:text-[#9677ff] text-xs font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold rounded-xl text-center transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg cursor-pointer disabled:opacity-50"
              style={{
                backgroundColor: "#583ae2",
                paddingTop: "18px",
                paddingBottom: "18px",
                boxShadow: "0 4px 15px rgba(88, 58, 226, 0.3)"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#472ec4";
                  e.currentTarget.style.boxShadow = "0 6px 25px rgba(88, 58, 226, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#583ae2";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(88, 58, 226, 0.3)";
                }
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

        </form>

        <div className="relative py-2 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#232d52]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#dee4fc] px-5 text-gray-800 text-[11px] tracking-wider">
              or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-[#35437d] border border-[#2b3765] text-gray-200 py-4 rounded-xl flex items-center justify-center gap-3 text-base sm:text-lg font-semibold hover:bg-[#1b2343] hover:border-[#384883] transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>

          <p className="text-center text-gray-500 text-xs sm:text-sm mt-2">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#f03737] hover:text-[#9677ff] font-semibold transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
