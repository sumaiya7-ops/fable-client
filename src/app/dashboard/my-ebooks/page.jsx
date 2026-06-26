import Link from "next/link";

const books = [
  {
    id: 1,
    title: "The Silent Watcher",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
  },
  {
    id: 2,
    title: "Beyond The Horizon",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
  },
  {
    id: 3,
    title: "Echoes of Tomorrow",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
  },
];
export default function PurchasedBooksPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-black mb-8" style={{ padding: "8px"  }}>
        Purchased Ebooks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" style={{ padding: "8px"  }}>

        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl overflow-hidden shadow-md" style={{ padding: "8px"  }}
          >

            <img
              src={book.image}
              alt={book.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

             {/* 🟢 টাইটেল কেটে লিঙ্কিং কোডটি বসিয়ে দিন */}
<Link href={`/ebook/${book.id}`}>
  <h3 className="font-bold text-black text-lg hover:text-indigo-600 transition cursor-pointer">
    {book.title}
  </h3>
</Link>


              <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-xl" style={{ padding: "4px"  }}>
                Read Now
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}