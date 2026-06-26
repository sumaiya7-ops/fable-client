import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-red-500">
          401
        </h1>

        <h2 className="text-3xl text-gray-800 font-bold mt-4">
          Unauthorized
        </h2>

        <p className="text-gray-500 mt-3">
          Please login to continue.
        </p>

        <Link
          href="/login"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-md h-6 w-16"
        >
          Login
        </Link>

      </div>
    </div>
  );
}