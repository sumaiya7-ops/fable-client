const books =[1, 2, 3, 4, 5, 6];

export default function FeaturedBooks() {
  return (
    // w-full এবং flex justify-center দিয়ে পুরো সেকশনকে মাঝখানে এলাইন করা হয়েছে
    <section className="bg-indigo-100 py-16 md:py-20 w-full flex justify-center">
      
      {/* মোবাইলে w-11/12 এবং মাঝারি/বড় স্ক্রিনে w-10/12 রেসপন্সিভ উইডথ */}
      <div className="w-11/12 md:w-10/12 max-w-7xl">

        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 tracking-tight text-left">
          Featured Ebooks
        </h2>

        {/* রেসপন্সিভ গ্রিড: মোবাইলে ১টি, ট্যাবলেটে ২টি/৩টি এবং ল্যাপটপে ৪টি কার্ড দেখাবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">

          {books.map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col"
            >
              {/* আপনার পাঠানো ব্রিজের ইমেজটি এখানে সেট করা হয়েছে */}
              <div className="w-full h-72 overflow-hidden bg-gray-100">
                <img
                  src="https://ibb.co"
                  alt={`Ebook Cover ${item}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-black text-lg line-clamp-1">
                    Ebook Title {item}
                  </h3>

                  <p className="text-gray-600 mt-1 text-sm">
                    Writer Name
                  </p>
                </div>

                <p className="text-indigo-600 font-bold mt-4 text-base">
                  $4.99
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
