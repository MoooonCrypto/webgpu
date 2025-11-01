export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Age Requirement</h2>
            <p>
              This website is intended for adults only. By accessing this site, you confirm that you are
              at least 18 years of age or the age of majority in your jurisdiction.
            </p>
            <p className="mt-2 text-red-400 font-semibold">
              ⚠️ WARNING: This website contains adult content. If you are under 18, please leave immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Content</h2>
            <p>
              All content on this website features models who are 18 years or older.
              All content is legally obtained and distributed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Acceptable Use</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You may view content for personal use only</li>
              <li>You may not download, reproduce, or redistribute content without permission</li>
              <li>You may not use automated tools to scrape or download content</li>
              <li>You may not attempt to bypass any access controls</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Copyright</h2>
            <p>
              All content is protected by copyright. Unauthorized use, reproduction, or distribution
              may result in legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimer</h2>
            <p>
              This website is provided "as is" without warranties of any kind. We are not responsible
              for any damages arising from your use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the website
              constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p>
              For questions about these terms, contact us at:{' '}
              <a href="mailto:contact@example.com" className="text-pink-500 hover:underline">
                contact@example.com
              </a>
            </p>
          </section>

          <div className="bg-yellow-900/30 border border-yellow-700 p-6 rounded-lg mt-8">
            <p className="font-semibold">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
