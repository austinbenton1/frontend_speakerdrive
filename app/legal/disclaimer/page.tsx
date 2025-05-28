"use client";

export default function FairUsePolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8">Fair Use Policy</h1>
        <div className="prose prose-sm max-w-none">
          {/* Last Updated Date */}
          <p className="text-sm text-gray-500 mb-8">Last Updated: March 28, 2025</p>

          {/* PURPOSE */}
          <h2 className="text-xl font-semibold mb-4">Purpose</h2>
          <p className="mb-6">
            This Fair Use Policy establishes guidelines for reasonable and appropriate use of the SpeakerDrive platform. These guidelines help maintain platform integrity, ensure fair access for all users, and protect the quality of our service.
          </p>

          {/* PLATFORM USAGE GUIDELINES */}
          <h2 className="text-xl font-semibold mb-4">Platform Usage Guidelines</h2>

          <h3 className="text-lg font-medium mb-2">Search and Lead Discovery</h3>
          <p className="mb-2"><strong>Reasonable Use:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Conduct searches that align with your professional focus and expertise</li>
            <li>Use filters and search terms to find genuinely relevant opportunities</li>
            <li>Allow reasonable time between bulk search activities</li>
          </ul>

          <p className="mb-2"><strong>Usage Limits:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Automated search tools or scripts are not permitted</li>
            <li>Excessive rapid-fire searching may trigger temporary restrictions</li>
            <li>Search frequency should reflect genuine prospecting needs</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Lead Unlocks and Credits</h3>
          <p className="mb-2"><strong>Fair Usage Patterns:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Unlock leads you genuinely intend to contact</li>
            <li>Use credits for opportunities that match your service offerings</li>
            <li>Allow reasonable evaluation time before unlocking additional similar leads</li>
          </ul>

          <p className="mb-2"><strong>Credit Management:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Credits are intended for active prospecting, not stockpiling contacts</li>
            <li>Sharing unlock data outside the platform violates our terms</li>
            <li>Bulk unlocking for data harvesting is prohibited</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Email and Integration Usage</h3>
          <p className="mb-2"><strong>Gmail Integration:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Send outreach messages at reasonable intervals</li>
            <li>Respect recipient preferences and unsubscribe requests</li>
            <li>Maintain professional email practices and avoid spam behaviors</li>
          </ul>

          <p className="mb-2"><strong>API and Integration Limits:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Use third-party integrations (CRM, etc.) within their intended scope</li>
            <li>Don&apos;t circumvent rate limits or technical restrictions</li>
            <li>Ensure connected accounts comply with their respective terms of service</li>
          </ul>

          {/* CREDIT REFUND GUIDELINES */}
          <h2 className="text-xl font-semibold mb-4">Credit Refund Guidelines</h2>

          <h3 className="text-lg font-medium mb-2">Refund Eligibility</h3>
          <p className="mb-6">
            Credits are automatically refunded when you rate a lead as &quot;Poor&quot; and select one of these qualifying reasons:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Invalid Contact Info</strong> - Primary contact method doesn&apos;t work (hard email bounce, incorrect LinkedIn URL, etc.)</li>
            <li><strong>Inaccurate Data</strong> - Core lead details are substantially incorrect (contact no longer at organization, wrong role, fundamentally incorrect event details)</li>
            <li><strong>Other</strong> - Must include specific explanation for consideration</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Fair Use Guidelines for Refunds</h3>
          <p className="mb-2"><strong>What Constitutes Fair Use:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Legitimate data quality issues as defined above</li>
            <li>Reasonable number of refund requests relative to total unlocks</li>
            <li>Specific, factual explanations for &quot;Other&quot; category requests</li>
            <li>Good faith efforts to use the provided contact information</li>
          </ul>

          <p className="mb-2"><strong>What May Indicate Misuse:</strong></p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Requesting refunds for lack of response to outreach (non-response doesn&apos;t indicate bad data)</li>
            <li>Excessive refund rates compared to typical user patterns</li>
            <li>Vague or non-specific explanations in &quot;Other&quot; category</li>
            <li>Requesting refunds for leads that don&apos;t match personal preferences rather than data accuracy issues</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Refund Review Process</h3>
          <p className="mb-6">
            <strong>Automatic Refunds:</strong> Most qualifying requests are processed immediately when you submit a &quot;Poor&quot; rating with a valid reason.
          </p>
          <p className="mb-2"><strong>Manual Review:</strong> We may review accounts that show unusual refund patterns, including:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Refund rates significantly above platform average</li>
            <li>Repeated &quot;Other&quot; category requests without clear data quality issues</li>
            <li>Patterns suggesting system abuse rather than legitimate quality concerns</li>
          </ul>

          {/* ENFORCEMENT AND ACCOUNT PROTECTION */}
          <h2 className="text-xl font-semibold mb-4">Enforcement and Account Protection</h2>

          <h3 className="text-lg font-medium mb-2">Usage Monitoring</h3>
          <p className="mb-2">We monitor platform usage to ensure fair access for all users:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Automated Detection:</strong> Our systems identify unusual usage patterns</li>
            <li><strong>Usage Alerts:</strong> Users may receive notifications about approaching limits</li>
            <li><strong>Pattern Analysis:</strong> We review accounts with atypical usage for potential issues</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Response to Policy Violations</h3>
          <p className="mb-2">Violations of this Fair Use Policy may result in:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Educational Outreach:</strong> Initial contact to clarify policy expectations</li>
            <li><strong>Temporary Restrictions:</strong> Limited access to certain features during review</li>
            <li><strong>Account Suspension/Termination:</strong> We reserve the right to suspend or terminate user accounts at any time, with or without cause, and with or without notice, at our sole discretion</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Data Quality Improvement</h3>
          <p className="mb-2">We use usage patterns and feedback to continuously improve our platform:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Identify and address data quality issues</li>
            <li>Optimize system performance and reliability</li>
            <li>Enhance user experience based on legitimate usage patterns</li>
          </ul>

          {/* YOUR RIGHTS AND RESPONSIBILITIES */}
          <h2 className="text-xl font-semibold mb-4">Your Rights and Responsibilities</h2>

          <h3 className="text-lg font-medium mb-2">User Rights</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Request clarification on any usage limits or policy decisions</li>
            <li>Appeal enforcement actions with additional supporting information</li>
            <li>Receive explanation if your account is flagged for review</li>
            <li>Access support for legitimate usage questions</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">User Responsibilities</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Use the platform in good faith for its intended professional purposes</li>
            <li>Respect system limits and avoid circumventing technical restrictions</li>
            <li>Provide honest feedback to help improve platform quality</li>
            <li>Report suspected abuse or policy violations</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Data Quality Commitment</h3>
          <p className="mb-2">We use your feedback and usage patterns to continuously improve our service:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Legitimate usage helps us identify and fix data quality issues</li>
            <li>Fair use patterns improve system performance for all users</li>
            <li>Honest feedback enhances the platform experience</li>
          </ul>

          {/* CONTACT US */}
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">
            Questions about this policy or specific refund situations:<br />
            <strong>Email:</strong> support@speakerdrive.com
          </p>
          <p className="mb-6">
            <strong>Peak Performance Publishing, LLC</strong><br />
            Blue Bell, PA
          </p>

          {/* POLICY UPDATES */}
          <h2 className="text-xl font-semibold mb-4">Policy Updates</h2>
          <p className="mb-6">
            We may update this policy as our platform evolves. Material changes will be communicated via email and posted on our website.
          </p>

          <hr className="my-8" />

          <p className="text-sm text-gray-600 italic">
            This Fair Use Policy works in conjunction with our Terms of Service and Privacy Policy. In case of conflicts, our Terms of Service take precedence.
          </p>
        </div>
      </div>
    </div>
  );
}