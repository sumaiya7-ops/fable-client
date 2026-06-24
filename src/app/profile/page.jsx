import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-3xl p-8 shadow-md">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src="https://i.pravatar.cc/300"
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-200"
          />

          <div className="flex-1">

            <h1 className="text-3xl font-bold text-black">
              John Doe
            </h1>

            <p className="text-gray-500 mt-2">
              john@gmail.com
            </p>

            <div className="mt-4 inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full">
              Writer
            </div>

            <div className="mt-6">
              <Link
                href="/edit-profile"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
              >
                Edit Profile
              </Link>
            </div>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h3 className="text-gray-500">Purchased Books</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            32
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h3 className="text-gray-500">Bookmarks</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            15
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h3 className="text-gray-500">Reviews</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            20
          </p>
        </div>

      </div>

    </div>
  );
}