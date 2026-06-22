import Link from "next/link";

export default function EbookCard({ book }) {
  return (
    <Link href={`/ebooks/${book.id}`}>

      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

        <div className="relative">

      <img
  src={book.image}
  alt={book.title}
  className="w-full aspect-[3/4] object-cover"
/>

          {book.sold && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Sold
            </span>
          )}

        </div>

        <div className="p-5">

          <h3 className="font-bold text-black text-lg">
            {book.title}
          </h3>

          <p className="text-gray-600">
            {book.author}
          </p>

          <p className="text-indigo-600 font-bold mt-3">
            ${book.price}
          </p>

        </div>

      </div>

    </Link>
  );
}