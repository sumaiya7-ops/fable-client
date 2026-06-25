export default function AboutPage() {
  return (
     <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center py-10 md:py-24 px-6 md:px-16 lg:px-24">
      
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 mb-4">
          About Fable
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-8">
          Fable is a modern digital ebook platform designed to connect
          passionate readers with talented writers from around the world.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-indigo-50 rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-700 leading-8">
            Our mission is to empower writers by providing a platform
            where they can publish, manage, and sell their ebooks while
            helping readers discover high-quality digital content.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            What We Offer
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>📚 Thousands of quality ebooks</li>
            <li>✍️ Easy publishing tools for writers</li>
            <li>💳 Secure ebook purchasing system</li>
            <li>⭐ Personalized reading experience</li>
            <li>📈 Analytics and earnings tracking for authors</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black mb-4">
            Our Vision
          </h2>

          <p className="text-gray-600 leading-8">
            We envision a world where every talented writer can reach
            global audiences and every reader can access inspiring
            stories anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
