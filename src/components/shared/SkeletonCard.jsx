export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-3xl p-4">

      <div className="h-64 bg-indigo-100 rounded-2xl"></div>

      <div className="h-4 bg-indigo-100 rounded mt-4"></div>

      <div className="h-4 bg-indigo-100 rounded mt-2 w-1/2"></div>

    </div>
  );
}