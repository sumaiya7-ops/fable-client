export default function ContactPage() {
  return (
    <div className="w-10/12 mx-auto py-20">

      <h1 className="text-5xl font-bold text-indigo-100 mb-10">
        Contact Us
      </h1>

      <div className="glass rounded-3xl p-8">

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl bg-transparent border border-indigo-400/20"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-xl bg-transparent border border-indigo-400/20"
          />

          <textarea
            rows="6"
            placeholder="Message"
            className="w-full p-4 rounded-xl bg-transparent border border-indigo-400/20"
          />

          <button className="bg-indigo-600 px-8 py-4 rounded-xl text-white">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}