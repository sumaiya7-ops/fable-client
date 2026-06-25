export default function ContactPage() {
  return (
    // px-6 (মোবাইলে), md:px-16 (ট্যাবলেটে) এবং lg:px-24 (ডেস্কটপে) দুই পাশে সুন্দর গ্যাপ তৈরি করবে
    <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-16 lg:px-24">
      
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
        </div>
        <div className="h-2"></div>

        {/* gap-8 বা gap-12 দিয়ে দুই বক্সের মাঝের ফাঁকা জায়গা নিয়ন্ত্রণ করা হয়েছে */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="bg-indigo-50 rounded-3xl shadow-lg p-8 md:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-black">
              Get In Touch
            </h2>

            <p className="text-gray-600 leading-7">
              Our team is always ready to help readers and writers.
              Feel free to contact us anytime.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-black">Email</h3>
                <p className="text-gray-600">sumaiyakookie307@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-black">Phone</h3>
                <p className="text-gray-600">+880 1826459605</p>
              </div>

              <div>
                <h3 className="font-semibold text-black">Address</h3>
                <p className="text-gray-600">Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-indigo-50 rounded-xl shadow-lg p-8 md:p-10">
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 text-black placeholder-gray-400"
              />
              <div className="h-1"></div>

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 text-black placeholder-gray-400"
              />
              <div className="h-1"></div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 text-black placeholder-gray-400"
              />
              <div className="h-1"></div>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full border border-indigo-100 p-4 rounded-sm outline-none focus:border-indigo-200 resize-none text-black placeholder-gray-400"
              />
              <div className="h-1"></div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
