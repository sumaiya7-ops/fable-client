
import { useParams } from "next/navigation";
import { Star, Heart } from "lucide-react";

export default function EbookDetailsPage() {
    const { id } = useParams();
  const book = realBooksData.find((b) => b.id === Number(id)) || {};

  return (
    <div className="w-10/12 mx-auto py-16">

      {/* Top Section */}

      <div className="grid lg:grid-cols-2 gap-10 items-start pb-20">

        {/* Book Cover */}

        <div>

          <img
           src={book.image || "https://i.postimg.cc/1znS3RDG/book-2.jpg"}
            alt="ebook"
            className="w-full max-w-md rounded-3xl shadow-xl"
          />

        </div>

        {/* Book Info */}

        <div>

          <span className="bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-full text-sm">
           {book.genre || "Fantasy"}
          </span>

          <h1 className="text-5xl font-bold text-indigo-100 mt-5">
            {book.title || "The Silent Watcher"}
          </h1>

          <p className="text-indigo-300 mt-4">
           By {book.writer || "James Rollins"}
          </p>

          {/* Rating */}

          <div className="flex items-center gap-2 mt-6">

            <div className="flex">

              <Star size={18} fill="gold" color="gold" />
              <Star size={18} fill="gold" color="gold" />
              <Star size={18} fill="gold" color="gold" />
              <Star size={18} fill="gold" color="gold" />
              <Star size={18} fill="gold" color="gold" />

            </div>

            <span className="text-indigo-300">
              4.9 (520 Reviews)
            </span>

          </div>

          <h2 className="text-3xl font-bold text-indigo-100 mt-8">
            ${book.price ? book.price.toFixed(2) : "4.99"}
          </h2>

           <p className="text-indigo-300 mt-6 leading-8">
            {book.description || "A gripping adventure filled with mystery, magic, betrayal and unforgettable characters."}
          </p>


          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-10">

            <button className="bg-indigo-500 px-8 py-4 rounded-2xl font-semibold">
              Buy Now
            </button>

            <button className="border border-indigo-500 px-8 py-4 rounded-2xl flex items-center gap-2">
              <Heart size={18} />
              Bookmark
            </button>

          </div>

        </div>

      </div>

      {/* Reviews */}

      <section className="pb-20">

        <h2 className="text-3xl font-bold text-indigo-100 mb-8">
          Reviews
        </h2>

        <div className="space-y-5">

          <div className="glass p-6 rounded-3xl">
            <h3 className="font-semibold text-indigo-100">
              Sarah Johnson
            </h3>

            <p className="text-indigo-300 mt-3">
              Amazing story. Couldn't stop reading.
            </p>
          </div>

          <div className="glass p-6 rounded-3xl">
            <h3 className="font-semibold text-indigo-100">
              Michael Smith
            </h3>

            <p className="text-indigo-300 mt-3">
              One of the best fantasy books I've read.
            </p>
          </div>

        </div>

      </section>

      {/* Related Books */}

      <section>

        <h2 className="text-3xl font-bold text-indigo-100 mb-8">
          Related Books
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {[1,2,3,4,5].map((book) => (

            <div
              key={book}
              className="glass p-4 rounded-3xl"
            >

              <img
                src="https://i.postimg.cc/1znS3RDG/book-2.jpg"
                alt=""
                className="rounded-2xl"
              />

              <h3 className="mt-4 text-indigo-100 font-semibold">
                Fantasy Book
              </h3>

              <p className="text-indigo-300 text-sm">
                $4.99
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}