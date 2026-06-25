const ebooks = [
  { title: "The Silent Watcher", price: "$245.00", sales: "High Profit" },
  { title: "Midnight Whispers", price: "$185.40", sales: "Popular" },
  { title: "Beyond the Horizon", price: "$156.80", sales: "Trending" },
];

export default function TopSellingEbooks() {
  return (
    <div className="bg-[#121222] border border-gray-800/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between h-full min-h-[190px]">
      <h2 className="text-md font-bold text-white mb-3">Top Selling Ebooks</h2>
      <div className="space-y-3">
        {ebooks.map((book, i) => (
          <div key={i} className="flex items-center justify-between text-xs border-b border-gray-800/20 pb-2 last:border-0 last:pb-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center text-sm">📖</div>
              <div>
                <p className="font-medium text-white">{book.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{book.sales}</p>
              </div>
            </div>
            <span className="font-bold text-purple-400">{book.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
