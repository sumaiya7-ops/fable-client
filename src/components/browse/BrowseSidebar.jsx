export default function BrowseSidebar() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">

      <h3 className="text-xl font-bold text-black mb-6">
        Filters
      </h3>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Search Ebook..."
          className="w-full border border-gray-300 rounded-xl p-3 text-black"
        />

        <select className="w-full border border-gray-300 rounded-xl p-3 text-black">
          <option>All Genres</option>
          <option>Fiction</option>
          <option>Mystery</option>
          <option>Sci-Fi</option>
          <option>Fantasy</option>
        </select>

        <select className="w-full border border-gray-300 rounded-xl p-3 text-black">
          <option>Sort By</option>
          <option>Newest</option>
          <option>Price Low → High</option>
          <option>Price High → Low</option>
        </select>

      </div>

    </div>
  );
}