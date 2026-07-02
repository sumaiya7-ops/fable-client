"use client"; 

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { auth } from "../../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("reader"); // "reader" অথবা "writer"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 // 🟢 গুগোল লগইন ফাংশনটি এখন সঠিকভাবে বাইরে (독립적으로) ডিফাইন করা হলো
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userPayload = {
        name: user.displayName,
        email: user.email,
        role: "user",
      };

  try {
  await axios.post(
    "https://fable-server-z2xt.onrender.com/users",
    userPayload
  );
} catch (err) {
  // User already exists হলে ignore করবে
}

      const jwtRes = await axios.post(
        "https://fable-server-z2xt.onrender.com/jwt",
        {
          email: user.email,
        }
      );

      localStorage.setItem("fable_token", jwtRes.data.token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  // ইমেইল/পাসওয়ার্ড দিয়ে সাধারণ রেজিস্ট্রেশন সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);

    try {
      const mappedRole = role === "reader" ? "user" : "writer";
      const userPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: mappedRole
      };

      // ১. ডাটাবেজে ইউজার ইনফো পাঠানো
      const userResponse = await axios.post("https://fable-server-z2xt.onrender.com/users", userPayload);

      if (userResponse.data.insertedId) {
        // ২. সফল রেজিস্ট্রেশন শেষে JWT টোকেন জেনারেট করা
        const jwtResponse = await axios.post("https://fable-server-z2xt.onrender.com/jwt", {
          email: formData.email
        });

        if (jwtResponse.data.token) {
          // ৩. টোকেন লোকাল স্টোরেজে সংরক্ষণ
          localStorage.setItem("fable_token", jwtResponse.data.token);

          // ৪. রোল অনুযায়ী সঠিক ড্যাশবোর্ড বা হোমে রিডাইরেক্ট করা
          if (mappedRole === "writer") {
            router.push("/dashboard/writer");
          } else {
            router.push("/");
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf8] px-4 py-12">
      
      <h1 className="text-4xl font-bold text-center text-[#6c43f5] mb-10 tracking-wide drop-shadow-[0_0_15px_rgba(126,91,239,0.3)]">
        Fable
      </h1>

      <div className="w-8/12 max-w-[480px] mx-auto bg-[#eceff9] border rounded-2xl p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.4)] flex flex-col gap-8" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Create Your Account
          </h2>
          <p className="text-gray-800 text-sm mt-2 opacity-80">
            Join Fable and start your journey.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Full Name */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-900 block pl-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-indigo-100 border border-[#6a83e9] p-4 rounded-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-black block pl-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-indigo-100 border border-[#748be7] p-4 rounded-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-black block pl-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-indigo-100 border border-[#687dce] p-4 pr-12 rounded-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 transition-colors text-xl cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-900 block pl-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-indigo-100 border border-[#7c91e4] p-4 pr-12 rounded-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#583ae2] transition-all duration-200 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 transition-colors text-xl cursor-pointer"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Choose Role Card-Based Layout */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xl font-medium text-gray-800 block pl-1">
              Choose Role
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-indigo-100 ${
                  role === "reader" ? "border-[#583ae2]" : "border-transparent"
                }`}
                onClick={() => setRole("reader")}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role === "reader" ? "border-[#583ae2]" : "border-gray-400"
                }`}>
                  {role === "reader" && <div className="w-2 h-2 bg-[#583ae2] rounded-full"></div>}
                </div>
                <span className="text-sm text-gray-800 font-medium">I'm a Reader</span>
              </div>

              <div 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-indigo-100 ${
                  role === "writer" ? "border-[#583ae2]" : "border-transparent"
                }`}
                onClick={() => setRole("writer")}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role === "writer" ? "border-[#583ae2]" : "border-gray-400"
                }`}>
                  {role === "writer" && <div className="w-2 h-2 bg-[#583ae2] rounded-full"></div>}
                </div>
                <span className="text-sm text-gray-800 font-medium">I'm a Writer</span>
              </div>
            </div>
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
            >
              {loading ? "Registering Account..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-4">
  <button
    onClick={handleGoogleLogin}
    type="button"
    className="w-full border border-gray-300 rounded-xl py-4 bg-white hover:bg-gray-100 transition font-semibold"
  >
    Continue with Google
  </button>
</div>

        <p className="text-center text-gray-700 text-xs sm:text-sm mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:text-[#9677ff] font-semibold transition-colors inline-block ml-1"
          >
            <span style={{ color: "#10B981" }}>Login</span>
          </Link>
        </p>

      </div>
    </div>
  );
}
