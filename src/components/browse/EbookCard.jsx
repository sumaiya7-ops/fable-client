import Link from "next/link";

export default function EbookCard({ book }) {
  const price = Number(book.price) || 0;

  return (
    <Link href={`/ebook/${book._id || book.id}`} className="block h-full">
      <div className="flex h-full flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

        {/* Cover */}
        <div className="relative w-full aspect-[3/4] bg-gray-100">
          <img
            src={book.coverUrl || book.image || "/no-book.png"}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {book.sales > 300 && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              Best Seller
            </span>
          )}

          {book.status === "sold" && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
              Sold
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-bold text-black text-base leading-snug line-clamp-2 min-h-[2.75rem]">
            {book.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
            {book.writerName}
          </p>

          <p className="text-xs text-indigo-600 font-semibold mt-2 line-clamp-1">
            {book.genre}
          </p>

          <p className="text-indigo-600 font-bold mt-auto pt-3">
            ${price.toFixed(2)}
          </p>
        </div>

      </div>
    </Link>
  );
}