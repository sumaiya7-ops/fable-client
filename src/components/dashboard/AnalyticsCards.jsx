const cards = [
  { title: "Total users", value: "1,245", icon: "👤", bg: "bg-[#2b1b4d] text-purple-400" },
  { title: "Total Writers", value: "236", icon: "✍️", bg: "bg-[#182d34] text-teal-400" },
  { title: "Ebooks", value: "1,856", icon: "📘", bg: "bg-[#332a1b] text-amber-400" },
  { title: "Total Revenue", value: "$12,560", icon: "💰", bg: "bg-[#16302b] text-emerald-400" },
];

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-[#121222] border border-gray-800/20 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-xl text-xl ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">{card.value}</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{card.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
