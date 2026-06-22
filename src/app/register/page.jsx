import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Create Account
        </h1>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
          />

          <select className="w-full border p-4 rounded-xl">
            <option>User</option>
            <option>Writer</option>
          </select>

          <button
            className="w-full bg-indigo-600 text-white py-4 rounded-xl"
          >
            Register
          </button>

        </form>

        <div className="my-6 text-center text-gray-500">
          OR
        </div>

        <button
          className="w-full border py-4 rounded-xl flex items-center justify-center gap-3"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}