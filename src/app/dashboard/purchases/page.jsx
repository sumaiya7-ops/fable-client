const purchases = [
  {
    id: 1,
    title: "The Silent Watcher",
    writer: "James Rollins",
    price: "$4.99",
    date: "20 Jun 2025",
    status: "Completed",
  },
  {
    id: 2,
    title: "Echoes of Tomorrow",
    writer: "Sophia Bailey",
    price: "$3.49",
    date: "19 Jun 2025",
    status: "Completed",
  },
];

export default function PurchaseHistoryPage() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">

      <h1 className="text-3xl font-bold text-black mb-6">
        Purchase History
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Ebook</th>
              <th className="text-left py-4">Writer</th>
              <th className="text-left py-4">Price</th>
              <th className="text-left py-4">Date</th>
              <th className="text-left py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((item) => (
              <tr key={item.id} className="border-b">

                <td className="py-4">{item.title}</td>
                <td className="py-4">{item.writer}</td>
                <td className="py-4">{item.price}</td>
                <td className="py-4">{item.date}</td>

                <td className="py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {item.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}