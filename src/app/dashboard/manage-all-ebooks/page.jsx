const ebooks = [
  {
    id: 1,
    title: "Silent Watcher",
    writer: "James",
    price: "$4.99",
    status: "Published",
  },
];

export default function ManageAllEbooks() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h1 className="text-3xl font-bold mb-6">
        Manage All Ebooks
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Title</th>
              <th>Writer</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {ebooks.map((book) => (
              <tr key={book.id} className="border-b">

                <td className="py-4">{book.title}</td>
                <td>{book.writer}</td>
                <td>{book.price}</td>
                <td>{book.status}</td>

                <td className="space-x-2">

                  <button className="bg-green-600 text-white px-3 py-2 rounded">
                    Publish
                  </button>

                  <button className="bg-red-500 text-white px-3 py-2 rounded">
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}