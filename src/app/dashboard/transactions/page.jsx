const transactions = [
  {
    id: "TX-001",
    email: "john@gmail.com",
    amount: "$4.99",
    date: "20 Jun 2025",
  },
];

export default function TransactionsPage() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h1 className="text-3xl font-bold mb-6">
        Transactions
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th>ID</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((trx) => (
              <tr key={trx.id} className="border-b">

                <td className="py-4">{trx.id}</td>
                <td>{trx.email}</td>
                <td>{trx.amount}</td>
                <td>{trx.date}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}