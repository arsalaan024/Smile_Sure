import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Patient since 2021",
    content: "The environment is so calming, and the staff is incredibly professional. I've never felt more at ease in a dental chair. Truly a premium experience.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Marcus Thompson",
    role: "Invisalign Treatment",
    content: "Transparent pricing and amazing results. Lumina Dental transformed my smile in less than 8 months. Highly recommend their orthodontics team.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 bg-brand-bg border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <div className="w-10 h-1 bg-brand-secondary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4 tracking-tight">Voices of Trust</h2>
          <p className="text-brand-text-muted font-medium text-sm md:text-base">
            Join the community of over 10,000 satisfied patients who trust 
            our precision approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-12 border border-brand-border rounded-[4px] shadow-sm flex flex-col relative"
            >
              <div className="flex items-center space-x-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-secondary fill-brand-secondary" />
                ))}
              </div>

              <p className="text-xl text-brand-text-main font-medium mb-12 leading-relaxed">
                "{t.content}"
              </p>

              <div className="flex items-center space-x-4 mt-auto pt-8 border-t border-brand-border">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-brand-primary uppercase tracking-wider text-[11px]">{t.name}</p>
                  <p className="text-brand-text-muted text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
