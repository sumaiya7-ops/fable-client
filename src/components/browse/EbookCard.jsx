import Link from "next/link";

export default function EbookCard({ book, onAddToCart, onToggleWishlist }) {
  const id = book._id || book.id;
  const price = Number(book.price) || 0;
  const rating = Number(book.rating) || 0;
  const isSold = book.status === "sold";
  const href = `/ebook/${id}`;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl">
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full bg-gray-100">
        <Link href={href} className="block h-full w-full">
          <img
            src={book.coverUrl || book.image || "/no-book.png"}
            alt={book.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Link>

        {isSold && (
          <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
            Sold
          </span>
        )}

        {!isSold && book.sales > 300 && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            Best Seller
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => onToggleWishlist?.(book)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow hover:text-red-500"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={href}>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-black">
            {book.title}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-1 text-sm text-gray-600">
          by {book.writerName}
        </p>

        <p className="mt-2 line-clamp-1 text-xs font-semibold uppercase text-indigo-600">
          {book.genre}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-700">
          <span className="text-amber-500">
            {"★".repeat(Math.round(rating))}
            <span className="text-gray-300">
              {"★".repeat(5 - Math.round(rating))}
            </span>
          </span>
          <span>({rating.toFixed(1)})</span>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs text-gray-600">
          {book.description}{" "}
          <Link href={href} className="font-semibold text-indigo-600 hover:underline">
            Read More
          </Link>
        </p>
      </div>

      {/* Footer: price + cart */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
        <span className="text-lg font-bold text-red-600">${price.toFixed(2)}</span>

        {isSold ? (
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-500">
            Sold
          </span>
        ) : (
          <button
            type="button"
            aria-label="Add to cart"
            onClick={() => onAddToCart?.(book)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}