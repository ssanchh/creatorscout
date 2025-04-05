export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p>We collect the following information when you join our waitlist:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email address</li>
              <li>Timestamp of submission</li>
              <li>Source of submission (which form on the website)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p>We use your email address to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Notify you when Creator Scout launches</li>
              <li>Send you important updates about the platform</li>
              <li>Provide your early access benefits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Data Storage</h2>
            <p>Your information is securely stored using Google Sheets and is only accessible to authorized team members.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>For any privacy-related questions or requests, please contact us at:</p>
            <p className="text-[#B4FF00]">privacy@creatorscout.com</p>
          </section>
        </div>
      </div>
    </div>
  )
} 