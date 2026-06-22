const ebooks = [
  {
    id: 1,
    title: "Silent Watcher",
    price: "$4.99",
    status: "Published",
  },
  {
    id: 2,
    title: "Echoes",
    price: "$3.99",
    status: "Draft",
  },
];

export default function ManageEbooksPage() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h1 className="text-3xl font-bold mb-6 text-black">
        Manage Ebooks
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Title</th>
              <th className="text-left py-4">Price</th>
              <th className="text-left py-4">Status</th>
              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ebooks.map((ebook) => (
              <tr key={ebook.id} className="border-b">

                <td className="py-4">{ebook.title}</td>
                <td>{ebook.price}</td>
                <td>{ebook.status}</td>

                <td className="space-x-2">

                  <button className="bg-blue-500 text-white px-3 py-2 rounded">
                    Edit
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