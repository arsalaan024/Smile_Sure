import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <nav className="bg-white border-b border-brand-border px-6 lg:px-16 py-6 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.jpeg" alt="Smile Sure Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-extrabold tracking-tighter text-brand-primary uppercase">
            Smile Sure
          </span>
        </Link>
        <Link to="/" className="text-sm font-bold text-brand-text-muted hover:text-brand-primary uppercase tracking-widest flex items-center transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary uppercase tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-brand-text-muted font-medium leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">1. Information We Collect</h2>
            <p>At Smile Sure, we collect personal information that you provide to us directly when you book an appointment or contact us. This includes your name, email address, phone number, and any medical history relevant to your dental care.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">2. How We Use Your Information</h2>
            <p>We use your information to facilitate appointment bookings, process payments via Razorpay, and provide personalized dental services. We also use your contact details to send confirmation emails and important updates regarding your care.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. Payment information is handled securely by Razorpay, and we do not store your credit card or bank details on our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">4. Third-Party Services</h2>
            <p>We use third-party services like Clerk for authentication, Razorpay for payments, and EmailJS for communication. These providers have their own privacy policies governing how they handle your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-brand-secondary font-bold">smilesure.in@gmail.com</span>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
