import {
  FaBookOpen,
  FaUserSecret,
  FaHeart,
  FaRocket,
  FaDragon,
  FaGhost,
  FaBolt,
  FaLandmark,
} from "react-icons/fa";

const genres = [
  { name: "Fiction", icon: FaBookOpen },
  { name: "Mystery", icon: FaUserSecret },
  { name: "Romance", icon: FaHeart },
  { name: "Sci-Fi", icon: FaRocket },
  { name: "Fantasy", icon: FaDragon },
  { name: "Horror", icon: FaGhost },
  { name: "Thriller", icon: FaBolt },
  { name: "History", icon: FaLandmark },
];

export default function Genres() {
  return (
    // bg-indigo-100 কালার ঠিক রাখা হয়েছে 
    // mt-20 ওপরের সেকশন থেকে এবং mb-20 নিচের সেকশন থেকে চমৎকার গ্যাপ (Space) তৈরি করবে
    <section className="bg-indigo-100 mt-20 mb-20 w-full flex justify-center py-16">
      
      {/* মোবাইলে w-11/12 এবং মাঝারি/বড় স্ক্রিনে w-10/12 রেসপন্সিভ উইডথ */}
      <div className="w-11/12 md:w-10/12 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>

                <span className="inline-block px-4 py-2 rounded-full bg-white text-indigo-600 text-sm font-semibold shadow-sm">
              📚 Browse Categories
            </span>
            <div className="h-2"></div>

            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
              Ebook Genres
            </h2> 
          </div>
         

          <p className="mt-4 md:mt-0 text-gray-600 max-w-md">
            Explore thousands of books across your favorite genres.
          </p>
        </div>
        <div className="h-2"></div>

        {/* Genres Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-6">
          {genres.map((genre, index) => {
            const Icon = genre.icon;

            return (
              <div
                key={genre.name}
                className="group relative overflow-hidden bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-indigo-200 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto">
                  <Icon className="text-2xl text-indigo-600" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 mt-5 text-center font-bold text-gray-900">
                  {genre.name}
                </h3>

                {/* Books Count */}
                <p className="relative z-10 text-center text-sm text-gray-500 mt-2">
                  {500 + index * 200}+ Books
                </p>

                {/* Hover Arrow */}
                <div className="relative z-10 mt-4 text-center  opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="text-indigo-600 font-semibold text-sm">
                    Explore →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
