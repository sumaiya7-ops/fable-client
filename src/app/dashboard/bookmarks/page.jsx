const bookmarks = [
  {
    id: 1,
    title: "Midnight Whispers",
    image: "https://picsum.photos/400/500?21",
    price: "$3.99",
  },
  {
    id: 2,
    title: "Rise Of Phoenix",
    image: "https://picsum.photos/400/500?22",
    price: "$4.99",
  },
];

export default function BookmarksPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-black mb-8">
        My Bookmarks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {bookmarks.map((book) => (
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

              <h3 className="font-bold text-black">
                {book.title}
              </h3>

              <p className="text-indigo-600 font-semibold mt-2">
                {book.price}
              </p>

              <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-xl">
                Purchase
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}