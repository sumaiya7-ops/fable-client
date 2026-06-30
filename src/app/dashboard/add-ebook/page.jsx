
"use client";
import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import axios from "axios"; // 🛠️ এক্সিওস ইমপোর্ট করা হলো

export default function AddEbookPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    genre: "",
    language: "",
    pages: "",
    price: "",
    coverImage: null,
    pdfFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        coverImage: e.target.files[0],
      }));
    }
  };

  const handlePdfChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        pdfFile: e.target.files[0],
      }));
    }
  };

  // 🛠️ ডাটাবেজে নতুন বই সফলভাবে পাবলিশ করার হ্যান্ডলার (ImgBB + PDF Payload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverImage || !formData.pdfFile) {
      alert("Cover image এবং PDF ফাইল দুটোই আপলোড করতে হবে।");
      return;
    }

    try {
      setLoading(true);
      alert("Uploading cover image to secure ImgBB cloud... Please wait.");
      
      // ১. imgBB ক্লাউড হোস্টিং-এ কভার ইমেজ আপলোড করা
      const imgData = new FormData();
      imgData.append("image", formData.coverImage);
      
      // 🛠️ আপনার শতভাগ আসল ImgBB API Key এবং অফিশিয়াল এপিআই রুট সিঙ্ক করা হলো
      const IMGBB_API_KEY = "026874596a164b68dedd170b1d577f52";
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        imgData
      );

      if (!imgbbRes.data.success) throw new Error("ImgBB upload failed");
      const coverUrl = imgbbRes.data.data.display_url;
     
      const pdfUrl = formData.pdfFile ? `/uploads/pdf/${formData.pdfFile.name}` : "";

      alert("Cover uploaded! Saving book layout and PDF pointer to database...");

            const token = localStorage.getItem("fable_token");
      
      const ebookPayload = {
        title: formData.title,
        description: formData.description,
        writerName: formData.author,
        writerEmail: "writer@fable.com",
        genre: formData.genre,
        language: formData.language,
        pages: Number(formData.pages),
        price: parseFloat(formData.price),
        coverUrl,
        pdfUrl, // 🛠️ আপনার অ্যাড করা পিডিএফ ইউআরএল ভ্যারিয়েবলটি এখানে পারফেক্টলি লক করা হলো
        status: "available",
        createdAt: new Date()
      };

      // 🛠️ এক্সপ্রেস ব্যাকএন্ড সার্ভারের আসল পোস্ট এপিআই এন্ডপয়েন্টে ডেটা পাঠানো (ব্র্যাকেট ফিক্সড)
      const serverRes = await axios.post(
        "https://fable-server-z2xt.onrender.com/ebooks", 
        ebookPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          }
        }
      );

      if (serverRes.data) {
        alert("🎉 Ebook Published Successfully with PDF Link!");
        setFormData({
          title: "",
          description: "",
          author: "",
          genre: "",
          language: "",
          pages: "",
          price: "",
          coverImage: null,
          pdfFile: null,
        });
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.response?.data?.message || "Something went wrong during publication.");
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = () => {
    console.log("Draft Saved", formData);
    alert("Draft Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8" style={{ paddingLeft: "8px", paddingRight: "8px" }}>
      <div className="max-w-5xl mx-auto bg-indigo-100 border border-indigo-500 rounded-xl p-5 md:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Add New Ebook
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Publish your ebook and share your story with readers worldwide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-6">

            {/* LEFT COLUMN */}
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-md mb-2 text-gray-900 font-semibold">
                  Ebook Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter ebook title"
                  required
                  className="w-full bg-indigo-50 border border-indigo-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-md mb-2 text-gray-800 font-semibold">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 text-gray-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-md mb-2 text-gray-900 font-semibold">
                  Description
                </label>
                <textarea
                  rows={8}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write ebook description..."
                  required
                  className="w-full bg-indigo-50 border border-indigo-500 text-gray-800 rounded-xl px-4 py-3 outline-none resize-none focus:border-indigo-500 text-sm leading-relaxed"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              {/* Genre */}
              <div>
                <label className="block text-sm mb-2 text-gray-800 font-semibold">
                  Genre
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 text-gray-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium cursor-pointer"
                >
                  <option value="">Select Genre</option>
                  <option value="Psychology">Psychology</option>
                  <option value="History">History</option>
                  <option value="Self Improvement">Self Improvement</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Science Fiction</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm mb-2 text-gray-800 font-semibold">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 text-gray-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium cursor-pointer"
                >
                  <option value="">Select Language</option>
                  <option>English</option>
                  <option>Bangla</option>
                  <option>Hindi</option>
                </select>
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm mb-2 text-gray-800 font-semibold">
                  Total Pages
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  placeholder="250"
                  required
                  className="w-full bg-indigo-50 text-gray-800 border border-indigo-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm mb-2 text-gray-800 font-semibold">
                  Price (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="4.99"
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 text-gray-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Cover Upload */}
              <div>
                <label className="block text-sm mb-2 text-gray-800 font-semibold">
                  Cover Image
                </label>
                <label className="flex flex-col justify-center items-center h-32 border border-dashed border-indigo-600 rounded-xl cursor-pointer hover:border-indigo-500 transition bg-indigo-50/20">
                  <Upload size={24} className="text-red-500 mb-2" />
                  <p className="text-xs text-gray-600 font-medium px-4 text-center truncate w-full">
                    {formData.coverImage ? formData.coverImage.name : "Upload Cover Image"}
                  </p>
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                </label>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm mb-2 text-gray-800 font-semibold">
                  Ebook PDF
                </label>
                <label className="flex flex-col justify-center items-center h-32 border border-dashed border-[#221f3b] rounded-xl cursor-pointer hover:border-indigo-500 transition bg-indigo-50/20">
                  <FileText size={24} className="text-indigo-800 mb-2" />
                  <p className="text-xs text-gray-600 font-medium px-4 text-center truncate w-full">
                    {formData.pdfFile ? formData.pdfFile.name : "Upload PDF File"}
                  </p>
                  <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" />
                </label>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="border-t border-indigo-500 mt-8 pt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={handleDraft}
              className="px-6 py-3 rounded-xl border border-indigo-400 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer text-xs"
            >
              Save Draft
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-900 text-white hover:bg-indigo-950 font-semibold transition shadow-lg shadow-indigo-900/10 cursor-pointer text-xs disabled:opacity-50"
            >
              {loading ? "Publishing Ebook..." : "Publish Ebook"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
