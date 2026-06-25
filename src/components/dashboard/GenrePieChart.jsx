"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Fantasy', value: 30, color: '#593cfb' },
  { name: 'Mystery', value: 20, color: '#06b6d4' },
  { name: 'Romance', value: 15, color: '#f43f5e' },
  { name: 'Sci-Fi', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 20, color: '#a855f7' },
];

export default function GenrePieChart() {
  return (
    <div className="bg-[#121222] border border-gray-800/20 rounded-2xl p-5 shadow-lg h-[340px] flex flex-col justify-between">
      <h2 className="text-md font-bold text-white">Ebooks by Genre</h2>
      <div className="flex items-center justify-between h-full">
        <div className="w-1/2 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-2 pl-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-400">{item.name}</span>
              </div>
              <span className="font-semibold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
