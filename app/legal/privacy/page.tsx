"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none">
          {/* Last Updated Date */}
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 28, 2025</p>

          {/* INTRODUCTION */}
          <h2 className="text-xl font-semibold mb-4">INTRODUCTION</h2>
          <p className="mb-6">
            Peak Performance Publishing, LLC ("Company," "we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit or use SpeakerDrive (the "Service") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>

          {/* INFORMATION WE COLLECT */}
          <h2 className="text-xl font-semibold mb-4">INFORMATION WE COLLECT</h2>

          <h3 className="text-lg font-medium mb-2">Information You Provide to Us</h3>
          <p className="mb-6">
            When you register with, use, or interact with our Service, we may collect several types of information from and about you, including:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Personal identifiers such as your name, email address, postal address, phone number, and professional information</li>
            <li>Account credentials such as your username and password</li>
            <li>Payment and billing information</li>
            <li>Profile information, including your professional background, expertise, and services offered</li>
            <li>Content you upload to the Service, such as portfolios, presentations, or other materials</li>
            <li>Communications between you and other users or our team</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Information Collected Through Automated Technologies</h3>
          <p className="mb-6">
            When you use our Service, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns, including:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Details of your visits to our Service, including traffic data, location data, logs, and other communication data</li>
            <li>Information about your computer and internet connection, including your IP address, operating system, and browser type</li>
            <li>Information about your device and internet connection, including the device type, device identifier, and mobile network information</li>
          </ul>

          {/* COOKIES AND TRACKING TECHNOLOGIES */}
          <h2 className="text-xl font-semibold mb-4">COOKIES AND TRACKING TECHNOLOGIES</h2>

          <h3 className="text-lg font-medium mb-2">What Are Cookies</h3>
          <p className="mb-6">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
          </p>

          <h3 className="text-lg font-medium mb-2">How We Use Cookies</h3>

          <p className="mb-2"><strong>Essential Cookies (Required)</strong></p>
          <p className="mb-2">These cookies are necessary for the website to function properly:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Authentication cookies to keep you logged in</li>
            <li>Security cookies to protect against fraud</li>
            <li>Session cookies to maintain your preferences during your visit</li>
            <li>Load balancing cookies to ensure optimal performance</li>
          </ul>

          <p className="mb-2"><strong>Analytics Cookies (Optional)</strong></p>
          <p className="mb-2">We use these cookies to understand how visitors interact with our website:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Google Analytics to track website usage and performance</li>
            <li>Heatmap tools to understand user behavior</li>
            <li>Error tracking to identify and fix technical issues</li>
          </ul>

          <p className="mb-2"><strong>Functional Cookies (Optional)</strong></p>
          <p className="mb-2">These cookies enhance your experience:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Preference cookies to remember your settings</li>
            <li>Feature usage tracking to improve our service</li>
            <li>Integration cookies for third-party services (Google, etc.)</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Third-Party Cookies</h3>
          <p className="mb-2">We may use third-party services that set their own cookies:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Google Analytics</strong> - Web analytics service</li>
            <li><strong>Google APIs</strong> - For Gmail and Calendar integration</li>
            <li><strong>Payment Processors</strong> - For secure payment processing</li>
            <li><strong>Customer Support Tools</strong> - For help desk functionality</li>
          </ul>
          <p className="mb-6">These third parties have their own privacy policies governing their use of cookies.</p>

          <h3 className="text-lg font-medium mb-2">Managing Your Cookie Preferences</h3>

          <p className="mb-2"><strong>Browser Settings</strong></p>
          <p className="mb-2">You can control cookies through your browser settings:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
            <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
            <li><strong>Edge:</strong> Settings &gt; Cookies and Site Permissions</li>
          </ul>

          <p className="mb-2"><strong>Opt-Out Tools</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Google Analytics Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 underline">Google Analytics Opt-out Browser Add-on</a></li>
            <li>Digital Advertising Alliance: <a href="http://www.aboutads.info/choices/" className="text-blue-600 underline">Your Ad Choices</a></li>
          </ul>

          <p className="mb-2"><strong>Impact of Disabling Cookies</strong></p>
          <p className="mb-2">Disabling certain cookies may affect your experience:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Essential cookies: Website may not function properly</li>
            <li>Analytics cookies: We won&apos;t be able to improve our service based on usage data</li>
            <li>Functional cookies: Some features may not work as expected</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Cookie Retention</h3>
          <p className="mb-2">Different cookies have different retention periods:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Authentication cookies:</strong> Up to 30 days</li>
            <li><strong>Analytics cookies:</strong> Up to 26 months (Google Analytics default)</li>
            <li><strong>Preference cookies:</strong> Up to 1 year</li>
          </ul>

          {/* GOOGLE USER DATA */}
          <h2 className="text-xl font-semibold mb-4">GOOGLE USER DATA</h2>

          <h3 className="text-lg font-medium mb-2">Collection and Use of Google User Data</h3>
          <p className="mb-6">
            When you authorize SpeakerDrive to access your Google account, we collect and process the following types of Google user data:
          </p>

          <p className="mb-2"><strong>Email Access:</strong> We access your Gmail account solely to send emails to speaking opportunities and event organizers on your behalf. This includes:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Sending outreach emails to contacts and event organizers you&apos;ve unlocked within the platform</li>
            <li>Managing responses to these communications</li>
          </ul>

          <p className="mb-6"><strong>Contact Information:</strong> We access your Google Contacts only when explicitly requested by you to help identify potential connections at organizations where you wish to speak.</p>

          <p className="mb-2"><strong>Calendar Integration:</strong> With your permission, we may access your Google Calendar to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Suggest available dates for potential speaking engagements</li>
            <li>Schedule follow-up reminders for your outreach activities</li>
            <li>Add confirmed speaking engagements to your calendar</li>
          </ul>

          <p className="mb-6">
            We use this Google user data exclusively to provide the core functionality of SpeakerDrive – helping you discover and secure speaking opportunities. We do not use your Google user data for:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Advertising or marketing purposes unrelated to the Service</li>
            <li>Selling to third parties</li>
            <li>Building user profiles unrelated to the SpeakerDrive service</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Sharing of Google User Data</h3>
          <p className="mb-6">
            SpeakerDrive treats your Google user data with the utmost confidentiality. We adhere to the following principles regarding sharing:
          </p>

          <p className="mb-6"><strong>Limited Sharing:</strong> We do not sell, rent, or lease your Google user data to any third parties.</p>

          <p className="mb-2"><strong>Service Providers:</strong> We may share limited Google user data with select third-party service providers who assist us in operating our platform, such as:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Cloud hosting providers that store our application data</li>
            <li>Email delivery services that help transmit your outreach messages</li>
          </ul>
          <p className="mb-6">All service providers are bound by strict confidentiality agreements and are prohibited from using your data for any purpose other than providing services to SpeakerDrive.</p>

          <p className="mb-6"><strong>Legal Requirements:</strong> We may disclose your Google user data if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>

          <p className="mb-6"><strong>Business Transfers:</strong> If SpeakerDrive is involved in a merger, acquisition, or sale of assets, your Google user data may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your Google user data.</p>

          <p className="mb-6"><strong>With Your Consent:</strong> We may share your Google user data with third parties when we have your explicit consent to do so.</p>

          <h3 className="text-lg font-medium mb-2">Protection of Google User Data</h3>
          <p className="mb-6">SpeakerDrive implements robust security measures to protect your Google user data:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Encryption:</strong> All Google user data is encrypted during transmission using industry-standard TLS/SSL protocols and at rest using AES-256 encryption</li>
            <li><strong>Access Controls:</strong> We implement strict access controls within our organization. Only authorized personnel who need access to perform specific job functions are granted access to Google user data</li>
            <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and vulnerability testing to ensure our systems remain secure</li>
            <li><strong>Secure Infrastructure:</strong> Our application is hosted on secure cloud infrastructure with multiple layers of security controls, including firewalls, intrusion detection systems, and continuous monitoring</li>
            <li><strong>Data Minimization:</strong> We collect and store only the Google user data that is necessary to provide our services</li>
            <li><strong>Employee Training:</strong> All employees receive regular training on data privacy and security best practices</li>
            <li><strong>Incident Response:</strong> We maintain a comprehensive incident response plan to address any potential security breaches promptly</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Retention and Deletion of Google User Data</h3>
          <p className="mb-6">SpeakerDrive maintains clear policies regarding the retention and deletion of your Google user data:</p>

          <p className="mb-2"><strong>Retention Period:</strong> We retain Google user data only as long as necessary to provide you with our services. Specifically:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Email content used for outreach is stored for 90 days after sending</li>
            <li>Calendar data is retained only while you maintain an active account</li>
            <li>Contact information accessed from Google is stored only for the duration needed to facilitate your outreach activities</li>
          </ul>

          <p className="mb-6"><strong>Account Termination:</strong> Upon termination of your SpeakerDrive account, we will delete all Google user data associated with your account within 30 days, except as required by law.</p>

          <p className="mb-6"><strong>Data Deletion Requests:</strong> You may request deletion of your Google user data at any time by contacting our support team at support@speakerdrive.com. We will process such requests within 30 days.</p>

          <p className="mb-6"><strong>Backup Retention:</strong> For disaster recovery purposes, backup copies of data may be retained for up to 90 days after deletion from active systems.</p>

          {/* HOW WE USE YOUR INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">HOW WE USE YOUR INFORMATION</h2>
          <p className="mb-6">
            We use information that we collect about you or that you provide to us, including any personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To present our Service and its contents to you</li>
            <li>To provide you with information, products, or services that you request from us</li>
            <li>To fulfill any other purpose for which you provide it</li>
            <li>To provide you with notices about your account</li>
            <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us</li>
            <li>To notify you about changes to our Service</li>
            <li>To improve our Service and user experience</li>
            <li>In any other way we may describe when you provide the information</li>
            <li>For any other purpose with your consent</li>
          </ul>

          {/* DISCLOSURE OF YOUR INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">DISCLOSURE OF YOUR INFORMATION</h2>
          <p className="mb-6">
            We may disclose personal information that we collect or you provide as described in this privacy policy:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To our subsidiaries and affiliates</li>
            <li>To contractors, service providers, and other third parties we use to support our business</li>
            <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</li>
            <li>To fulfill the purpose for which you provide it</li>
            <li>For any other purpose disclosed by us when you provide the information</li>
            <li>With your consent</li>
          </ul>
          <p className="mb-6">
            We may also disclose your personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request</li>
            <li>To enforce or apply our terms of use and other agreements</li>
            <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of our Company, our customers, or others</li>
          </ul>

          {/* DATA SECURITY */}
          <h2 className="text-xl font-semibold mb-4">DATA SECURITY</h2>
          <p className="mb-6">
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology.
          </p>
          <p className="mb-6">
            Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Service. Any transmission of personal information is at your own risk.
          </p>

          {/* YOUR RIGHTS AND CHOICES */}
          <h2 className="text-xl font-semibold mb-4">YOUR RIGHTS AND CHOICES</h2>
          <p className="mb-6">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Access:</strong> You can request access to your personal information we hold</li>
            <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> You can request deletion of your personal information, subject to certain exceptions</li>
            <li><strong>Restriction:</strong> You can request that we restrict the processing of your information</li>
            <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, commonly used, and machine-readable format</li>
            <li><strong>Objection:</strong> You can object to our processing of your personal information</li>
            <li><strong>Withdrawal of Consent:</strong> You can withdraw consent where processing is based on your consent</li>
          </ul>
          <p className="mb-6">
            For Google user data specifically, you can view, update, or revoke access to your Google account at any time through:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Your SpeakerDrive account settings</li>
            <li>Google&apos;s security settings at <a href="https://myaccount.google.com/permissions" className="text-blue-600 underline">https://myaccount.google.com/permissions</a></li>
          </ul>
          <p className="mb-6">
            To exercise any of these rights, please contact us at support@speakerdrive.com.
          </p>

          {/* CHANGES TO OUR PRIVACY POLICY */}
          <h2 className="text-xl font-semibold mb-4">CHANGES TO OUR PRIVACY POLICY</h2>
          <p className="mb-6">
            We may update our privacy policy from time to time. If we make material changes to how we treat our users&apos; personal information, we will post the new privacy policy on this page and notify you by email to the address specified in your account.
          </p>
          <p className="mb-6">
            The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Service and this privacy policy to check for any changes.
          </p>

          {/* CONTACT INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">CONTACT INFORMATION</h2>
          <p className="mb-6">
            To ask questions or comment about this privacy policy and our privacy practices, contact us at:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> support@speakerdrive.com
          </p>
          <p className="mb-6">
            <strong>Peak Performance Publishing, LLC</strong><br />
            Blue Bell, PA
          </p>
        </div>
      </div>
    </div>
  );
}