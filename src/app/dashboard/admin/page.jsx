export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-black">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">2,450</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-gray-500">Writers</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">420</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-gray-500">Sold</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">8,900</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">$18K</p>
        </div>

      </div>

    </div>
  );
}