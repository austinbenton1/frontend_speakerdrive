"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 11, 2025</p>
          
          <h2 className="text-xl font-semibold mb-4">ACCEPTANCE OF TERMS</h2>
          <p className="mb-6">These Terms of Service ("Terms") constitute a legally binding agreement between you and Peak Performance Publishing, LLC ("Company," "we," "us," or "our") regarding your use of the SpeakerDrive platform and service (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>
          
          {/* Add remaining terms sections */}
          <h2 className="text-xl font-semibold mb-4">ELIGIBILITY</h2>
          <p className="mb-6">You must be at least 18 years old and able to form legally binding contracts to use our Service. By using our Service, you represent and warrant that you meet these requirements.</p>

          {/* Continue with remaining sections... */}
          
          <h2 className="text-xl font-semibold mb-4">CONTACT INFORMATION</h2>
          <p>Questions about the Terms should be sent to us at: support@speakerdrive.com</p>
        </div>
      </div>
    </div>
  );
}