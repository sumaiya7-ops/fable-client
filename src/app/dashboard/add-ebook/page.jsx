export default function AddEbookPage() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h1 className="text-3xl font-bold mb-8 text-black">
        Add New Ebook
      </h1>

      <form className="space-y-5">

        <input
          type="text"
          placeholder="Ebook Title"
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          rows="6"
          placeholder="Description"
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-4 rounded-xl"
        />

        <select className="w-full border p-4 rounded-xl">
          <option>Select Genre</option>
          <option>Fiction</option>
          <option>Mystery</option>
          <option>Sci-Fi</option>
        </select>

        <input
          type="file"
          className="w-full border p-4 rounded-xl"
        />

        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl">
          Publish Ebook
        </button>

      </form>

    </div>
  );
}