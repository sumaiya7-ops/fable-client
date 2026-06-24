import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="bg-white rounded-2xl p-6 h-full shadow-md">

      <h2 className="text-2xl font-bold text-indigo-600 mb-8">
        Dashboard
      </h2>

      <div className="space-y-4">

        <Link href="/dashboard">
          <div className="p-3 rounded-xl hover:bg-indigo-100 cursor-pointer">
            Overview
          </div>
        </Link>

        <Link href="/dashboard/manage-ebooks">
          <div className="p-3 rounded-xl hover:bg-indigo-100 cursor-pointer">
            Manage Ebooks
          </div>
        </Link>

        <Link href="/dashboard/users">
          <div className="p-3 rounded-xl hover:bg-indigo-100 cursor-pointer">
            Users
          </div>
        </Link>

        <Link href="/dashboard/transactions">
          <div className="p-3 rounded-xl hover:bg-indigo-100 cursor-pointer">
            Transactions
          </div>
        </Link>

        <Link href="/dashboard/analytics">
          <div className="p-3 rounded-xl hover:bg-indigo-100 cursor-pointer">
            Analytics
          </div>
        </Link>
        <Link href="/dashboard/purchases">
  <div className="p-3 rounded-xl hover:bg-indigo-100">
    Purchase History
  </div>
</Link>

<Link href="/dashboard/my-ebooks">
  <div className="p-3 rounded-xl hover:bg-indigo-100">
    Purchased Ebooks
  </div>
</Link>

<Link href="/dashboard/bookmarks">
  <div className="p-3 rounded-xl hover:bg-indigo-100">
    Bookmarks
  </div>
</Link>
<Link href="/dashboard/writer">Writer Home</Link>

<Link href="/dashboard/add-ebook">Add Ebook</Link>

<Link href="/dashboard/manage-ebooks">Manage Ebooks</Link>

<Link href="/dashboard/sales-history">Sales History</Link>
<Link href="/dashboard/purchases">
  <div className="p-3 rounded-xl hover:bg-indigo-100">
    Purchase History
  </div>
</Link>
<Link href="/dashboard/admin">Admin Home</Link>

<Link href="/dashboard/manage-users">
  Manage Users
</Link>

<Link href="/dashboard/manage-all-ebooks">
  Manage Ebooks
</Link>

<Link href="/dashboard/transactions">
  Transactions
</Link>

<Link href="/dashboard/analytics">
  Analytics
</Link>

<Link href="/profile">
  Profile
</Link>


      </div>
    </aside>
  );
}