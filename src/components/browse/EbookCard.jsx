import Link from "next/link";

export default function EbookCard({ book }) {

  
  return (
      
   <Link href={`/ebook/${book._id || book.id}`}>

      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

        <div className="relative">

      <img
  src={book.coverUrl || book.image || "/no-book.png"}
  alt={book.title}
  className="w-full aspect-[3/4] object-cover"
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

        <div className="p-5">

          <h3 className="font-bold text-black text-lg">
            {book.title}
          </h3>

   <p className="text-gray-600 hover:text-indigo-600">
      {book.writerName}
   </p>

          <p className="text-xs text-indigo-600 font-semibold mt-2">
   {book.genre}
</p>

          <p className="text-indigo-600 font-bold mt-3">
           ${parseFloat(book.price || 0).toFixed(2)}
          </p>

        </div>

      </div>

    </Link>
  );
}