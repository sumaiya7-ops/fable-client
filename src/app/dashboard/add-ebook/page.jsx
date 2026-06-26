"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export default function AddEbookPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverImage) {
      alert("Please upload a cover image first.");
      return;
    }

    try {
      alert("Uploading cover image to imgBB...");
      
      // ১. imgBB তে কভার ইমেজ আপলোড করা
      const imgData = new FormData();
      imgData.append("image", formData.coverImage);
      
      // আপনার .env ফাইল থেকে VITE_IMGBB_API_KEY বা NEXT_PUBLIC_IMGBB_API_KEY বসাবেন
      const imgbbRes = await fetch(`https://imgbb.com{process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY'}`, {
        method: "POST",
        body: imgData,
      });
      const imgbbResult = await imgbbRes.json();
      const imageUrl = imgbbResult.data.url;

      alert("Image uploaded successfully! Saving ebook data...");

      // ২. আপনার এক্সপ্রেস ব্যাকএন্ড সার্ভারে সমস্ত ডাটা পাঠানো
      const ebookPayload = {
        title: formData.title,
        description: formData.description,
        author: formData.author,
        genre: formData.genre,
        language: formData.language,
        pages: Number(formData.pages),
        price: Number(formData.price),
        image: imageUrl, // imgBB থেকে প্রাপ্ত লিঙ্ক
      };

      const serverRes = await fetch("http://localhost:5000/api/v1/ebooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // আপনার JWT টোকেন থাকলে এখানে যুক্ত করবেন
        },
        body: JSON.stringify(ebookPayload),
      });

      if (serverRes.ok) {
        alert("Ebook Published Successfully and Saved to DB!");
        // ফর্ম রিসেট করার লজিক
      } else {
        alert("Failed to save ebook on server.");
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong during publication.");
    }
  };
    const handleDraft = () => {
    console.log("Draft Saved", formData);
    alert("Draft Saved Successfully!");
  };


  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
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

            {/* LEFT */}
            <div className="space-y-5">

              {/* Title */}
              <div>
                <label className="block text-md mb-2 text-gray-900">
                  Ebook Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter ebook title"
                  required
                  className="w-full bg-indigo-50 border border-indigo-200 text-gray-500 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-md mb-2 text-gray-800">
                  Author Name
                </label>

                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-md mb-2 text-gray-900">
                  Description
                </label>

                <textarea
                  rows={8}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write ebook description..."
                  required
                  className="w-full bg-indigo-50 border border-indigo-500 text-gray-600 rounded-xl px-4 py-3 outline-none resize-none focus:border-indigo-500"
                />
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-5">

              {/* Genre */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
                  Genre
                </label>

                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">Select Genre</option>
                  <option>Fiction</option>
                  <option>Mystery</option>
                  <option>Fantasy</option>
                  <option>Thriller</option>
                  <option>Romance</option>
                  <option>Science Fiction</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
                  Language
                </label>

                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full bg-indigo-50 border border-indigo-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">Select Language</option>
                  <option>English</option>
                  <option>Bangla</option>
                  <option>Hindi</option>
                </select>
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
                  Total Pages
                </label>

                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  placeholder="250"
                  required
                  className="w-full bg-indigo-50 text-gray-600 border border-indigo-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
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
                  className="w-full bg-indigo-50 border border-indigo-300 text-gray-600 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Cover Upload */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
                  Cover Image
                </label>

                <label className="flex flex-col justify-center items-center h-32 border border-dashed border-indigo-600 rounded-xl cursor-pointer hover:border-indigo-500 transition">
                  <Upload
                    size={24}
                    className="text-red-500 mb-2"
                  />

                  <p className="text-xs text-gray-600">
                    {formData.coverImage
                      ? formData.coverImage.name
                      : "Upload Cover Image"}
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
                  Ebook PDF
                </label>

                <label className="flex flex-col justify-center items-center h-32 border border-dashed border-[#221f3b] rounded-xl cursor-pointer hover:border-indigo-500 transition">
                  <FileText
                    size={24}
                    className="text-indigo-800 mb-2"
                  />

                  <p className="text-xs text-gray-600">
                    {formData.pdfFile
                      ? formData.pdfFile.name
                      : "Upload PDF File"}
                  </p>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="hidden"
                  />
                </label>
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-indigo-500 mt-8 pt-6 flex flex-col sm:flex-row justify-end gap-3">

            <button
              type="button"
              onClick={handleDraft}
              className="px-6 py-3 rounded-xl border border-indigo-400  transition"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-900 text-white hover:bg-indigo-950 font-semibold transition shadow-lg shadow-indigo-900/10"
            >
              Publish Ebook
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}