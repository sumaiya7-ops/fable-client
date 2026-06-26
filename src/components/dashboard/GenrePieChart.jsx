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
    /* ড্যাশবোর্ডের বক্সের সাথে ফিট করার জন্য কার্ডের এক্সট্রা ব্যাকগ্রাউন্ড, বর্ডার ও ডাবল হেডার সরিয়ে উইডথ ১০০% করা হলো */
    <div className="w-full flex items-center bg-indigo-50 justify-between h-[200px]" style={{ padding: "8px"  }}>
      
      {/* বাম পাশে গোল পাই চার্ট */}
      <div className="w-1/2 h-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ডান পাশে সুন্দর সমান্তরাল টেক্সট লিস্ট (লেজেন্ড) */}
      <div className="w-1/2 space-y-2.5 pl-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="text-gray-700">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
  );
}
