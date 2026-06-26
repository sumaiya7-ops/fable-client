import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">

      <div className="bg-white  p-10 rounded-3xl shadow-lg text-center max-w-md">

        <div className="text-6xl mb-4">
          ❌
        </div>

        <h1 className="text-3xl text-red-500 font-bold">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mt-4">
          Your payment was not completed.
        </p>

        <Link
          href="/browse"
          className="inline-block h-6 mt-6 bg-indigo-600 text-white px-8 py-3 rounded-md"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}