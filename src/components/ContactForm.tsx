import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.service) newErrors.service = "Please select a service";
    
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await emailjs.send(
        'service_c3vyxlw',
        'template_8hlokvj',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          title: formData.service,
          message: formData.message,
          name: formData.name,
          email: formData.email,
        },
        'WentrFCB7vXzKxnR_'
      );
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setIsSubmitting(false);
      setSubmitError("Failed to send message. Please try again.");
      setTimeout(() => setSubmitError(""), 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-brand-border rounded-[4px] shadow-2xl shadow-brand-primary/5 overflow-hidden flex flex-col md:flex-row">
      {/* Contact Info Sidebar */}
      <div className="md:w-1/3 bg-brand-primary p-10 text-white flex flex-col justify-between">
        <div>
          <div className="w-8 h-1 bg-brand-secondary mb-6" />
          <h3 className="text-2xl font-extrabold uppercase tracking-tighter mb-4">Get in Touch</h3>
          <p className="text-brand-text-muted text-sm font-medium leading-relaxed">
            Our team is here to assist with any questions regarding treatments, 
            financing, or appointments.
          </p>
        </div>
        
        <div className="space-y-4 pt-10">
          <div className="flex items-center space-x-3 text-brand-text-muted">
            <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
            <span className="text-[11px] font-bold uppercase tracking-widest">24/7 Response</span>
          </div>
          <div className="flex items-center space-x-3 text-brand-text-muted">
            <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Insurance Verified</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-10 relative">
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-10 text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-brand-primary uppercase tracking-tighter mb-2">Message Received</h4>
              <p className="text-brand-text-muted font-medium">We'll get back to you within 24 hours.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-[11px] font-black uppercase tracking-widest text-brand-secondary border-b-2 border-brand-secondary/20 pb-1"
              >
                Send Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-brand-bg border ${errors.name ? 'border-red-400' : 'border-brand-border'} rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-brand-secondary transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />}
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-brand-bg border ${errors.email ? 'border-red-400' : 'border-brand-border'} rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-brand-secondary transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />}
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted block">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-brand-bg border ${errors.phone ? 'border-red-400' : 'border-brand-border'} rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-brand-secondary transition-colors`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.phone}</p>}
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted block">Interest In</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full bg-brand-bg border ${errors.service ? 'border-red-400' : 'border-brand-border'} rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-brand-secondary transition-colors appearance-none cursor-pointer`}
              >
                <option value="">Select Service</option>
                <option value="general">General Dentistry</option>
                <option value="cosmetic">Cosmetic Procedure</option>
                <option value="ortho">Orthodontics</option>
                <option value="implants">Dental Implants</option>
              </select>
              {errors.service && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.service}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted block">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full bg-brand-bg border ${errors.message ? 'border-red-400' : 'border-brand-border'} rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-brand-secondary transition-colors resize-none`}
              placeholder="Tell us about your dental needs..."
            />
            {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-brand-primary text-white py-5 rounded-[2px] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-secondary shadow-lg shadow-brand-primary/10'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Processing...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
