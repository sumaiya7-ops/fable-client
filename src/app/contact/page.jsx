"use client";

import { useState } from "react";
import axios from "axios"; // 🛠️ ব্যাকএন্ডে ডেটা পাঠানোর জন্য এক্সিওস ইমপোর্ট করা হলো

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  // 🛠️ ফর্ম সাবমিশন লজিক যা সরাসরি ডাটাবেজে হিট করবে
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://fable-server-z2xt.onrender.com/contact", formData);
      
      if (res.data.success) {
        alert(`🎉 ${res.data.message}`);
        // সফল সাবমিশনের পর ফর্ম ইনপুট খালি করার লজিক
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      alert(err.response?.data?.message || "Server engine is offline!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
        </div>
        <div className="h-2"></div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="bg-indigo-50 rounded-3xl shadow-lg p-8 md:p-10 space-y-6" style={{ padding: "8px" , paddingRight:"8px" }}>
            <h2 className="text-2xl font-bold text-black">Get In Touch</h2>
            <p className="text-gray-600 leading-7">
              Our team is always ready to help readers and writers. Feel free to contact us anytime.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-black">Email</h3>
                <p className="text-gray-600">sumaiyakookie307@gmail.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Phone</h3>
                <p className="text-gray-600">+880 1826459605</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Address</h3>
                <p className="text-gray-600">Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-indigo-50 rounded-xl shadow-lg p-8 md:p-10" style={{ padding: "8px" , paddingRight:"8px" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 text-black placeholder-gray-400"
                required
              />
              <div className="h-1"></div>

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 text-black placeholder-gray-400"
                required
              />
              <div className="h-1"></div>

              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => handleInputChange(e, "subject")}
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 text-black placeholder-gray-400"
              />
              <div className="h-1"></div>

              <textarea
                rows={6}
                placeholder="Write your message..."
                value={formData.message}
                onChange={(e) => handleInputChange(e, "message")}
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 resize-none text-black placeholder-gray-400"
                required
              />
              <div className="h-1"></div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold transition cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
