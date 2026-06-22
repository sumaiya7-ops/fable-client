import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Welcome Back
        </h1>

        <form className="space-y-5">

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

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-indigo-600 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full bg-indigo-600 text-white py-4 rounded-xl"
          >
            Login
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
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-medium"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}