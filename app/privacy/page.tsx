export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>We may collect the following information:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
              <li>IP address (anonymized)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Improve website functionality</li>
              <li>Analyze traffic patterns</li>
              <li>Prevent fraud and abuse</li>
              <li>Serve relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. You can disable cookies in your
              browser settings, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p>
              We use third-party advertising networks that may collect information about your visits.
              These networks have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement security measures to protect your information, but no method is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Request access to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of data collection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
            <p>
              For privacy concerns, contact:{' '}
              <a href="mailto:privacy@example.com" className="text-pink-500 hover:underline">
                privacy@example.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
