/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Trigger Build
 */

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="services">
          <Services />
        </section>

        <Doctors />
        
        <Testimonials />
        
        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 bg-white border-t border-brand-border overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="text-center mb-12">
              <div className="w-10 h-1 bg-brand-secondary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 tracking-tighter leading-none uppercase">
                Ready to redefine <br />
                your smile journey?
              </h2>
              <p className="text-brand-text-muted mb-8 max-w-lg mx-auto text-base font-medium">
                Submit an inquiry below and our patient coordination team will 
                contact you shortly.
              </p>
            </div>
            
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
