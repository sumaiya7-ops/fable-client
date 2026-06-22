const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    role: "user",
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@gmail.com",
    role: "writer",
  },
];

export default function ManageUsers() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user.id} className="border-b">

                <td className="py-4">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td className="space-x-2">

                  <button className="bg-indigo-600 text-white px-3 py-2 rounded">
                    Change Role
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