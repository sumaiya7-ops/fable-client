"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // 🛠️ গ্লোবাল ডাটাবেজ সিঙ্কের জন্য এক্সিওস ইমপোর্ট করা হলো
import RevenueChart from "../../../components/dashboard/RevenueChart";
import GenrePieChart from "../../../components/dashboard/GenrePieChart";

import {
  DollarSign,
  ShoppingCart,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function AnalyticsPage() {
  // 🛠️ ডাইনামিক গ্লোবাল প্ল্যাটফর্ম স্টেট আর্কিটেকচার
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    totalUsers: 0,
    totalEbooks: 0
  });
  const [topBooks, setTopBooks] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // ⚙️ MongoDB Atlas থেকে প্ল্যাটফর্মের রিয়েল-টাইম অ্যানালিটিক্স ডেটা টেনে আনার ইঞ্জিন
  useEffect(() => {
    const fetchGlobalAnalytics = async () => {
      try {
        setLoading(true);
        
        // ১. ট্রানজেকশন ডেটা ফেচিং
            const token = localStorage.getItem("fable_token");

const ordersRes = await axios.get(
  "https://fable-server-z2xt.onrender.com/orders",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        const orders = ordersRes.data || [];
        
        const salesCount = orders.length;
        const revenueSum = orders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);

        // ২. ইউজার এবং ইবুক গ্লোবাল কাউন্টার ফেচিং
        const ebooksRes = await axios.get("https://fable-server-z2xt.onrender.com/ebooks");
        const ebooksList = ebooksRes.data.ebooks || ebooksRes.data || [];
        const usersCountRes = await axios.get(
  "https://fable-server-z2xt.onrender.com/users-count",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        // 👥 🛠️ নতুন ফিক্সড কোড: ডাটাবেজ থেকে আসল ইউজার রেজিস্ট্রেড কাউন্ট এন্ডপয়েন্ট টেনে আনা

        const realUsersCount = usersCountRes.data.totalUsers || 0;

        // টপ সেলিং বইয়ের স্ট্যাটিক টু ডাইনামিক ফলব্যাক ম্যাপিং লজিক
        const mappedTopBooks = [...ebooksList]
.sort((a, b) => (b.sales || 0) - (a.sales || 0))
.slice(0, 4)
.map((b, i) => ({
    id: b._id || i,
    title: b.title,
    sales: b.sales || 0
}));
        setTopBooks(mappedTopBooks);

        // রিয়েল-টাইম ট্রানজেকশন অ্যাক্টিভিটি লগ জেনারেটর
        const dynamicActivities = orders.slice(0, 4).map(order => 
          `Reader ${order.buyerEmail || 'Anonymous'} purchased '${order.bookTitle || 'Premium Book'}'`
        );
        
        // যদি ডাটাবেজে কোনো অর্ডার না থাকে তবে সেফ ব্যাকআপ লগ
        if (dynamicActivities.length === 0) {
          dynamicActivities.push(
            "Platform initialized successfully.",
            "Database gateway monitoring active.",
            "Awaiting user premium subscriptions."
          );
        }
        setRecentActivities(dynamicActivities);

        // ৩. সমস্ত লাইভ ডেটা একসাথে কাউন্টারে লক করা
        setStats({
          totalRevenue: revenueSum,
          totalSales: salesCount || 0, // রিয়াল সেলস কাউন্ট ট্র্যাকার
          totalUsers: realUsersCount,  // 🟢 ডামি ২৪৫০ উধাও করে আসল MongoDB ইউজার কাউন্ট সেট করা হলো
          totalEbooks: ebooksList.length
        });

      } catch (err) {
        console.error("Global analytics server synchronization failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalAnalytics();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-indigo-600">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-indigo-50 text-[#94a3b8] p-4 md:p-8 space-y-8 font-sans" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 tracking-wide">
          Analytics Overview
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Monitor platform performance and growth.
        </p>
      </div>
      <div className="h-1"></div>

      {/* Stats Cards — ডাটাবেজ লাইভ কাউন্টার প্যানেল */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Revenue */}
        <div className="bg-white border border-[#7889f4] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <DollarSign className="text-emerald-600" size={26} />
            <TrendingUp className="text-emerald-600" size={18} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        {/* Total Sales */}
        <div className="bg-white border border-[#7080e8] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <ShoppingCart className="text-indigo-700" size={26} />
            <TrendingUp className="text-emerald-600" size={18} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Sales</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">{stats.totalSales}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white border border-[#7483e4] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <Users className="text-purple-700" size={26} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">{stats.totalUsers}</p>
        </div>

        {/* Total Ebooks */}
        <div className="bg-white border border-[#6879e7] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center justify-between">
            <BookOpen className="text-pink-700" size={26} />
          </div>
          <h3 className="text-gray-700 mt-4 text-sm font-medium">Total Ebooks</h3>
          <p className="text-3xl font-bold text-red-500 mt-1">{stats.totalEbooks}</p>
        </div>

      </div>
      
      <div className="h-2"></div>

      {/* Charts (গ্রোথ বক্স উইজেট) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* মান্থলি সেলস রেভিনিউ চার্ট */}
        <div className="xl:col-span-2 bg-white border border-[#6876d0] rounded-2xl p-6 shadow-2xl overflow-hidden">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Monthly Sales Chart</h2>
          <div className="w-full">
            <RevenueChart />
          </div>
        </div>

        {/* জঁনরা পাই চার্ট */}
        <div className="bg-white border border-[#6370c7] rounded-2xl p-6 shadow-2xl overflow-hidden">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Genre Distribution</h2>
          <div className="w-full flex justify-center">
            <GenrePieChart />
          </div>
        </div>

      </div>
      
      <div className="h-1"></div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Top Selling Books */}
        <div className="bg-white border border-[#5e70e4] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <h2 className="font-semibold text-lg text-gray-950 mb-6">
            Top Selling Books
          </h2>
          <div className="space-y-4">
            {topBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="font-medium text-gray-600 text-sm truncate max-w-[200px]" title={book.title}>
                  {book.title}
                </span>
                <span className="bg-indigo-300 text-black font-semibold text-sm px-3 py-1 rounded-md border border-[#7a6ae0]">
                  {book.sales} Sales
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-[#6e7cd6] rounded-2xl p-6 shadow-2xl" style={{ padding: "8px"  }}>
          <div className="flex items-center gap-2 mb-6 text-purple-700">
            <Activity size={20} />
            <h2 className="font-semibold text-lg text-gray-900">
              Recent Activities
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 pl-4 py-2.5 rounded-r-lg text-gray-700 text-sm border-t border-b border-r border-gray-100 bg-gray-50/50"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
