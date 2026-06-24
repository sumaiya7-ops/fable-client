const writers = [
  {
    id: 1,
    name: "William Shakespeare",
    books: "4.0B+ Copies Referenced",
    image:
     "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
  },
  {
    id: 2,
    name: "J. K. Rowling",
    books: "600M+ Books Sold",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
  },
  {
    id: 3,
    name: "Agatha Christie",
    books: "2B+ Books Sold",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
  },
  {
    id: 4,
    name: "Stephen King",
    books: "400M+ Books Sold",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
  },
];

export default function TopWriters() {
  return (
    <section className="bg-indigo-100 mt-20 mb-20 w-full flex justify-center py-16">
      <div className="w-11/12 md:w-10/12 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-indigo-600 font-semibold tracking-widest uppercase mb-2">
              🌍 International Best Authors
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Top Writers
            </h2>
          </div>
          

          <p className="text-gray-600 mt-4 md:mt-0 max-w-md">
            Explore the most influential and best-selling writers who shaped
            literature around the world.
          </p>
        </div>
        <div className="h-2"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {writers.map((writer) => (
            <div
              key={writer.id}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={writer.image}
                  alt={writer.name}
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3 className="text-xl font-bold text-gray-900">
                  {writer.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {writer.books}
                </p>

                <button className="mt-5 text-indigo-600 font-semibold hover:text-indigo-800 transition">
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}