"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios"; 

export default function EditEbookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentCoverUrl, setCurrentCoverUrl] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  // ডাটাবেজ থেকে এডিটেবল বইয়ের লাইভ ডাটা টেনে আনার ফাংশন
  useEffect(() => {
    const fetchEbookDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://fable-server-z2xt.onrender.com/ebook/${id}`);
        const bookData = res.data;

        if (bookData) {
          setTitle(bookData.title || "");
          setDescription(bookData.description || "");
          setCurrentCoverUrl(bookData.coverUrl || bookData.image || "https://co.com");
        }
      } catch (err) {
        console.error("Failed to load ebook details from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEbookDetail();
  }, [id]);

  // ডাটাবেজে এডিটেড তথ্য ও ছবি ক্লাউডে আপলোড করে স্থায়ী সেভ করার হ্যান্ডলার
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      let finalImageUrl = currentCoverUrl;

      // যদি ইউজার নতুন কোনো কভার ছবি সিলেক্ট করে, তবে সেটি ImgBB-তে আপলোড হবে
      if (selectedImg) {
        alert("Uploading newly updated cover image to ImgBB cloud... Please wait.");
        const imgData = new FormData();
        imgData.append("image", selectedImg);

        // 🛠️ ফিক্সড কোড: অফিশিয়াল এপিআই রুট এবং আসল চাবি সঠিকভাবে সিঙ্ক করা হলো
        const IMGBB_API_KEY = "026874596a164b68dedd170b1d577f52";
        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          imgData
        );

        if (imgbbRes.data.success) {
          finalImageUrl = imgbbRes.data.data.display_url;
        }
      }

      alert("Cover synced! Saving updated dataset into MongoDB Atlas database...");
      
      const token = localStorage.getItem("fable_token");
      const updatedPayload = {
        title,
        description,
        coverUrl: finalImageUrl,
        updatedAt: new Date()
      };

      // আপনার এক্সপ্রেস ব্যাকএন্ডের পুট রাউটে (`PUT /users/:id`) ডাটা পাঠানো হলো
      await axios.put(`https://fable-server-z2xt.onrender.com/ebooks/${id}`, updatedPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      alert("🎉 Ebook Metadata and Assets Updated Successfully inside Database!");
      router.push("/dashboard/writer"); 
    } catch (error) {
      console.error("Ebook update submit trigger failed:", error);
      alert("Something went wrong during data modification.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md max-w-2xl mx-auto mt-10 border border-gray-100" style={{ padding: "8px" }}>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight" style={{ paddingBottom: "8px" }}>
        Edit Ebook
      </h1>

      <form onSubmit={handleUpdateSubmit} className="space-y-5">
        
        {/* ইবুক টাইটেল ইনপুট ফিল্ড */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2" style={{ paddingBottom: "8px" }}>Ebook Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ebook title"
            required
            className="w-full bg-indigo-50 border border-gray-200 p-4 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* কভার ইমেজ ডিসপ্লে ও আপলোড সেকশন */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2" style={{ paddingTop: "8px" , paddingBottom:"8px" }}>Cover Image</label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-indigo-50 p-4 rounded-2xl border border-gray-200/60" style={{ padding: "8px" }}>
            
            <div className="sm:col-span-3 w-16 aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden border border-gray-300/40 shadow-sm mx-auto sm:mx-0">
              <img 
                src={selectedImg ? URL.createObjectURL(selectedImg) : currentCoverUrl} 
                alt="Cover Preview" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://co.com"; }}
              />
            </div>

            <div className="sm:col-span-9 w-full">
              <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-indigo-300 rounded-xl cursor-pointer bg-white hover:bg-indigo-50/30 transition">
                <span className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shrink-0">Choose File</span>
                <span className="text-xs text-gray-500 truncate font-medium px-2">
                  {selectedImg ? selectedImg.name : "Update new cover image"}
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setSelectedImg(e.target.files?.[0] || null)} 
                  className="hidden" 
                />
              </label>
            </div>

          </div>
        </div>

        {/* ইবুক ডেসক্রিপশন ফিল্ড */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2" style={{ paddingTop: "8px" , paddingBottom: "8px" }}>Description</label>
          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write ebook description..."
            required
            className="w-full bg-indigo-50 border border-gray-200 p-4 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 resize-none font-medium leading-relaxed text-sm"
            style={{ padding: "8px" }}
          />
        </div>

        {/* আপডেট বাটন */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
            style={{ padding: "12px 32px" }}
          >
            {submitting ? "Saving Changes..." : "Update Ebook"}
          </button>
        </div>
        
      </form>
    </div>
  );
}
