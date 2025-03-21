"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none">
          {/* Last Updated Date */}
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 21, 2025</p>

          {/* INTRODUCTION */}
          <h2 className="text-xl font-semibold mb-4">INTRODUCTION</h2>
          <p className="mb-6">
            Peak Performance Publishing, LLC ("Company," "we," "us," or "our") respects your privacy and
            is committed to protecting it through our compliance with this policy. This policy describes
            the types of information we may collect from you or that you may provide when you visit or use
            SpeakerDrive (the "Service") and our practices for collecting, using, maintaining, protecting,
            and disclosing that information.
          </p>

          {/* INFORMATION WE COLLECT */}
          <h2 className="text-xl font-semibold mb-4">INFORMATION WE COLLECT</h2>

          <h3 className="text-lg font-medium mb-2">Information You Provide to Us</h3>
          <p className="mb-6">
            When you register with, use, or interact with our Service, we may collect several types of
            information from and about you, including:
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
            When you use our Service, we may use automatic data collection technologies to collect certain
            information about your equipment, browsing actions, and patterns, including:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Details of your visits to our Service, including traffic data, location data, logs, and other communication data</li>
            <li>Information about your computer and internet connection, including your IP address, operating system, and browser type</li>
            <li>Information about your device and internet connection, including the device type, device identifier, and mobile network information</li>
          </ul>

          {/* GOOGLE USER DATA */}
          <h2 className="text-xl font-semibold mb-4">GOOGLE USER DATA</h2>

          <h3 className="text-lg font-medium mb-2">Collection and Use of Google User Data</h3>
          <p className="mb-6">
            When you authorize Speaker Drive to access your Google account, we collect and process the
            following types of Google user data:
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>
              <strong>Email Access</strong>: We access your Gmail account solely to send emails to speaking 
              opportunities and event organizers on your behalf. This includes:
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Sending outreach emails to contacts and event organizers you've unlocked within the platform</li>
                <li>Managing responses to these communications</li>
              </ul>
            </li>
            <li>
              <strong>Contact Information</strong>: We access your Google Contacts only when explicitly 
              requested by you to help identify potential connections at organizations where you wish to speak.
            </li>
            <li>
              <strong>Calendar Integration</strong>: With your permission, we may access your Google Calendar to:
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Suggest available dates for potential speaking engagements</li>
                <li>Schedule follow-up reminders for your outreach activities</li>
                <li>Add confirmed speaking engagements to your calendar</li>
              </ul>
            </li>
          </ol>
          <p className="mb-6">
            We use this Google user data exclusively to provide the core functionality of Speaker Drive – helping 
            you discover and secure speaking opportunities. We do not use your Google user data for:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Advertising or marketing purposes unrelated to the Service</li>
            <li>Selling to third parties</li>
            <li>Building user profiles unrelated to the Speaker Drive service</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Sharing of Google User Data</h3>
          <p className="mb-6">
            Speaker Drive treats your Google user data with the utmost confidentiality. We adhere to the following
            principles regarding sharing:
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>
              <strong>Limited Sharing</strong>: We do not sell, rent, or lease your Google user data to any third 
              parties.
            </li>
            <li>
              <strong>Service Providers</strong>: We may share limited Google user data with select third-party 
              service providers who assist us in operating our platform, such as:
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Cloud hosting providers that store our application data</li>
                <li>Email delivery services that help transmit your outreach messages</li>
              </ul>
              All service providers are bound by strict confidentiality agreements and are prohibited from using 
              your data for any purpose other than providing services to Speaker Drive.
            </li>
            <li>
              <strong>Legal Requirements</strong>: We may disclose your Google user data if required to do so 
              by law or in response to valid requests by public authorities (e.g., a court or government agency).
            </li>
            <li>
              <strong>Business Transfers</strong>: If Speaker Drive is involved in a merger, acquisition, or sale 
              of assets, your Google user data may be transferred as part of that transaction. We will notify you 
              via email and/or a prominent notice on our website of any change in ownership or uses of your Google 
              user data.
            </li>
            <li>
              <strong>With Your Consent</strong>: We may share your Google user data with third parties when we 
              have your explicit consent to do so.
            </li>
          </ol>

          <h3 className="text-lg font-medium mb-2">Protection of Google User Data</h3>
          <p className="mb-6">
            Speaker Drive implements robust security measures to protect your Google user data:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Encryption</strong>: All Google user data is encrypted during transmission using 
              industry-standard TLS/SSL protocols and at rest using AES-256 encryption.
            </li>
            <li>
              <strong>Access Controls</strong>: We implement strict access controls within our organization. 
              Only authorized personnel who need access to perform specific job functions are granted access 
              to Google user data.
            </li>
            <li>
              <strong>Regular Security Audits</strong>: We conduct regular security assessments and vulnerability 
              testing to ensure our systems remain secure.
            </li>
            <li>
              <strong>Secure Infrastructure</strong>: Our application is hosted on secure cloud infrastructure 
              with multiple layers of security controls, including firewalls, intrusion detection systems, and 
              continuous monitoring.
            </li>
            <li>
              <strong>Data Minimization</strong>: We collect and store only the Google user data that is 
              necessary to provide our services.
            </li>
            <li>
              <strong>Employee Training</strong>: All employees receive regular training on data privacy and 
              security best practices.
            </li>
            <li>
              <strong>Incident Response</strong>: We maintain a comprehensive incident response plan to address 
              any potential security breaches promptly.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Retention and Deletion of Google User Data</h3>
          <p className="mb-6">
            Speaker Drive maintains clear policies regarding the retention and deletion of your Google user data:
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>
              <strong>Retention Period</strong>: We retain Google user data only as long as necessary to provide 
              you with our services. Specifically:
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Email content used for outreach is stored for 90 days after sending</li>
                <li>Calendar data is retained only while you maintain an active account</li>
                <li>Contact information accessed from Google is stored only for the duration needed to 
                    facilitate your outreach activities
                </li>
              </ul>
            </li>
            <li>
              <strong>Account Termination</strong>: Upon termination of your Speaker Drive account, we will 
              delete all Google user data associated with your account within 30 days, except as required by law.
            </li>
            <li>
              <strong>Data Deletion Requests</strong>: You may request deletion of your Google user data at 
              any time by contacting our support team at <strong>support@speakerdrive.com</strong>. We will process 
              such requests within 30 days.
            </li>
            <li>
              <strong>Backup Retention</strong>: For disaster recovery purposes, backup copies of data may be 
              retained for up to 90 days after deletion from active systems.
            </li>
          </ol>

          {/* HOW WE USE YOUR INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">HOW WE USE YOUR INFORMATION</h2>
          <p className="mb-6">
            We use information that we collect about you or that you provide to us, including any personal 
            information:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To present our Service and its contents to you</li>
            <li>To provide you with information, products, or services that you request from us</li>
            <li>To fulfill any other purpose for which you provide it</li>
            <li>To provide you with notices about your account</li>
            <li>
              To carry out our obligations and enforce our rights arising from any contracts entered into 
              between you and us
            </li>
            <li>To notify you about changes to our Service</li>
            <li>To improve our Service and user experience</li>
            <li>In any other way we may describe when you provide the information</li>
            <li>For any other purpose with your consent</li>
          </ul>

          {/* DISCLOSURE OF YOUR INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">DISCLOSURE OF YOUR INFORMATION</h2>
          <p className="mb-6">
            We may disclose personal information that we collect or you provide as described in this privacy 
            policy:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To our subsidiaries and affiliates</li>
            <li>To contractors, service providers, and other third parties we use to support our business</li>
            <li>
              To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, 
              dissolution, or other sale or transfer of some or all of our assets
            </li>
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
            <li>
              If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of 
              our Company, our customers, or others
            </li>
          </ul>

          {/* DATA SECURITY */}
          <h2 className="text-xl font-semibold mb-4">DATA SECURITY</h2>
          <p className="mb-6">
            We have implemented measures designed to secure your personal information from accidental loss and 
            from unauthorized access, use, alteration, and disclosure. All information you provide to us is 
            stored on secure servers behind firewalls. Any payment transactions will be encrypted using 
            SSL technology.
          </p>
          <p className="mb-6">
            Unfortunately, the transmission of information via the internet is not completely secure. Although we
            do our best to protect your personal information, we cannot guarantee the security of your personal
            information transmitted to our Service. Any transmission of personal information is at your own risk.
          </p>

          {/* YOUR RIGHTS AND CHOICES */}
          <h2 className="text-xl font-semibold mb-4">YOUR RIGHTS AND CHOICES</h2>
          <p className="mb-6">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Access</strong>: You can request access to your personal information we hold</li>
            <li><strong>Correction</strong>: You can request that we correct inaccurate or incomplete information</li>
            <li><strong>Deletion</strong>: You can request deletion of your personal information, subject to certain exceptions</li>
            <li><strong>Restriction</strong>: You can request that we restrict the processing of your information</li>
            <li><strong>Data Portability</strong>: You can request a copy of your personal information in a structured, commonly used, and machine-readable format</li>
            <li><strong>Objection</strong>: You can object to our processing of your personal information</li>
            <li><strong>Withdrawal of Consent</strong>: You can withdraw consent where processing is based on your consent</li>
          </ul>
          <p className="mb-6">
            For Google user data specifically, you can view, update, or revoke access to your Google account at 
            any time through:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Your Speaker Drive account settings</li>
            <li>Google's security settings at <a href="https://myaccount.google.com/permissions" className="text-blue-600 underline">https://myaccount.google.com/permissions</a></li>
          </ul>
          <p className="mb-6">
            To exercise any of these rights, please contact us at <strong>support@speakerdrive.com</strong>.
          </p>

          {/* CHANGES TO OUR PRIVACY POLICY */}
          <h2 className="text-xl font-semibold mb-4">CHANGES TO OUR PRIVACY POLICY</h2>
          <p className="mb-6">
            We may update our privacy policy from time to time. If we make material changes to how we treat our
            users' personal information, we will post the new privacy policy on this page and notify you by email
            to the address specified in your account.
          </p>
          <p className="mb-6">
            The date the privacy policy was last revised is identified at the top of the page. You are responsible
            for ensuring we have an up-to-date active and deliverable email address for you, and for periodically
            visiting our Service and this privacy policy to check for any changes.
          </p>

          {/* CONTACT INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">CONTACT INFORMATION</h2>
          <p className="mb-6">
            To ask questions or comment about this privacy policy and our privacy practices, contact us at:
          </p>
          <p className="mb-6">
            Email: <strong>support@speakerdrive.com</strong><br />
            Peak Performance Publishing, LLC<br />
            531 Village Cr<br />
            Blue Bell, PA 19422<br />
            917-733-1627
          </p>
        </div>
      </div>
    </div>
  );
}
