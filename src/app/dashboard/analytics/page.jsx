export default function AnalyticsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-black">
        Analytics Overview
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white h-80 rounded-3xl shadow-md p-6">

          <h2 className="font-bold mb-4">
            Monthly Sales Chart
          </h2>

          <div className="h-56 rounded-xl bg-indigo-100 flex items-center justify-center">
            Chart Here
          </div>

        </div>

        <div className="bg-white h-80 rounded-3xl shadow-md p-6">

          <h2 className="font-bold mb-4">
            Genre Distribution
          </h2>

          <div className="h-56 rounded-xl bg-indigo-100 flex items-center justify-center">
            Pie Chart Here
          </div>

        </div>

      </div>

    </div>
  );
}