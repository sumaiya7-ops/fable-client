const genres = [
  "Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Thriller",
  "History",
];

export default function Genres() {
  return (
    // bg-indigo-100 কালার ঠিক রাখা হয়েছে 
    // mt-20 ওপরের সেকশন থেকে এবং mb-20 নিচের সেকশন থেকে চমৎকার গ্যাপ (Space) তৈরি করবে
    <section className="bg-indigo-100 mt-20 mb-20 w-full flex justify-center py-16">
      
      {/* মোবাইলে w-11/12 এবং মাঝারি/বড় স্ক্রিনে w-10/12 রেসপন্সিভ উইডথ */}
      <div className="w-11/12 md:w-10/12 max-w-7xl">

        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-left">
          Ebook Genres
        </h2>

        {/* রেসপন্সিভ গ্রিড: মোবাইলে ২টি, ট্যাবলেটে ৪টি এবং বড় স্ক্রিনে ৮টি কলাম পাশাপাশি বসবে */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-5">

          {genres.map((genre) => (
            <div
              key={genre}
              className="bg-white rounded-2xl py-5 text-center font-semibold text-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-200"
            >
              {genre}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
