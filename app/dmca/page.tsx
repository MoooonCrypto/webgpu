export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">DMCA / Removal Request</h1>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Content Removal</h2>
          <p className="mb-4">
            If you believe that content on this website infringes your copyright or other rights,
            please contact us immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
          <p className="mb-4">
            Email: <a href="mailto:dmca@example.com" className="text-pink-500 hover:underline">
              dmca@example.com
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Required Information</h2>
          <p className="mb-4">Please include the following in your request:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>URL of the infringing content</li>
            <li>Description of the copyrighted work</li>
            <li>Your contact information</li>
            <li>Statement of good faith belief</li>
            <li>Statement of accuracy</li>
            <li>Physical or electronic signature</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Response Time</h2>
          <p className="mb-4">
            We will respond to all valid removal requests within 24-48 hours.
          </p>

          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Quick Removal Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">Your Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block mb-2">Content URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block mb-2">Reason</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-pink-500 focus:outline-none h-32"
                  placeholder="Describe the issue..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-pearl0 hover:bg-black px-6 py-3 rounded font-semibold transition"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
