'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense, useEffect } from 'react';

// Type declaration for Vidalytics
declare global {
  interface Window {
    Vidalytics?: any;
  }
}

function ContactRevealContent() {
  const searchParams = useSearchParams();
  
  const contactName = searchParams.get('name') || 'Contact Name';
  const organization = searchParams.get('org') || 'Organization';
  const email = searchParams.get('email') || 'email@example.com';
  const feeData = searchParams.get('fee') || 'High-value';

  // Parse fee potential to separate amount from description
  const parseFeeData = (feeString: string) => {
    console.log('Raw fee data:', feeString);
    
    // Remove "Fee Potential -> " prefix
    let cleanedString = feeString.replace(/Fee Potential\s*->\s*/, '');
    console.log('After removing prefix:', cleanedString);
    
    // Split on newlines to separate amount from description
    let parts = cleanedString.split(/\n+/).filter(part => part.trim() !== '');
    console.log('Split parts:', parts);
    
    if (parts.length >= 2) {
      // First part should be the amount, rest is description
      let amount = parts[0].trim();
      let description = parts.slice(1).join(' ').trim();
      
      console.log('Parsed amount:', amount);
      console.log('Parsed description:', description);
      
      return {
        amount: amount,
        description: description
      };
    }
    
    // Fallback: if no clear separation found
    console.log('No clear separation found, using fallback');
    return {
      amount: cleanedString.trim(),
      description: ''
    };
  };

  const { amount: feeAmount, description: feeDescription } = parseFeeData(feeData);

  // Load Vidalytics script
  useEffect(() => {
    const loadVidalytics = () => {
      if (window.Vidalytics) return; // Already loaded
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function (v, i, d, a, l, y, t, c, s) {
          y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
          if (!vsl){vsl=function(u,cb){
            if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
            if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
            i.getElementsByTagName("head")[0].appendChild(s);
          };}
          vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
        })(window, document, 'Vidalytics', 'vidalytics_embed_eocHDE6rxQXbnFCO', 'https://fast.vidalytics.com/embeds/wh2tGsur/eocHDE6rxQXbnFCO/');
      `;
      document.head.appendChild(script);
    };

    loadVidalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="text-6xl mb-4"
          >
            🎯
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Contact Unlocked!
          </h1>
          <p className="text-gray-600 text-lg">
            Here's the email address for this high-value opportunity
          </p>
        </div>

        {/* Contact Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-500"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{contactName}</h2>
          <h3 className="text-xl text-blue-600 mb-4">{organization}</h3>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
            <p className="text-lg font-mono text-gray-800">{email}</p>
          </div>
          <div className="space-y-3 mb-4">
            <p className="text-green-600 font-bold text-lg">Fee Potential: {feeAmount}</p>
            {feeDescription && (
              <div className="text-gray-700 leading-relaxed">
                {feeDescription.length > 120 ? (
                  <>
                    {feeDescription.substring(0, 120)}...{' '}
                    <a 
                      href="https://app.speakerdrive.com/signup" 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View more
                    </a>
                  </>
                ) : (
                  feeDescription
                )}
              </div>
            )}
          </div>
          
          {/* Personalized Outreach CTA */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-3 font-medium">
              Next step: send them a message
            </p>
            <motion.a 
              href="https://app.speakerdrive.com/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              📤 Continue To SpeakerDrive Message Composer
            </motion.a>
            <p className="text-gray-500 text-sm mt-2">Draft the perfect personalized message in 1 click. Start your free trial now.</p>
          </div>
        </motion.div>

        {/* Value Props */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Pro Tip:</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This contact was found using SpeakerDrive's research engine. This is just 1 of thousands of opportunities like this in our database.
          </p>
          
          <div className="space-y-3">
            {[
              'Access thousands of verified speaking opportunities with high fee potential',
              'AI message composer for personalized outreach',
              'Fresh leads added daily with proven booking strategies',
              'Turn your expertise into predictable revenue'
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start bg-gray-50 p-4 rounded-lg"
              >
                <span className="text-green-500 font-bold mr-3 mt-0.5">✓</span>
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Ready to fill your calendar?</h2>
          <p className="mb-6 opacity-90">
            Find Events And Get Booked To Speak
          </p>
          
          <motion.a 
            href="https://app.speakerdrive.com/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-200"
          >
            🚀 Start Free Trial
          </motion.a>
          
          <p className="mt-4 text-sm opacity-75">
            No credit card needed • Full access • Cancel anytime
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎥 See SpeakerDrive in Action
          </h3>
          <p className="text-gray-600 mb-6">
            Watch how speakers are using our platform to book premium engagements
          </p>
          <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <div 
              id="vidalytics_embed_eocHDE6rxQXbnFCO" 
              style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}
            />
          </div>
          
          {/* Secondary CTA after video */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-6"
          >
            <a 
              href="https://app.speakerdrive.com/signup"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Ready to get started? Start your free trial →
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>
            🔒 This personalized page was created just for you • 
            <a href="/" className="text-blue-600 hover:underline ml-1">
              SpeakerDrive.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ContactRevealed() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading your contact reveal...</div>
      </div>
    }>
      <ContactRevealContent />
    </Suspense>
  );
}