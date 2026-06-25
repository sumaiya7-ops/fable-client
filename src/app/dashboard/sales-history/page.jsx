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
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h1 className="text-3xl font-bold mb-6 text-black">
        Sales History
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-700">
              <th className="text-left py-4">Ebook</th>
              <th className="text-left py-4">Buyer</th>
              <th className="text-left py-4">Amount</th>
              <th className="text-left py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale, i) => (
              <tr key={i} className="border-b text-gray-700">

                <td className="py-4">{sale.ebook}</td>
                <td>{sale.buyer}</td>
                <td>{sale.amount}</td>
                <td>{sale.date}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}