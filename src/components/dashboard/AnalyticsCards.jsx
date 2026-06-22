const cards = [
  {
    title: "Total Users",
    value: "5,230",
  },
  {
    title: "Total Writers",
    value: "420",
  },
  {
    title: "Ebooks Sold",
    value: "12,500",
  },
  {
    title: "Revenue",
    value: "$48,950",
  },
];

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h3 className="text-3xl font-bold text-indigo-600 mt-2">
            {card.value}
          </h3>
        </div>
      ))}

    </div>
  );
}