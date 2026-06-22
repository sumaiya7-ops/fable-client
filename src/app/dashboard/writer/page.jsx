export default function WriterDashboard() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-black">
        Writer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h3 className="text-gray-500">Total Ebooks</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h3 className="text-gray-500">Ebooks Sold</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">356</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">$2,450</p>
        </div>

      </div>

    </div>
  );
}