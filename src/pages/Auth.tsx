import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row">
      {/* Left visual side */}
      <div className="hidden md:flex md:w-1/2 bg-brand-primary relative overflow-hidden flex-col justify-between p-12 lg:p-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000" 
            alt="Clinic interior" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-brand-primary/80" />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="text-white font-black text-2xl tracking-tighter uppercase inline-block hover:opacity-80 transition-opacity">
            Smile Sure
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="w-12 h-1 bg-brand-secondary mb-8" />
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 uppercase tracking-tight">
            Your Smile <br/> Journey Begins Here.
          </h1>
          <p className="text-white/70 font-medium leading-relaxed">
            Access your patient portal to manage appointments, view treatment plans, and securely communicate with your specialists.
          </p>
        </div>
      </div>

      {/* Right form side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 relative bg-brand-bg">
        <Link to="/" className="absolute top-8 left-8 md:hidden text-brand-primary font-black text-xl uppercase tracking-tighter">
          Smile Sure
        </Link>

        <Link to="/" className="absolute top-8 right-8 text-brand-text-muted hover:text-brand-primary transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider">
          <ChevronLeft className="w-4 h-4" /> Home
        </Link>

        <div className="w-full max-w-md flex flex-col items-center">
          {/* Toggle Tabs */}
          <div className="flex bg-white p-1 rounded-[4px] mb-8 border border-brand-border w-full shadow-sm">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-extrabold uppercase tracking-widest rounded-[2px] transition-all ${
                isLogin ? 'bg-brand-primary text-white shadow-sm' : 'text-brand-text-muted hover:text-brand-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-extrabold uppercase tracking-widest rounded-[2px] transition-all ${
                !isLogin ? 'bg-brand-primary text-white shadow-sm' : 'text-brand-text-muted hover:text-brand-primary'
              }`}
            >
              Register
            </button>
          </div>

          <div className="w-full flex justify-center">
            {isLogin ? (
              <SignIn routing="hash" forceRedirectUrl="/dashboard" />
            ) : (
              <SignUp routing="hash" forceRedirectUrl="/dashboard" />
            )}
          </div>
          
          <div className="mt-8 text-center border-t border-brand-border pt-8 w-full">
            <p className="text-xs font-bold text-brand-text-muted uppercase tracking-widest">
              Secured by Clerk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
