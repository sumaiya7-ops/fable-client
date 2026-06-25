const transactions = [
  { id: "TXN1245", user: "john.doe@gmail.com", type: "Purchase", amount: "$4.99", date: "May 12, 2024" },
  { id: "TXN1246", user: "emily.stone@gmail.com", type: "Ebook Sale", amount: "$19.99", date: "May 12, 2024" },
];

export default function RecentTable() {
  return (
    <div className="bg-[#121222] border border-gray-800/20 rounded-2xl p-5 shadow-lg">
      <h2 className="text-md font-bold text-white mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="text-gray-500 border-b border-gray-800/50">
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 divide-y divide-gray-800/30">
            {transactions.map((tx, i) => (
              <tr key={i} className="hover:bg-gray-800/10">
                <td className="py-3.5 font-mono text-gray-500">{tx.id}</td>
                <td className="py-3.5">{tx.user}</td>
                <td className="py-3.5 text-purple-400 font-medium">{tx.type}</td>
                <td className="py-3.5 text-white font-semibold">{tx.amount}</td>
                <td className="py-3.5 text-gray-500">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
