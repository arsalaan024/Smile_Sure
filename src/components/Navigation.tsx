import { motion } from "motion/react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
            <img src="/logo.jpeg" alt="Smile Sure Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-extrabold tracking-tighter text-brand-primary uppercase">
              Smile Sure
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-[13px] font-semibold text-brand-secondary uppercase tracking-wider">Home</a>
            <a href="#services" className="text-[13px] font-semibold text-brand-text-muted hover:text-brand-secondary uppercase tracking-wider transition-colors">Our Services</a>
            <a href="#doctors" className="text-[13px] font-semibold text-brand-text-muted hover:text-brand-secondary uppercase tracking-wider transition-colors">Our Doctors</a>
            <a href="#contact" className="text-[13px] font-semibold text-brand-text-muted hover:text-brand-secondary uppercase tracking-wider transition-colors">Contact</a>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-brand-border">
              {isSignedIn ? (
                <Link to="/dashboard" className="text-[13px] font-bold text-brand-secondary hover:text-brand-primary uppercase tracking-wider transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/auth" className="text-[13px] font-bold text-brand-primary hover:text-brand-secondary uppercase tracking-wider transition-colors">
                  Patient Portal
                </Link>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-primary text-white px-6 py-3 rounded-[2px] text-[12px] font-bold uppercase tracking-widest cursor-pointer"
              >
                Connect Now
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-primary p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white border-b border-slate-100"
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          <a href="#services" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-brand-primary hover:bg-slate-50 uppercase tracking-widest">Our Services</a>
          <a href="#doctors" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-brand-primary hover:bg-slate-50 uppercase tracking-widest">Our Doctors</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-brand-primary hover:bg-slate-50 uppercase tracking-widest">Contact</a>
          {isSignedIn ? (
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-extrabold text-brand-secondary hover:bg-slate-50 uppercase tracking-widest">Dashboard</Link>
          ) : (
            <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-extrabold text-brand-secondary hover:bg-slate-50 uppercase tracking-widest">Patient Portal</Link>
          )}
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
            <button 
              onClick={() => {
                setIsOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-brand-primary text-white px-6 py-4 rounded-[2px] font-bold uppercase tracking-widest"
            >
              Connect Now
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
