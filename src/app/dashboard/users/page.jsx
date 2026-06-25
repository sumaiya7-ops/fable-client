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
    <div className="min-h-screen bg-[#0b0c16] text-white font-sans selection:bg-purple-600">
      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 space-y-8">
        
        {/* ─── WELCOME & HEADER SECTION ─── */}
        <div className="flex justify-between items-center bg-[#121425] p-6 rounded-2xl border border-gray-800/60">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Welcome back, <span className="text-purple-400">{isLoggedIn ? user.name : "Guest"}</span> 👋
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs md:text-sm text-gray-400">
              <p>Last Login: <span className="text-gray-200">{isLoggedIn ? user.lastLogin : "N/A"}</span></p>
              <p className="hidden sm:block">•</p>
              <p>Member Since: <span className="text-gray-200">{isLoggedIn ? user.memberSince : "N/A"}</span></p>
            </div>
          </div>

          {/* 🔒 আপনার রিকোয়েস্ট অনুযায়ী শর্ত: লগইন থাকলে ইমেজ দেখাবে, না থাকলে একেবারেই দেখাবে না */}
          {isLoggedIn ? (
         <img
  src={user.avatar || "https://i.pravatar.cc/150?img=12"}
  alt={user.name}
  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
/>
          ) : null}
        </div>

        {/* ─── STATS CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-[#121425] p-4 rounded-xl border border-gray-800/80 flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-500 rounded-lg"><ShoppingBag size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "12" : "0"}</p>
              <p className="text-xs text-gray-400">Purchased</p>
            </div>
          </div>

          <div className="bg-[#121425] p-4 rounded-xl border border-gray-800/80 flex items-center space-x-3">
            <div className="p-2.5 bg-purple-600/10 text-purple-500 rounded-xl"><Library size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "8" : "0"}</p>
              <p className="text-xs text-gray-400">In Library</p>
            </div>
          </div>

          <div className="bg-[#121425] p-4 rounded-xl border border-gray-800/80 flex items-center space-x-3">
            <div className="p-2.5 bg-red-600/10 text-red-500 rounded-xl"><Heart size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "2" : "0"}</p>
              <p className="text-xs text-gray-400">Wishlist</p>
            </div>
          </div>

          <div className="bg-[#121425] p-4 rounded-xl border border-gray-800/80 flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600/10 text-emerald-500 rounded-xl"><DollarSign size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "$58.66" : "$0.00"}</p>
              <p className="text-xs text-gray-400">Total Spent</p>
            </div>
          </div>

          <div className="bg-[#121425] p-4 rounded-xl border border-gray-800/80 flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/10 text-indigo-400 rounded-lg"><CheckCircle size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "5" : "0"}</p>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
          </div>

          <div className="bg-[#121425] p-4 rounded-xl border border-gray-800/80 flex items-center space-x-3">
            <div className="p-2.5 bg-orange-600/10 text-orange-500 rounded-xl"><Flame size={20} /></div>
            <div>
              <p className="text-lg font-bold">{isLoggedIn ? "7 Days" : "0"}</p>
              <p className="text-xs text-gray-400">Streak</p>
            </div>
          </div>
        </div>

             {/* ─── মেইন গ্রিড লেআউট (লেফট কলাম এবং রাইট সাইডবার কলাম) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* ========================================================================= */}
          {/* বাম পাশের কলাম (Recently Purchased & Recommended Books)                    */}
          {/* ========================================================================= */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* ─── RECENTLY PURCHASED ─── */}
            <div className="bg-[#121425] p-6 rounded-2xl border border-gray-800/60">
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
                    <div key={idx} className="bg-[#1a1d33] p-4 rounded-xl flex space-x-4 border border-gray-800/40 hover:border-purple-500/30 transition">
                      <img src={book.img} alt={book.title} className="w-16 h-22 object-cover rounded-lg shadow-md" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold line-clamp-1">{book.title}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
                          <p className="text-xs font-bold text-purple-400 mt-1">{book.price}</p>
                        </div>
                        <button className="flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300 font-medium mt-2 transition">
                          <span>Continue Reading</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">Please log in to see your purchased books.</p>
              )}
            </div>

            {/* ─── RECOMMENDED BOOKS ─── */}
            <div className="bg-[#121425] p-6 rounded-2xl border border-gray-800/60">
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
                  <div key={idx} className="bg-[#1a1d33] p-3 rounded-xl flex flex-col justify-between border border-gray-800/40 group hover:border-purple-500/30 transition">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                      <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold line-clamp-1">{book.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{book.author}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold text-purple-400">{book.price}</span>
                        <button className="p-1.5 bg-[#121425] hover:bg-purple-600 rounded-lg text-gray-400 hover:text-white transition shadow">
                          <Heart size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* ডান পাশের সাইডবার কলাম (Reading Progress, Goals & Activities)             */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            
            {/* ─── READING PROGRESS & READING GOAL ─── */}
            <div className="bg-[#121425] p-6 rounded-2xl border border-gray-800/60 space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-4">Reading Progress</h2>
                {isLoggedIn ? (
                  <div className="space-y-4">
                    {[
                      { title: "The Silent Watcher", pct: 50, chapter: "Ch. 12/24", lastRead: "2h ago", timeLeft: "3h left" },
                      { title: "Beyond the Horizon", pct: 25, chapter: "Ch. 4/18", lastRead: "Yesterday", timeLeft: "8h left" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-[#1a1d33] p-3 rounded-xl border border-gray-800/20">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="line-clamp-1 max-w-[150px]">{item.title}</span>
                          <span className="text-purple-400">{item.pct}%</span>
                        </div>
                        <div className="w-full bg-[#121425] h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: `${item.pct}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <span>{item.chapter}</span>
                          <span>{item.timeLeft}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No active reading progress.</p>
                )}
              </div>

              {/* ─── READING GOAL ─── */}
              <div className="pt-4 border-t border-gray-800/80">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Award size={16} className="text-amber-500" />
                    <h3 className="text-sm font-semibold">Monthly Reading Goal</h3>
                  </div>
                  <span className="text-xs text-gray-400">
                    <strong className="text-white">{isLoggedIn ? "3" : "0"}</strong> / {isLoggedIn ? "5" : "0"} Books
                  </span>
                </div>
                <div className="w-full bg-[#1a1d33] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: isLoggedIn ? '60%' : '0%' }}></div>
                </div>
                                <p className="text-[10px] text-gray-400 mt-1.5 text-center">
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

