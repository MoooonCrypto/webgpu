export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">General Inquiries</h3>
                <a href="mailto:contact@example.com" className="text-pink-500 hover:underline">
                  contact@example.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">DMCA / Removal Requests</h3>
                <a href="mailto:dmca@example.com" className="text-pink-500 hover:underline">
                  dmca@example.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Advertising</h3>
                <a href="mailto:advertising@example.com" className="text-pink-500 hover:underline">
                  advertising@example.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-pink-500 focus:outline-none h-32"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
