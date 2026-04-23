import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import BookingModal from "./BookingModal";
import { doctors, Doctor } from "../data";

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <section id="doctors" className="py-16 md:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="w-10 h-1 bg-brand-secondary mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 tracking-tighter leading-none">
              Meet the Masters <br />
              <span className="text-brand-secondary underline decoration-brand-border underline-offset-8 font-extrabold">of Oral Wellness.</span>
            </h2>
            <p className="text-brand-text-muted text-base font-medium">
              Our world-class specialists combine clinical precision with an
              artistic approach to smile restoration.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group cursor-pointer"
              onClick={() => setSelectedDoctor(doc)}
            >
              <div className="aspect-[3/4] rounded-[4px] overflow-hidden bg-brand-bg relative mb-6 border border-brand-border">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-brand-primary px-6 py-3 rounded-[2px] font-bold uppercase tracking-widest text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    Book Now
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-brand-secondary/90 backdrop-blur-sm px-4 py-2 rounded-[2px] inline-block mb-2">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">{doc.specialty}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-brand-primary uppercase tracking-tight">{doc.name}</h3>
              <p className="text-[12px] font-bold text-brand-text-muted uppercase tracking-[0.2em] mt-1">{doc.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDoctor && (
        <BookingModal
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          initialDoctor={selectedDoctor}
        />
        )}
      </AnimatePresence>
    </section>
  );
}
