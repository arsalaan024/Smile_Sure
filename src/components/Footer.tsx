import { Mail, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Bottom Bar Pattern */}
        <div className="bg-slate-900 border border-brand-text-muted/20 rounded-[4px] py-12 px-8 flex flex-wrap justify-around items-center mb-20 gap-8">
          <div className="text-center px-4">
            <span className="block text-4xl font-extrabold text-white mb-1 tracking-tight">15+</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted">Years Expertise</span>
          </div>
          <div className="text-center px-4">
            <span className="block text-4xl font-extrabold text-white mb-1 tracking-tight">10k</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted">Happy Patients</span>
          </div>
          <div className="text-center px-4">
            <span className="block text-4xl font-extrabold text-white mb-1 tracking-tight">4.9</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted">Google Rating</span>
          </div>
          <div className="text-center px-4">
            <span className="block text-4xl font-extrabold text-white mb-1 tracking-tight">0%</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted">Financing</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-brand-secondary rounded-[2px]" />
              <span className="text-xl font-extrabold tracking-tighter uppercase whitespace-nowrap">Smile Sure</span>
            </div>
            <p className="text-brand-text-muted text-[13px] leading-relaxed font-medium">
              Precision oral healthcare through advanced technology and digital diagnostics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-secondary">Quick Links</h4>
            <ul className="space-y-4 text-brand-text-muted text-[13px] font-medium">
              <li><a href="#doctors" className="hover:text-white transition-colors">Our Doctors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Emergency Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-secondary">Opening Hours</h4>
            <ul className="space-y-4 text-brand-text-muted text-[13px] font-medium">
              <li className="flex justify-between"><span>Mon - Thu</span> <span>08:00 - 19:00</span></li>
              <li className="flex justify-between"><span>Friday</span> <span>08:00 - 17:00</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>09:00 - 14:00</span></li>
              <li className="flex justify-between text-brand-secondary"><span>Sunday</span> <span>Closed</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-secondary">Contact Us</h4>
            <ul className="space-y-4 text-brand-text-muted text-[13px] font-medium">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 shrink-0 text-brand-secondary" />
                <span>124 Marylebone High St, <br />London W1U 4PQ</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 shrink-0 text-brand-secondary" />
                <span>hello@luminadental.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-brand-accent/30 font-medium">
          <p>© 2026 Lumina Dental Studio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
