import React from 'react';
import { 
  ShoppingBag, 
  Library, 
  Heart, 
  DollarSign, 
  CheckCircle, 
  Flame, 
  Compass, 
   Award,
    Clock,
  User 
} from 'lucide-react';

export default function UserDashboardPage() {
  // 🟢 রিয়েল লগইন লজিক স্টেট 
  // ইউজার লগইন থাকলে true করুন, লগআউট থাকলে false করুন
  const isLoggedIn = true; 
  
  const user = {
    name: "John Doe",
     avatar: null,
    lastLogin: "Today, 10:45 AM",
    memberSince: "Jan 2024"
  };

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900 font-sans selection:bg-purple-600" style={{ paddingLeft: "8px" , paddingRight:"8px" }}>
      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 space-y-8"  style={{ paddin: "8px" }}>
        
        {/* ─── WELCOME & HEADER SECTION ─── */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-indigo-200"  style={{ padding: "8px" }}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Welcome back, <span className="text-purple-800">{isLoggedIn ? user.name : "Guest"}</span> 👋
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs md:text-sm text-gray-800">
              <p>Last Login: <span className="text-gray-400">{isLoggedIn ? user.lastLogin : "N/A"}</span></p>
              <p className="hidden sm:block">•</p>
              <p>Member Since: <span className="text-gray-400">{isLoggedIn ? user.memberSince : "N/A"}</span></p>
            </div>
          </div>

          {/* 🔒 আপনার রিকোয়েস্ট অনুযায়ী শর্ত: লগইন থাকলে ইমেজ দেখাবে, না থাকলে একেবারেই দেখাবে না */}
          {isLoggedIn ? (
         <img
  src={user.avatar || "https://i.pravatar.cc/150?img=12"}
  alt={user.name}
  className="w-12 h-12 rounded-full object-cover border-2 border-purple-700"
/>
          ) : null}
        </div>
        <div className='h-2'></div>

        {/* ─── STATS CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border gap-4 border-indigo-500 flex items-center space-x-3"  style={{ padding: "6px" }}>
            <div className="p-2.5 bg-blue-20000 text-blue-700 rounded-lg"><ShoppingBag size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "12" : "0"}</p>
              <p className="text-xs text-gray-600">Purchased</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border gap-4 border-indigo-500 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-purple-200 text-purple-700 rounded-xl"><Library size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "8" : "0"}</p>
              <p className="text-xs text-gray-600">In Library</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-red-100 text-red-700 rounded-xl"><Heart size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "2" : "0"}</p>
              <p className="text-xs text-gray-600">Wishlist</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-emerald-600/10 text-emerald-700 rounded-xl"><DollarSign size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "$58.66" : "$0.00"}</p>
              <p className="text-xs text-gray-600">Total Spent</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-indigo-600/10 text-indigo-700 rounded-lg"><CheckCircle size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "5" : "0"}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-500 gap-4 flex items-center space-x-3" style={{ padding: "6px" }}>
            <div className="p-2.5 bg-orange-600/10 text-orange-700 rounded-xl"><Flame size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "7 Days" : "0"}</p>
              <p className="text-xs text-gray-600">Streak</p>
            </div>
          </div>
        </div>
        <div className='h-2'></div>

             {/* ─── মেইন গ্রিড লেআউট (লেফট কলাম এবং রাইট সাইডবার কলাম) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* ========================================================================= */}
          {/* বাম পাশের কলাম (Recently Purchased & Recommended Books)                    */}
          {/* ========================================================================= */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* ─── RECENTLY PURCHASED ─── */}
            <div className="bg-white p-6 rounded-xl border border-indigo-700" style={{ padding: "6px" }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recently Purchased</h2>
                <a href="#" className="text-xs text-purple-400 hover:underline">View all</a>
              </div>
              
              {isLoggedIn ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
  title: "The Silent Watcher",
  author: "John Grisham",
  price: "$4.99",
  img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80"
},
{
  title: "Beyond the Horizon",
  author: "Sarah J. Maas",
  price: "$5.49",
  img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80"
}
                  ].map((book, idx) => (
                    <div key={idx} className="bg-indigo-50 p-4 rounded-xl flex space-x-4 border border-indigo-500 gap-2 hover:border-purple-500/30 transition" style={{ padding: "6px" }}>
                      <img src={book.img} alt={book.title} className="w-16 h-22 object-cover rounded-lg shadow-md" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold line-clamp-1">{book.title}</h4>
                          <p className="text-xs text-gray-600 mt-0.5">{book.author}</p>
                          <p className="text-xs font-bold text-red-500 mt-1">{book.price}</p>
                        </div>
                        <button className="flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800 font-medium mt-2 transition">
                          <span>Continue Reading</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-700 text-center py-6">Please log in to see your purchased books.</p>
              )}
            </div>
            <div className='h-2'></div>

            {/* ─── RECOMMENDED BOOKS ─── */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-500" style={{ padding: "6px" }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recommended for You</h2>
                <a href="#" className="text-xs text-purple-400 hover:underline">Explore</a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                 {
  title: "Midnight Whispers",
  author: "Stephen King",
  price: "$3.99",
  img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80"
},
{
  title: "Crystal Horizons",
  author: "Brandon Sanderson",
  price: "$3.49",
  img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80"
},
{
  title: "Echoes of Time",
  author: "Rebecca Yarros",
  price: "$4.20",
  img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&q=80"
}
                ].map((book, idx) => (
                  <div key={idx} className="bg-indigo-50 p-3 rounded-xl flex flex-col justify-between border border-indigo-800 group hover:border-purple-500/30 transition" style={{ padding: "4px" }}>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                      <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold line-clamp-1">{book.title}</h4>
                      <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">{book.author}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold text-red-600">{book.price}</span>
                        <button className="p-1.5 text-red-700  hover:bg-red-600 rounded-lg text-gray-400 hover:text-white transition shadow">
                          <Heart size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

         
          <div className="space-y-6">
            
            {/* ─── READING PROGRESS & READING GOAL ─── */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-400 space-y-6" style={{ padding: "6px" }}>
              <div>
                <h2 className="text-lg font-bold mb-4">Reading Progress</h2>
                {isLoggedIn ? (
                  <div className="space-y-4 " >
                    {[
                      { title: "The Silent Watcher", pct: 50, chapter: "Ch. 12/24", lastRead: "2h ago", timeLeft: "3h left" },
                      { title: "Beyond the Horizon", pct: 25, chapter: "Ch. 4/18", lastRead: "Yesterday", timeLeft: "8h left" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl   border border-gray-800/20" style={{ padding: "6px" }}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="line-clamp-1 max-w-[150px]">{item.title}</span>
                          <span className="text-red-600">{item.pct}%</span>
                        </div>
                        <div className='h-1'></div>
                        <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-purple-700 h-full rounded-full" style={{ width: `${item.pct}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-700">
                          <span>{item.chapter}</span>
                          <span>{item.timeLeft}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 text-center py-4">No active reading progress.</p>
                )}
              </div>
          <div className='h-1'></div>
              {/* ─── READING GOAL ─── */}
              <div className="pt-4 border-t border-gray-800/20">
              <div className='h-1'></div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-1.5" style={{ paddingBottom: "6px" }}>
                    <Award size={16} className="text-amber-600" />
                    <h3 className="text-sm font-semibold">Monthly Reading Goal</h3>
                  </div>
                  <span className="text-xs text-gray-600">
                    <strong className="text-red-500">{isLoggedIn ? "3" : "0"}</strong> / {isLoggedIn ? "5" : "0"} Books
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div className=" bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: isLoggedIn ? '60%' : '0%' }}></div>
                </div>
                                <p className="text-[10px] text-gray-600 mt-1.5 text-center" style={{ paddingTop: "6px" }}>
                  {isLoggedIn ? "60% Completed. Keep it up!" : "Log in to set your reading goals."}
                </p>
              </div> 
            </div>
          </div> 
        </div> 
      </main> 
    </div> 
  );
}

