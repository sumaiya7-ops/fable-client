"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const savePayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) return;

      const token = localStorage.getItem("fable_token");

      try {
        await axios.post(
          "https://fable-server-z2xt.onrender.com/payment-success",
          {
            sessionId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    savePayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl text-emerald-500 font-bold">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-4">
          Ebook purchased successfully.
        </p>

        <Link
          href="/dashboard/purchases"
          className="inline-block mt-6 bg-indigo-600 text-white px-8 py-3 rounded-md"
        >
          View Purchase
        </Link>
      </div>
    </div>
  );
}