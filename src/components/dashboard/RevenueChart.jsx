"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 5500 },
  { name: 'Mar', value: 4800 },
  { name: 'Apr', value: 6500 },
  { name: 'May', value: 5200 },
  { name: 'Jun', value: 8500 },
];

export default function RevenueChart() {
  return (
    <div className="bg-[#121222] border border-gray-800/20 rounded-2xl p-5 shadow-lg h-[340px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-md font-bold text-white">Sales Overview</h2>
        </div>
        <select className="text-xs bg-[#1a1a2e] border border-gray-800 text-gray-400 px-2.5 py-1 rounded-lg outline-none">
          <option>This Month</option>
        </select>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#121222', borderColor: '#1f2937', borderRadius: '8px', color: '#fff' }} />
            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fillOpacity={0.15} fill="#6366f1" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
