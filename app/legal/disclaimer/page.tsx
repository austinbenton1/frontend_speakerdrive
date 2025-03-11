"use client";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 11, 2025</p>
          
          <h2 className="text-xl font-semibold mb-4">GENERAL DISCLAIMER</h2>
          <p className="mb-6">The information contained on the SpeakerDrive platform ("Service") is for general information purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Service or the information, products, services, or related graphics contained on the Service for any purpose.</p>
          
          {/* Add remaining disclaimer sections */}
          <h2 className="text-xl font-semibold mb-4">NO GUARANTEES</h2>
          <p className="mb-6">SpeakerDrive does not guarantee that speakers will secure engagements or that event planners will find suitable speakers through our Service. Success in using our platform depends on many factors, including but not limited to individual qualifications, market conditions, and specific client needs.</p>

          {/* Continue with remaining sections... */}
          
          <h2 className="text-xl font-semibold mb-4">CONTACT INFORMATION</h2>
          <p>If you have any questions about this Disclaimer, please contact us at: support@speakerdrive.com</p>
        </div>
      </div>
    </div>
  );
}