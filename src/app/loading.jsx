export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="flex flex-col items-center gap-5">

        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

        <p className="text-lg text-gray-500">
          Loading...
        </p>

      </div>

    </div>
  );
}