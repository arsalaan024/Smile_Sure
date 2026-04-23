import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 lg:pt-0 lg:pb-0 bg-brand-primary overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img 
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Dental Technology" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        {/* Dark Premium Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-brand-primary/70 z-10 lg:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-12 h-1.5 bg-brand-secondary mb-8" />
            
            <h1 className="text-5xl md:text-6xl lg:text-[84px] font-black text-white leading-[0.95] mb-8 tracking-tighter uppercase">
              Precision <br />
              Meets <br />
              Perfection.
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed font-semibold uppercase tracking-tight">
              A higher standard of digital dentistry. We combine surgical precision 
              with artistic excellence to create your sustainable smile.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#0284c7" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-secondary text-white px-10 py-5 rounded-[2px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand-secondary/30 cursor-pointer"
              >
                Schedule Inquiry
              </motion.button>
              
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-[2px] font-black text-sm uppercase tracking-[0.2em] text-white hover:bg-white hover:text-brand-primary transition-all border-2 border-white/30 cursor-pointer"
              >
                Our Services
              </button>
            </div>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
          >
            <div>
              <span className="block text-3xl font-black text-white mb-1">99.8%</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/50">Success Rate</span>
            </div>
            <div>
              <span className="block text-3xl font-black text-white mb-1">2.4k</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/50">Implants</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
