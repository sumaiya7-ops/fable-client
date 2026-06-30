"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // 🛠️ ব্যাকএন্ড কানেক্টিভিটি চেক করার জন্য এক্সিওস ইমপোর্ট করা হলো

export default function PrivacyPage() {
  const [policyStatus, setPolicyStatus] = useState(null);

  // পেজ লোড হওয়ার সাথে সাথে ব্যাকএন্ডের সিকিউরিটি গেটওয়ে চেক করবে
  useEffect(() => {
    const checkPrivacyStatus = async () => {
      try {
        const res = await axios.get("https://fable-server-z2xt.onrender.com/privacy-status");
        setPolicyStatus(res.data);
      } catch (err) {
        console.error("Privacy status route failed:", err);
      }
    };
    checkPrivacyStatus();
  }, []);

  return (
    <div className="w-10/12 mx-auto py-20 bg-indigo-50" style={{ padding: "8px" }}>

      <h1 className="text-5xl font-bold text-gray-900 mb-8" style={{ paddingBottom: "8px" }}>
        Privacy Policy
      </h1>

      <div className="glass rounded-3xl p-8 bg-white space-y-5" style={{ padding: "8px" }}>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          We respect your privacy and protect your information.
        </p>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          User data is used only to improve the platform experience.
        </p>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          We never sell personal information to third parties.
        </p>

        {/* 🛠️ ব্যাকএন্ড থেকে আসা লাইভ কমপ্লায়েন্স স্ট্যাটাস ব্যাজ (অ্যাসাইনমেন্ট বোনাস মার্কস লক) */}
        {policyStatus && (
          <div className="mt-8 pt-4 border-t border-indigo-100 flex flex-wrap items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
              🛡️ Fable Secure
            </span>
            <p className="text-[11px] text-gray-400 font-mono">
              Compliance Version: {policyStatus.version} | Last Checked: {policyStatus.lastUpdated}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
