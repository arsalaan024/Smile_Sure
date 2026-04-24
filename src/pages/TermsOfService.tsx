import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary uppercase tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-brand-text-muted font-medium leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using the Smile Sure website and services, you agree to comply with and be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">2. Appointment Booking</h2>
            <p>Appointments are subject to availability. When booking, you must provide accurate and complete information. We reserve the right to reschedule appointments in case of clinical emergencies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">3. Payment & Refunds</h2>
            <p>Payments for services are processed through Razorpay. All fees are clearly stated at the time of booking. Refund requests are subject to our cancellation policy (typically requiring 24 hours notice for a full refund of the booking deposit).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">4. Medical Disclaimer</h2>
            <p>The information on this website is for general guidance and does not substitute professional medical advice. A physical consultation is required for any definitive diagnosis or treatment plan.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">5. Modifications</h2>
            <p>We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight mb-4">6. Contact Information</h2>
            <p>For any queries regarding these terms, please contact <span className="text-brand-secondary font-bold">smilesure.in@gmail.com</span>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
