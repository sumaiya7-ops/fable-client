const users = [
  {
    name: "John",
    email: "john@gmail.com",
    role: "User",
  },
  {
    name: "Emma",
    email: "emma@gmail.com",
    role: "Writer",
  },
  {
    name: "Alex",
    email: "alex@gmail.com",
    role: "Admin",
  },
];

export default function RecentTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md overflow-x-auto">

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left py-4">Name</th>
            <th className="text-left py-4">Email</th>
            <th className="text-left py-4">Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, i) => (
            <tr key={i} className="border-b">

              <td className="py-4">
                {user.name}
              </td>

              <td className="py-4">
                {user.email}
              </td>

              <td className="py-4">
                {user.role}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}