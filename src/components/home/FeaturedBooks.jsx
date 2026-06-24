// ১. একদম প্রথম লাইনে এই লেখাটি যোগ করুন (এর উপরে কোনো কমেন্ট বা স্পেস রাখবেন না)
"use client"; 

import { useState } from "react";

// ৬টি বইয়ের রিয়েল ডেটা অবজেক্ট
const booksData = [
  {
    id: 1,
    title: "Thinking, Fast and Slow",
    writer: "Daniel Kahneman",
    price: "$14.99",
    image: "https://i.postimg.cc/cJQpyMpp/book-1.jpg",
    description: "Explores the two systems that drive the way we think—System 1 is fast and intuitive; System 2 is slow and deliberate. It reveals where we can trust our intuitions and how we can tap into the benefits of slow thinking."
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    writer: "Yuval Noah Harari",
    price: "$16.99",
    image: "https://i.postimg.cc/0jNFSgb3/book-2.jpg",
    description: "Drives into the history of humanity, from the evolution of archaic human species in the Stone Age up to the twenty-first century. It integrates history and science to reconsider accepted narratives."
  },
  {
    id: 3,
    title: "Atomic Habits",
    writer: "James Clear",
    price: "$11.99",
    image: "https://i.postimg.cc/DyHHSMFH/book-3.jpg",
    description: "An easy and proven way to build good habits and break bad ones. It focuses on the science of small, incremental changes that lead to significant personal growth and long-term behavioral changes."
  },
  {
    id: 4,
    title: "A Brief History of Time",
    writer: "Stephen Hawking",
    price: "$12.50",
    image: "https://i.postimg.cc/6qSjG8s9/book-4.jpg",
    description: "Explares the fundamental questions about the universe: How did it begin? Does time always flow forward? Is it unending? Written in a language everyone can understand, plunging into black holes and quarks."
  },
  {
    id: 5,
    title: "The Selfish Gene",
    writer: "Richard Dawkins",
    price: "$13.99",
    image: "https://i.postimg.cc/MGxsRkLh/book-5.jpg",
    description: "A classic work on evolutionary biology that introduces the gene-centric view of evolution. It argues that genes are the primary units of selection, driving the survival of living organisms."
  },
  {
    id: 6,
    title: "Deep Work",
    writer: "Cal Newport",
    price: "$15.00",
    image: "https://i.postimg.cc/bJVLKZwF/book-6.jpg",
    description: "Rules for focused success in a distracted world. It explains how mastering the ability to focus without distraction allows you to quickly master complicated information and produce better results."
  }
];

export default function FeaturedBooks() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section className="bg-indigo-100 py-16 md:py-20 w-full flex justify-center">
      <div className="w-11/12 md:w-10/12 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 tracking-tight text-left">
          Featured Ebooks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {booksData.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col"
              >
                <div className="w-full h-72 overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={`Ebook Cover - ${item.title}`} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-black text-lg line-clamp-1" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-red-500 mt-1 text-sm font-medium">
                      By {item.writer}
                    </p>
                    
                    <p className="text-gray-600 mt-3 text-sm">
                      {isExpanded ? item.description : `${item.description.slice(0, 40)}...`}
                      <button
                        onClick={() => toggleDescription(item.id)}
                        className="text-indigo-600 font-semibold ml-1 hover:underline text-xs inline-block focus:outline-none"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    </p>
                  </div>

                  <p className="text-indigo-600 font-bold mt-5 text-base">
                    {item.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
