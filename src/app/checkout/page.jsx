"use client";

import { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import axios from "axios";

// 🔑 Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51Tk2SVK3GSLXndiSwGgK0lCtFzhMkVP9tYCAi3LXeJ2pEdoBd5LGkZwsN1sqIDqWcZ6lg6dDhX8SouacolP2SxHN004trQC0nm");

function CheckoutContent() {
  const searchParams = useSearchParams();
  const ebookId = searchParams.get("id") || "1"; 

  const [book, setBook] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [cardName, setCardName] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const token = localStorage.getItem("fable_token");
        
        // ১. ব্যাকএন্ড থেকে বইয়ের রিয়েল ডেটা লোড করা
        const bookRes = await axios.get(`https://fable-server-z2xt.onrender.com/ebook/${ebookId}`);
        const currentBook = bookRes.data.book || bookRes.data;
       
        setBook(currentBook);

        // 🛠️ এখানে ফিক্স করা হলো: সিডিং ডাটায় _id না থাকায় URL থেকে সরাসরি ebookId পাস করা হচ্ছে যেন undefined না হয়
        const targetId = currentBook.id || currentBook._id || ebookId;

        // ২. স্ট্রাইপ পেমেন্ট ইন্টেন্ট সিক্রেট তৈরি করা
        const intentRes = await axios.post(
          "https://fable-server-z2xt.onrender.com/create-payment-intent",
          { ebookId: targetId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClientSecret(intentRes.data.clientSecret);
        setMessage(""); // সাকসেস হলে এরর মেসেজ ক্লিয়ার করবে
      } catch (err) {
        console.error("Initialization failed:", err);
        setMessage(err.response?.data?.message || "Stripe initialization failed.");
      }
    };

    if (ebookId) fetchCheckoutData();
  }, [ebookId]);

  const handleCustomPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: cardName || "Anonymous Buyer" },
      },
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
      setProcessing(false);
       setTimeout(() => {
        window.location.href = "/payment-cancel";
      }, 1500);
    } else if (paymentIntent.status === "succeeded") {
      try {
        const token = localStorage.getItem("fable_token");
        await axios.post(
          "https://fable-server-z2xt.onrender.com/payment-success",
          { sessionId: paymentIntent.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("🎉 Payment Successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/payment-success";
        }, 2000);
      } catch (saveErr) {
        setMessage("Payment succeeded but server failed to save logs.");
        setProcessing(false);
      }
    }
  };

  const bookPrice = book?.price || 4.99;
  const platformFee = 1.00;
  const totalPrice = (parseFloat(bookPrice) + platformFee).toFixed(2);

return (
  <div className="min-h-screen bg-indigo-50 text-black font-sans flex items-center justify-center px-4 py-6 sm:px-6 md:px-12 w-full" style={{padding : "8px"}}>
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 sm:p-6 lg:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-indigo-400" style={{padding : "8px"}}>

      {/* Order Summary */}
      <div className="bg-black p-5 sm:p-6 rounded-2xl border border-indigo-600 flex flex-col justify-between gap-8" style={{padding : "8px"}}>
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5">
            Order Summary
          </h3>

          <div className="flex gap-4 items-center">
          <img
  src={
    book?.coverUrl ||
    book?.image ||
    "https://i.postimg.cc/1znS3RDG/book-2.jpg"
  }
  onError={(e) => {
    e.currentTarget.src =
      "https://i.postimg.cc/1znS3RDG/book-2.jpg";
  }}
  alt="Ebook cover"
/>

            <div className="flex flex-col min-w-0">
              <h4 className="font-extrabold text-sm text-gray-900 break-words">
                {book?.title || "The Silent Watcher"}
              </h4>

              <p className="text-xs text-gray-700 mt-0.5 break-words">
                By {book?.writerName || "James Rollins"}
              </p>

              <p className="text-sm font-black text-red-500 mt-2">
                ${parseFloat(bookPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5 space-y-3 text-xs">
          <div className="flex justify-between" style={{paddingTop : "4px"}}>
            <span>Subtotal</span>
            <span className="text-red-600">
              ${parseFloat(bookPrice).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span className="text-red-600">
              ${platformFee.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between  font-extrabold border-t border-[#3b45a7] pt-3 text-base">
            <span>Total</span>
            <span className="text-red-600">
              ${totalPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form
        onSubmit={handleCustomPayment}
        className="lg:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-6 w-full"
      >

        {/* Card Details */}
        <div className="md:col-span-3 space-y-5">

          <h3 className="text-sm font-bold  uppercase tracking-wider mb-2">
            Payment Details
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-600 pl-1">
              Card Information
            </label>

            <div className="w-full overflow-hidden bg-white border border-[#2335dd] p-4 rounded-xl shadow-inner focus-within:border-indigo-500 transition">

              <CardElement
  options={{
    style: {
      base: {
        fontSize: "16px",
        color: "#000000",
        fontFamily: "sans-serif",
        "::placeholder": {
          color: "#6b7280",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  }}
/>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-700 pl-1">
              Name on Card
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full bg-white border border-[#1a2bc2] p-4 rounded-xl text-sm  focus:border-indigo-500 outline-none transition font-medium placeholder-gray-600"
              required
            />
          </div>

          <label className="flex items-center gap-3 text-xs text-gray-700 cursor-pointer select-none pl-1 mt-2" style={{paddingTop: "4px"}}>
            <input
              type="checkbox"
              className="w-4 h-4 rounded bg-red-600 border-[#f10f0f] text-white accent-red-500 cursor-pointer" 
            />
            <span>Save card for future payments</span>
          </label>

        </div>

        {/* Secure Payment */}
        <div className="md:col-span-2 flex flex-col justify-between gap-6 bg-white p-5 sm:p-6 rounded-2xl border border-[#283adf]" style={{padding: '4px'}}>

          <div className="space-y-4">

            <div className="flex flex-col">
              <span className="text-xs font-semibold ">
                Secure Payment
              </span>

              <span className="text-sm font-bold text-gray-500 mt-1 flex items-center gap-1.5">
                Powered by
                <span className="text-indigo-400 font-black tracking-tight">
                  stripe
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3 items-center mt-2">

              <img
                src="https://cdn.simpleicons.org/visa"
                alt="Visa"
                className="h-6 w-auto bg-white p-1 rounded"
              />

              <img
                src="https://cdn.simpleicons.org/mastercard"
                alt="Mastercard"
                className="h-6 w-auto bg-white p-1 rounded"
              />

              <img
                src="https://cdn.simpleicons.org/americanexpress"
                alt="American Express"
                className="h-6 w-auto bg-white p-1 rounded"
              />

              <img
                src="https://cdn.simpleicons.org/applepay"
                alt="Apple Pay"
                className="h-6 w-auto bg-white p-1 rounded"
              />

            </div>

          </div>

          <div className="flex flex-col gap-3">

            {message && (
              <p className="text-xs text-center text-indigo-400 font-medium leading-relaxed">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={!stripe || processing || !clientSecret}
              className="w-full py-3 sm:py-4 bg-red-500 hover:bg-green-600 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-600/30 disabled:opacity-40 cursor-pointer text-center text-sm active:scale-[0.98]"
            >
              {processing ? "Processing..." : `Pay $${totalPrice}`}
            </button>

            <p className="text-[10px] text-gray-700 text-center leading-relaxed">
              By completing purchase, you agree to our{" "}
              <span className="text-indigo-600 hover:underline cursor-pointer">
                Terms and Conditions
              </span>
            </p>

          </div>

        </div>

      </form>

    </div>
  </div>
);
}
export default function CustomCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center text-black justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <Elements stripe={stripePromise}>
        <CheckoutContent />
      </Elements>
    </Suspense>
  );
}
