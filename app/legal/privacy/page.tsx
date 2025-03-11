"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 11, 2025</p>
          
          <h2 className="text-xl font-semibold mb-4">INTRODUCTION</h2>
          <p className="mb-6">Peak Performance Publishing, LLC ("Company," "we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit or use SpeakerDrive (the "Service") and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
          
          {/* Add remaining privacy policy sections */}
          <h2 className="text-xl font-semibold mb-4">INFORMATION WE COLLECT</h2>
          <h3 className="text-lg font-medium mb-3">Information You Provide to Us</h3>
          <p className="mb-4">When you register with, use, or interact with our Service, we may collect several types of information from and about you, including:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Personal identifiers such as your name, email address, postal address, phone number, and professional information</li>
            <li>Account credentials such as your username and password</li>
            <li>Payment and billing information</li>
            <li>Profile information, including your professional background, expertise, and services offered</li>
            <li>Content you upload to the Service, such as portfolios, presentations, or other materials</li>
            <li>Communications between you and other users or our team</li>
          </ul>

          {/* Continue with remaining sections... */}
          
          <h2 className="text-xl font-semibold mb-4">CONTACT INFORMATION</h2>
          <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at: support@speakerdrive.com</p>
        </div>
      </div>
    </div>
  );
}