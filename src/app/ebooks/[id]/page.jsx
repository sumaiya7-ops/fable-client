import { Bookmark, ShoppingCart } from "lucide-react";

export default function EbookDetailsPage() {
  const ebook = {
    id: 1,
    title: "The Silent Watcher",
    writer: "James Rollins",
    genre: "Mystery",
    price: 4.99,
    status: "Available",
    uploaded: "12 June 2025",
    image: "https://picsum.photos/600/800",
    description:
      "A gripping mystery novel filled with suspense, hidden truths, and unforgettable characters. Discover the secrets behind the silent watcher.",
  };

  return (
    <section className="bg-indigo-100 min-h-screen py-16">

      <div className="w-10/12 mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Side */}
          <div>
            <img
              src={ebook.image}
              alt={ebook.title}
              className="w-full max-w-md mx-auto rounded-3xl shadow-xl"
            />
          </div>

          {/* Right Side */}
          <div>

            <span className="inline-block px-4 py-2 bg-indigo-200 text-indigo-700 rounded-full text-sm font-medium mb-4">
              {ebook.genre}
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              {ebook.title}
            </h1>

            <p className="text-lg text-gray-700 mb-2">
              By{" "}
              <span className="font-semibold text-indigo-600">
                {ebook.writer}
              </span>
            </p>

            <p className="text-gray-600 mb-6">
              Uploaded: {ebook.uploaded}
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              {ebook.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-indigo-700">
                ${ebook.price}
              </h3>
            </div>

            {/* Status */}
            <div className="mb-8">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                {ebook.status}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition">
                <ShoppingCart size={20} />
                Buy Now
              </button>

              <button className="flex items-center gap-2 border border-indigo-300 text-indigo-700 px-8 py-4 rounded-xl hover:bg-indigo-50 transition">
                <Bookmark size={20} />
                Bookmark
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}