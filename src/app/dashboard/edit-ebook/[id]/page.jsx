export default function EditEbookPage() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h1 className="text-3xl font-bold mb-8">
        Edit Ebook
      </h1>

      <form className="space-y-5">

        <input
          defaultValue="Silent Watcher"
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          rows="6"
          defaultValue="Book Description"
          className="w-full border p-4 rounded-xl"
        />

        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl">
          Update Ebook
        </button>

      </form>

    </div>
  );
}