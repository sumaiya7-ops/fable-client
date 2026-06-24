export default function EditProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-3xl p-8 shadow-md">

        <h1 className="text-3xl font-bold mb-8 text-black">
          Edit Profile
        </h1>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="John Doe"
              className="w-full border p-4 rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              defaultValue="john@gmail.com"
              className="w-full border p-4 rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Photo URL
            </label>

            <input
              type="text"
              placeholder="Paste image url"
              className="w-full border p-4 rounded-xl"
            />
          </div>

          <button
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}