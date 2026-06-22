export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md h-[400px]">

      <h2 className="text-2xl font-bold mb-8">
        Revenue Analytics
      </h2>

      <div className="h-[250px] flex items-end gap-4">

        <div className="bg-indigo-300 h-24 w-12 rounded-t"></div>
        <div className="bg-indigo-400 h-40 w-12 rounded-t"></div>
        <div className="bg-indigo-500 h-32 w-12 rounded-t"></div>
        <div className="bg-indigo-600 h-52 w-12 rounded-t"></div>
        <div className="bg-indigo-700 h-44 w-12 rounded-t"></div>

      </div>

    </div>
  );
}