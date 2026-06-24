import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-4">
          Ebook purchased successfully.
        </p>

        <Link
          href="/dashboard/purchases"
          className="inline-block mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl"
        >
          View Purchase
        </Link>

      </div>

    </div>
  );
}