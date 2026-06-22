const writers = [ 1,2,3,4];



export default function TopWriters() {
  return (
    // আপনার আগের bg-indigo-100 কালার একদম ঠিক রাখা হয়েছে
    // mt-20 এবং mb-20 ওপর-নিচে আপনার পছন্দের ফাঁকা জায়গা (Space) তৈরি করবে
    <section className="bg-indigo-100 mt-20 mb-20 w-full flex justify-center py-12">
      
      {/* মোবাইলে w-11/12 এবং বড় স্ক্রিনে w-10/12 রেসপন্সিভ উইডথ */}
      <div className="w-11/12 md:w-10/12 max-w-7xl">

        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Top Writers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* আপনার আসল writers.map কোড */}
          {writers.map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                <img
                  src="https://unsplash.com"
                  alt={`Writer ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-xl font-bold text-black">
                Writer Name
              </h3>
              <p className="text-gray-600 mt-1">120 Books Sold</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
