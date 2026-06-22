const books = [
  {
    id: 1,
    title: "The Silent Watcher",
    image: "https://picsum.photos/400/500?11",
  },
  {
    id: 2,
    title: "Beyond The Horizon",
    image: "https://picsum.photos/400/500?12",
  },
  {
    id: 3,
    title: "Echoes of Tomorrow",
    image: "https://picsum.photos/400/500?13",
  },
];

export default function PurchasedBooksPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-black mb-8">
        Purchased Ebooks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-3xl overflow-hidden shadow-md"
          >

            <img
              src={book.image}
              alt={book.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

              <h3 className="font-bold text-black text-lg">
                {book.title}
              </h3>

              <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-xl">
                Read Now
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}