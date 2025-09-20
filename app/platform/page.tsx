export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Special Offer For PLATFORM™ Attendees
          </h1>
          <p className="text-xl text-gray-600">
            ⚡ LIMITED TIME: Conference Exclusive Pricing
          </p>
        </div>

        {/* Offer Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1"></div>
          
          {/* Terms */}
          <div className="p-8 border-b">
            <h2 className="text-2xl font-bold mb-4">📋 Terms</h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>1st month just <strong className="text-3xl text-green-600">$49</strong> <span className="line-through text-gray-400">$99</span> (50% off)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>+25 bonus leads</strong> LIFETIME every month (225 leads total)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Cancel anytime w/1 click in Settings → Billing</span>
              </li>
            </ul>
          </div>

          {/* Redeem */}
          <div className="p-8 border-b bg-blue-50">
            <h2 className="text-2xl font-bold mb-4">🎯 Redeem Here</h2>
            <div className="space-y-4">
              <a 
                href="https://app.speakerdrive.com/settings/promo/1S2a5HCZDBKOhSkngQXZbvTf"
                className="block w-full bg-blue-600 text-white text-center py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Click Here to Activate Offer →
              </a>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Or use coupon code:</p>
                <code className="bg-white px-4 py-2 rounded border-2 border-dashed border-blue-300 text-xl font-mono font-bold">
                  PLATFORM
                </code>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="p-8 bg-green-50">
            <h2 className="text-2xl font-bold mb-4">💰 Quick Math</h2>
            <div className="text-lg">
              <p className="mb-2">ONE $5,000 gig = SpeakerDrive paid for <strong>4+ years</strong></p>
              <p className="text-2xl font-bold text-green-600">$49 due today</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a 
            href="https://app.speakerdrive.com/settings/promo/1S2a5HCZDBKOhSkngQXZbvTf"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Claim Your PLATFORM™ Discount Now
          </a>
          <p className="text-gray-500 mt-4 text-sm">
            This offer expires 24 hours after the conference
          </p>
        </div>
      </div>
    </div>
  );
}