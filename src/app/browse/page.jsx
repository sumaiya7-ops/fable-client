import BrowseSidebar from "../../components/browse/BrowseSidebar";
import EbookCard from "../../components/browse/EbookCard";

const books = [
  {
    id: 1,
    title: "The Silent Watcher",
    author: "James Rollins",
    price: 4.99,
    sold: true,
    image: "https://picsum.photos/400/500?1",
  },
  {
    id: 2,
    title: "Beyond The Horizon",
    author: "Emily Stone",
    price: 3.99,
    sold: false,
    image: "https://picsum.photos/400/500?2",
  },
  {
    id: 3,
    title: "Midnight Whispers",
    author: "Alex Mercer",
    price: 5.99,
    sold: false,
    image: "https://picsum.photos/400/500?3",
  },
  {
    id: 4,
    title: "Echoes of Tomorrow",
    author: "Sophia",
    price: 2.99,
    sold: true,
    image: "https://picsum.photos/400/500?4",
  },
];

export default function BrowsePage() {
  return (
    <section className="bg-indigo-100 min-h-screen py-20">

      <div className="w-10/12 mx-auto">

        <h1 className="text-4xl font-bold text-black mb-10">
          Browse Ebooks
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-3">
            <BrowseSidebar />
          </div>

          <div className="lg:col-span-9">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {books.map((book) => (
                <EbookCard
                  key={book.id}
                  book={book}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}