import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import BookingModal from "./BookingModal";
import { services, Service } from "../data";

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-16 md:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="w-10 h-1 bg-brand-secondary mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 tracking-tighter leading-none uppercase">
              Precision Services <br />
              For Your Perfect Smile.
            </h2>
            <p className="text-brand-text-muted text-base leading-relaxed font-medium">
              We offer a wide range of specialized services using the latest 
              digital imaging and minimally invasive treatments.
            </p>
          </div>
          <button className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-primary flex items-center group">
            Browse Procedures <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-brand-border rounded-[4px] hover:border-brand-secondary transition-all flex flex-col group h-full overflow-hidden cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-colors" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-secondary font-bold text-sm">
                  0{index + 1}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white text-brand-primary px-6 py-3 rounded-[2px] font-bold uppercase tracking-widest text-[10px] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                     Book Now
                   </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-lg font-extrabold text-brand-primary mb-4 uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-brand-text-muted text-[12px] leading-relaxed mb-8 flex-grow font-medium">
                  {service.description}
                </p>
                <button className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary inline-flex items-center self-start border-b-2 border-brand-secondary/20 pb-1 hover:border-brand-secondary transition-colors">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <BookingModal 
            isOpen={!!selectedService} 
            onClose={() => setSelectedService(null)} 
            initialService={selectedService} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
