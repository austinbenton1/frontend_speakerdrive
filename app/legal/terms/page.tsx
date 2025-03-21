"use client";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Main Title */}
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-sm max-w-none">
          {/* Last Updated Date */}
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 21, 2025</p>

          {/* ACCEPTANCE OF TERMS */}
          <h2 className="text-xl font-semibold mb-4">ACCEPTANCE OF TERMS</h2>
          <p className="mb-6">
            These Terms of Service ("Terms") constitute a legally binding agreement between you and
            Peak Performance Publishing, LLC ("Company," "we," "us," or "our") regarding your use
            of the SpeakerDrive platform and service (collectively, the "Service"). By accessing or
            using the Service, you agree to be bound by these Terms.
          </p>

          {/* ELIGIBILITY */}
          <h2 className="text-xl font-semibold mb-4">ELIGIBILITY</h2>
          <p className="mb-6">
            You must be at least 18 years old and able to form legally binding contracts to use our
            Service. By using our Service, you represent and warrant that you meet these requirements.
          </p>

          {/* ACCOUNT REGISTRATION AND SECURITY */}
          <h2 className="text-xl font-semibold mb-4">ACCOUNT REGISTRATION AND SECURITY</h2>
          <h3 className="text-lg font-medium mb-2">Account Creation</h3>
          <p className="mb-6">
            To use certain features of the Service, you may be required to register for an account.
            You agree to provide accurate, current, and complete information during the registration
            process and to update such information to keep it accurate, current, and complete.
          </p>
          <h3 className="text-lg font-medium mb-2">Account Security</h3>
          <p className="mb-6">
            You are responsible for safeguarding your password and for all activities that occur
            under your account. You agree to notify us immediately of any unauthorized use of your
            account. We cannot and will not be liable for any loss or damage arising from your
            failure to comply with this section.
          </p>

          {/* SERVICE DESCRIPTION */}
          <h2 className="text-xl font-semibold mb-4">SERVICE DESCRIPTION</h2>
          <h3 className="text-lg font-medium mb-2">Platform Purpose</h3>
          <p className="mb-6">
            SpeakerDrive is a platform designed to connect speakers, trainers, consultants, and other
            professionals with speaking and consulting opportunities. We provide tools to discover
            leads, contact decision-makers, and manage outreach efforts.
          </p>
          <h3 className="text-lg font-medium mb-2">No Employment Relationship</h3>
          <p className="mb-6">
            We do not employ speakers, nor do we act as an agent or representative. We simply provide
            a platform that enables connections between speakers and those seeking their services.
          </p>

          {/* USER CONTENT */}
          <h2 className="text-xl font-semibold mb-4">USER CONTENT</h2>
          <h3 className="text-lg font-medium mb-2">Ownership</h3>
          <p className="mb-6">
            Any content you submit to the Service ("User Content") remains your property. However,
            by uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license
            to use, reproduce, modify, adapt, publish, and display such content for the purpose of
            providing and promoting the Service.
          </p>
          <h3 className="text-lg font-medium mb-2">Content Restrictions</h3>
          <p className="mb-6">You agree not to post User Content that:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Is false, misleading, or deceptive</li>
            <li>Infringes upon any third party&apos;s intellectual property rights</li>
            <li>Contains software viruses or any other code designed to harm computer systems</li>
            <li>Violates any applicable law or regulation</li>
            <li>Contains hate speech or promotes discrimination</li>
            <li>Harasses, abuses, or threatens others</li>
          </ul>

          {/* SERVICE USAGE AND LIMITATIONS */}
          <h2 className="text-xl font-semibold mb-4">SERVICE USAGE AND LIMITATIONS</h2>
          <h3 className="text-lg font-medium mb-2">Acceptable Use</h3>
          <p className="mb-6">
            You agree to use the Service only for lawful purposes and in accordance with these
            Terms. You agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>In any way that violates any applicable law or regulation</li>
            <li>To impersonate any person or entity</li>
            <li>To &quot;stalk&quot; or harass another person</li>
            <li>To collect or store personal data about other users without their permission</li>
            <li>To interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>
              To attempt to probe, scan, or test the vulnerability of the Service or any associated
              system or network, or to breach security or authentication measures
            </li>
            <li>
              To scrape, spider, or otherwise attempt to gather data from the Service outside of
              published APIs or user interfaces
            </li>
            <li>To reverse engineer or decompile any parts of the Service</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Service Modifications</h3>
          <p className="mb-6">
            We reserve the right to modify, suspend, or discontinue the Service (or any part
            thereof) at any time, with or without notice. You agree that we will not be liable to
            you or to any third party for any modification, suspension, or discontinuance of the
            Service.
          </p>

          <h3 className="text-lg font-medium mb-2">Rate Limits and Fair Usage</h3>
          <p className="mb-6">
            The Service may impose rate limits on certain features. You agree not to circumvent
            these limits, and understand that exceeding them may result in temporary or permanent
            restriction of your account.
          </p>

          <h3 className="text-lg font-medium mb-2">API and Third-Party Service Usage</h3>
          <p className="mb-6">
            When you authorize SpeakerDrive to connect with third-party services (such as Google
            services), you agree to comply with both these Terms and the terms of service of such
            third-party providers. We reserve the right to suspend or terminate your access to any
            third-party integration if we believe you are misusing such integration or violating
            any terms of service.
          </p>

          {/* PAYMENT TERMS */}
          <h2 className="text-xl font-semibold mb-4">PAYMENT TERMS</h2>
          <h3 className="text-lg font-medium mb-2">Subscription Fees</h3>
          <p className="mb-6">
            Certain features of the Service may require payment of fees. All fees are stated in your
            subscription agreement or on our pricing page and are non-refundable except as required
            by law or as explicitly stated in these Terms.
          </p>
          <h3 className="text-lg font-medium mb-2">Billing</h3>
          <p className="mb-6">
            We use third-party payment processors to bill you through a payment account linked to
            your account. The processing of payments will be subject to the terms, conditions, and
            privacy policies of these payment processors in addition to these Terms.
          </p>
          <h3 className="text-lg font-medium mb-2">Cancellation and Refunds</h3>
          <p className="mb-6">
            You may cancel your subscription at any time through your account settings or by
            contacting us. Upon cancellation, your access to premium features will continue until
            the end of your current billing period.
          </p>
          <p className="mb-6">
            All purchases and subscription payments are final and non-refundable except as expressly
            stated in these Terms or as required by applicable law. Any refunds are provided solely
            at our discretion. If we choose to issue a refund in any particular case, this does not
            entitle you to a refund in any other case. We reserve the right to determine refund
            eligibility on a case-by-case basis.
          </p>

          {/* INTELLECTUAL PROPERTY */}
          <h2 className="text-xl font-semibold mb-4">INTELLECTUAL PROPERTY</h2>
          <h3 className="text-lg font-medium mb-2">Our Content</h3>
          <p className="mb-6">
            The Service and its original content, features, and functionality are owned by the
            Company and are protected by international copyright, trademark, patent, trade secret,
            and other intellectual property or proprietary rights laws.
          </p>
          <h3 className="text-lg font-medium mb-2">Feedback</h3>
          <p className="mb-6">
            Any feedback, comments, ideas, improvements, or suggestions provided by you to us shall
            remain our property. We are free to use, copy, modify, publish, or redistribute such
            feedback for any purpose without compensation to you.
          </p>

          {/* THIRD-PARTY LINKS AND SERVICES */}
          <h2 className="text-xl font-semibold mb-4">THIRD-PARTY LINKS AND SERVICES</h2>
          <p className="mb-6">
            The Service may contain links to third-party websites or services that are not owned or
            controlled by the Company. We have no control over and assume no responsibility for the
            content, privacy policies, or practices of any third-party websites or services.
          </p>

          {/* TERMINATION */}
          <h2 className="text-xl font-semibold mb-4">TERMINATION</h2>
          <h3 className="text-lg font-medium mb-2">By Us</h3>
          <p className="mb-6">
            We may terminate or suspend your account and bar access to the Service immediately,
            without prior notice or liability, under our sole discretion, for any reason whatsoever,
            including but not limited to a breach of the Terms.
          </p>
          <h3 className="text-lg font-medium mb-2">By You</h3>
          <p className="mb-6">
            You may terminate these Terms at any time by discontinuing use of the Service and
            canceling your account.
          </p>
          <h3 className="text-lg font-medium mb-2">Effect of Termination</h3>
          <p className="mb-6">
            Upon termination, your right to use the Service will immediately cease. All provisions
            of the Terms which by their nature should survive termination shall survive, including
            ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>

          {/* DISCLAIMER OF WARRANTIES */}
          <h2 className="text-xl font-semibold mb-4">DISCLAIMER OF WARRANTIES</h2>
          <p className="mb-6">
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The
            Company disclaims all warranties of any kind, whether express or implied, including but
            not limited to the implied warranties of merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>

          {/* LIMITATION OF LIABILITY */}
          <h2 className="text-xl font-semibold mb-4">LIMITATION OF LIABILITY</h2>
          <p className="mb-6">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS
            DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
            LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
            FROM:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            <li>Any other matter relating to the Service</li>
          </ul>
          <p className="mb-6">
            NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY
            DAMAGES ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE (FOR ANY CAUSE WHATSOEVER
            AND REGARDLESS OF THE FORM OF THE ACTION) WILL AT ALL TIMES BE LIMITED TO THE GREATER OF
            (A) FIFTY US DOLLARS ($50) OR (B) AMOUNTS YOU HAVE PAID TO THE COMPANY IN THE PRIOR 12
            MONTHS (IF ANY).
          </p>

          {/* INDEMNIFICATION */}
          <h2 className="text-xl font-semibold mb-4">INDEMNIFICATION</h2>
          <p className="mb-6">
            You agree to defend, indemnify, and hold harmless the Company and its licensees and
            licensors, and their employees, contractors, agents, officers, and directors, from and
            against any and all claims, damages, obligations, losses, liabilities, costs or debt, and
            expenses, including but not limited to attorney&apos;s fees, arising from:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Your use of and access to the Service</li>
            <li>Your violation of any term of these Terms</li>
            <li>
              Your violation of any third-party right, including without limitation any copyright,
              property, or privacy right
            </li>
            <li>Any claim that your User Content caused damage to a third party</li>
          </ul>

          {/* CHANGES TO TERMS */}
          <h2 className="text-xl font-semibold mb-4">CHANGES TO TERMS</h2>
          <p className="mb-6">
            We reserve the right to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days&apos; notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          {/* GOVERNING LAW */}
          <h2 className="text-xl font-semibold mb-4">GOVERNING LAW</h2>
          <p className="mb-6">
            These Terms shall be governed and construed in accordance with the laws of Pennsylvania,
            without regard to its conflict of law provisions. You agree that the Service constitutes
            a passive website that does not give rise to personal jurisdiction over the Company in
            jurisdictions other than Pennsylvania.
          </p>

          {/* DISPUTE RESOLUTION */}
          <h2 className="text-xl font-semibold mb-4">DISPUTE RESOLUTION</h2>
          <p className="mb-6">
            Any disputes arising out of or relating to these Terms or the Service shall be resolved
            through binding arbitration in accordance with the rules of the American Arbitration
            Association. The arbitration shall be conducted in Blue Bell, Pennsylvania. You agree to
            submit to the personal jurisdiction of the federal and state courts located in Montgomery
            County, Pennsylvania for any actions not subject to arbitration.
          </p>
          <p className="mb-6">
            You agree that regardless of any statute or law to the contrary, any claim or cause of
            action arising out of or related to use of the Service or these Terms must be filed
            within one (1) year after such claim or cause of action arose or be forever barred.
          </p>

          {/* SEVERABILITY */}
          <h2 className="text-xl font-semibold mb-4">SEVERABILITY</h2>
          <p className="mb-6">
            If any provision of these Terms is held to be unenforceable or invalid, such provision
            will be changed and interpreted to accomplish the objectives of such provision to the
            greatest extent possible under applicable law, and the remaining provisions will
            continue in full force and effect.
          </p>

          {/* ENTIRE AGREEMENT */}
          <h2 className="text-xl font-semibold mb-4">ENTIRE AGREEMENT</h2>
          <p className="mb-6">
            These Terms constitute the entire agreement between you and the Company regarding the
            use of the Service, superseding any prior agreements between you and the Company
            relating to your use of the Service.
          </p>

          {/* WAIVER */}
          <h2 className="text-xl font-semibold mb-4">WAIVER</h2>
          <p className="mb-6">
            Our failure to exercise or enforce any right or provision of these Terms shall not
            operate as a waiver of such right or provision.
          </p>

          {/* ASSIGNMENT */}
          <h2 className="text-xl font-semibold mb-4">ASSIGNMENT</h2>
          <p className="mb-6">
            You may not assign or transfer these Terms or your rights under these Terms, in whole or
            in part, by operation of law or otherwise, without our prior written consent. We may
            assign these Terms at any time without notice or consent.
          </p>

          {/* CONTACT INFORMATION */}
          <h2 className="text-xl font-semibold mb-4">CONTACT INFORMATION</h2>
          <p className="mb-6">
            Questions about the Terms should be sent to us at:{" "}
            <strong>support@speakerdrive.com</strong>
          </p>
          <p className="mb-6">
            Peak Performance Publishing, LLC
            <br />
            531 Village Cr
            <br />
            Blue Bell, PA 19422
            <br />
            917-733-1627
          </p>
        </div>
      </div>
    </div>
  );
}
