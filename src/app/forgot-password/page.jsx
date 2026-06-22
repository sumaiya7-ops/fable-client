export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-black">
          Reset Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-4 rounded-xl mb-5"
        />

        <button className="w-full bg-indigo-600 text-white py-4 rounded-xl">
          Send Reset Link
        </button>

      </div>

    </div>
  );
}