const sales = [
  {
    ebook: "Silent Watcher",
    buyer: "John",
    amount: "$4.99",
    date: "21 Jun 2025",
  },
  {
    ebook: "Echoes",
    buyer: "Emma",
    amount: "$3.99",
    date: "20 Jun 2025",
  },
];

export default function SalesHistoryPage() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md" style={{ paddingLeft: "8px" , paddingRight:"8px" , paddingTop:"6px" }}>

      <h1 className="text-3xl font-bold mb-6 text-black">
        Sales History
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full ">

          <thead>
            <tr className="border-b text-gray-700">
              <th className="text-left py-4">Ebook</th>
              <th className="text-left py-4">Buyer</th>
              <th className="text-left py-4">Amount</th>
              <th className="text-left py-4">Date</th>
            </tr>
          </thead>
{/* 🟢 পুরাতন tbody কেটে দিয়ে এই প্যাডিংযুক্ত কোডটি বসিয়ে দিন */}
<tbody className="divide-y divide-gray-300">
  {sales.map((sale, i) => (
    <tr key={i} className="text-sm text-gray-700 hover:bg-gray-50/50 transition">
      <td className="py-4 font-medium text-gray-900">{sale.ebook}</td>
      <td className="py-4 text-gray-600">{sale.buyer}</td>
      <td className="py-4 font-mono text-red-600 font-semibold">{sale.amount}</td>
      <td className="py-4 text-gray-500">{sale.date}</td>
    </tr>
  ))}
</tbody>

  
        </table>

      </div>

    </div>
  );
}