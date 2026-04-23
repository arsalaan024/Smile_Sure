import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Star, MapPin, CheckCircle2, ChevronLeft, CreditCard, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { Doctor, Service, doctors, services, timeSlots } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctor?: Doctor | null;
  initialService?: Service | null;
}

type Step = "doctor_profile" | "select_doctor" | "select_service" | "select_datetime" | "payment" | "success";

export default function BookingModal({ isOpen, onClose, initialDoctor, initialService }: BookingModalProps) {
  const [step, setStep] = useState<Step>("doctor_profile");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedDoctor(initialDoctor || null);
      setSelectedService(initialService || null);
      setSelectedDate("");
      setSelectedTime("");
      
      if (initialDoctor) {
        setStep("doctor_profile");
      } else if (initialService) {
        setStep("select_doctor");
      } else {
        setStep("select_service");
      }
    }
  }, [isOpen, initialDoctor, initialService]);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    if (!selectedDoctor) {
      setStep("select_doctor");
    } else {
      setStep("select_datetime");
    }
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    if (!selectedService) {
      setStep("select_service");
    } else {
      setStep("select_datetime");
    }
  };

  const handleBook = () => {
    if (selectedDate && selectedTime && selectedDoctor && selectedService) {
      setStep("payment");
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    // Simulate API call to Stripe
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep("success");
    }, 1500);
  };

  const handleBack = () => {
    if (step === "payment") {
      setStep("select_datetime");
    } else if (step === "select_datetime") {
      if (initialDoctor) setStep("select_service");
      else if (initialService) setStep("select_doctor");
      else setStep("select_doctor");
    } else if (step === "select_service" && initialDoctor) {
      setStep("doctor_profile");
    } else if (step === "select_doctor" && initialService) {
      // no-op, can't go back from first step
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-primary/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-white rounded-[4px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-gray-100 rounded-full z-10 transition-colors"
        >
          <X className="w-6 h-6 text-brand-primary" />
        </button>

        {/* Left Visual Section */}
        <div className="md:w-2/5 relative bg-brand-bg hidden md:block border-r border-brand-border">
          {selectedDoctor && (step === "doctor_profile" || step === "select_service" || step === "select_datetime" || step === "success") ? (
            <>
              <img 
                src={selectedDoctor.image} 
                alt={selectedDoctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-4xl font-extrabold uppercase tracking-tight mb-2">{selectedDoctor.name}</h3>
                  <p className="text-brand-secondary font-bold uppercase tracking-[0.2em] text-sm">{selectedDoctor.role}</p>
                </div>
              </div>
            </>
          ) : selectedService && (step === "select_doctor") ? (
             <>
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 to-brand-primary/20 flex items-end p-8">
                <div className="text-white">
                  <span className="text-brand-secondary font-black uppercase tracking-[0.3em] text-[10px] bg-white/10 px-3 py-1 rounded-[2px] mb-3 inline-block">Selected Service</span>
                  <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-2">{selectedService.title}</h3>
                  <p className="text-white/80 font-medium text-sm line-clamp-3">{selectedService.description}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-brand-primary flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-brand-secondary" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4 uppercase">Book Your <br/>Appointment</h3>
              <p className="text-brand-text-muted">Select your preferences to schedule a consultation with our experts.</p>
            </div>
          )}
        </div>

        {/* Right Content Section */}
        <div className="md:w-3/5 flex flex-col h-full overflow-y-auto">
          <div className="p-8 md:p-10 flex-1 relative">
            
            {(step === "select_service" || step === "select_datetime" || step === "payment") && (
              <button 
                onClick={handleBack}
                className="absolute top-8 left-8 p-2 text-brand-text-muted hover:text-brand-primary transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider z-10"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}

            <div className={`h-full ${step !== "doctor_profile" ? "pt-8" : ""}`}>
              {/* STEP: DOCTOR PROFILE */}
              {step === "doctor_profile" && selectedDoctor && (
                <div className="h-full flex flex-col">
                  {/* Mobile Header */}
                  <div className="md:hidden mb-6 flex items-center gap-4">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-secondary" />
                    <div>
                      <h3 className="text-xl font-extrabold uppercase tracking-tight text-brand-primary">{selectedDoctor.name}</h3>
                      <p className="text-brand-text-muted font-bold uppercase tracking-[0.1em] text-xs">{selectedDoctor.role}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-brand-primary mb-3">About Dr. {selectedDoctor.name.split(' ')[1]}</h4>
                    <p className="text-brand-text-muted leading-relaxed text-sm md:text-base">{selectedDoctor.bio}</p>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-brand-primary font-semibold bg-brand-bg p-3 rounded-[2px] border border-brand-border">
                        <Star className="w-4 h-4 text-brand-secondary" /> 
                        <span>{selectedDoctor.education}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-brand-primary font-semibold bg-brand-bg p-3 rounded-[2px] border border-brand-border">
                        <MapPin className="w-4 h-4 text-brand-secondary" /> 
                        <span>{selectedDoctor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-brand-border">
                    <button
                      onClick={() => setStep("select_service")}
                      className="w-full py-4 rounded-[2px] font-extrabold uppercase tracking-widest bg-brand-secondary text-white hover:bg-brand-primary shadow-lg hover:shadow-xl transition-all"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}

              {/* STEP: SELECT DOCTOR */}
              {step === "select_doctor" && (
                <div className="h-full flex flex-col">
                  <h4 className="text-2xl font-extrabold text-brand-primary uppercase mb-2">Select a Doctor</h4>
                  <p className="text-brand-text-muted mb-8 font-medium">Choose a specialist for your {selectedService?.title}.</p>
                  
                  <div className="space-y-4 overflow-y-auto pr-2 pb-4">
                    {doctors.map(doc => (
                      <div 
                        key={doc.id}
                        onClick={() => handleSelectDoctor(doc)}
                        className="p-4 border border-brand-border rounded-[4px] hover:border-brand-secondary cursor-pointer transition-all flex items-center gap-4 group hover:shadow-md bg-white"
                      >
                        <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-brand-secondary transition-all" />
                        <div className="flex-1">
                          <h5 className="font-extrabold text-brand-primary uppercase text-sm">{doc.name}</h5>
                          <p className="text-[11px] font-bold text-brand-text-muted uppercase tracking-[0.1em] mb-2">{doc.role}</p>
                          <div className="flex items-center gap-3 text-xs text-brand-text-muted">
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-brand-secondary"/> {doc.education.split(',')[0]}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-secondary"/> {doc.location.split(',')[0]}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-secondary group-hover:border-brand-secondary group-hover:text-white transition-all">
                          <ChevronLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP: SELECT SERVICE */}
              {step === "select_service" && (
                <div className="h-full flex flex-col">
                  <h4 className="text-2xl font-extrabold text-brand-primary uppercase mb-2">Select Service</h4>
                  <p className="text-brand-text-muted mb-8 font-medium">What type of appointment are you looking for?</p>
                  
                  <div className="grid grid-cols-1 gap-3 overflow-y-auto pb-4">
                    {services.map(srv => (
                      <div 
                        key={srv.id}
                        onClick={() => handleSelectService(srv)}
                        className="p-4 border border-brand-border rounded-[4px] hover:border-brand-secondary cursor-pointer transition-all flex items-center justify-between group hover:shadow-md bg-white"
                      >
                        <div>
                          <h5 className="font-extrabold text-brand-primary uppercase text-sm mb-1">{srv.title}</h5>
                          <p className="text-xs text-brand-text-muted line-clamp-1">{srv.description}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-secondary group-hover:border-brand-secondary group-hover:text-white transition-all ml-4 shrink-0">
                          <ChevronLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP: SELECT DATETIME */}
              {step === "select_datetime" && (
                <div className="h-full flex flex-col">
                  <div className="mb-6 p-4 bg-brand-bg border border-brand-border rounded-[4px] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary mb-1">Service</p>
                      <p className="font-bold text-brand-primary text-sm">{selectedService?.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary mb-1">Doctor</p>
                      <p className="font-bold text-brand-primary text-sm">{selectedDoctor?.name}</p>
                    </div>
                  </div>

                  <h4 className="text-xl font-extrabold text-brand-primary uppercase mb-6">Choose Date & Time</h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-brand-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full border border-brand-border rounded-[2px] px-4 py-3 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary bg-brand-bg text-brand-primary font-medium"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-brand-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Time
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 border rounded-[2px] font-bold text-sm transition-all ${
                            selectedTime === time 
                              ? "bg-brand-primary text-white border-brand-primary shadow-md" 
                              : "border-brand-border text-brand-text-muted hover:border-brand-secondary hover:text-brand-primary bg-white"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={handleBook}
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full py-4 rounded-[2px] font-extrabold uppercase tracking-widest transition-all ${
                        selectedDate && selectedTime
                          ? "bg-brand-secondary text-white hover:bg-brand-primary shadow-lg hover:shadow-xl"
                          : "bg-brand-border text-brand-text-muted cursor-not-allowed"
                      }`}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* STEP: PAYMENT */}
              {step === "payment" && (
                <div className="h-full flex flex-col">
                  <div className="mb-6 p-4 bg-brand-bg border border-brand-border rounded-[4px]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">Consultation Deposit</span>
                      <span className="font-extrabold text-brand-primary">$50.00</span>
                    </div>
                    <div className="text-sm font-medium text-brand-text-muted">
                      {selectedService?.title} with {selectedDoctor?.name} on {selectedDate} at {selectedTime}
                    </div>
                  </div>

                  <h4 className="text-xl font-extrabold text-brand-primary uppercase mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-secondary" /> Payment Details
                  </h4>
                  
                  <form onSubmit={handlePayment} className="flex flex-col flex-1">
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Card Information</label>
                        <div className="border border-brand-border rounded-[2px] overflow-hidden">
                          <input 
                            type="text" 
                            placeholder="Card number"
                            className="w-full px-4 py-3 border-b border-brand-border focus:outline-none focus:bg-brand-bg font-medium"
                            required
                          />
                          <div className="flex">
                            <input 
                              type="text" 
                              placeholder="MM / YY"
                              className="w-1/2 px-4 py-3 border-r border-brand-border focus:outline-none focus:bg-brand-bg font-medium"
                              required
                            />
                            <input 
                              type="text" 
                              placeholder="CVC"
                              className="w-1/2 px-4 py-3 focus:outline-none focus:bg-brand-bg font-medium"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Name on card</label>
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          className="w-full border border-brand-border rounded-[2px] px-4 py-3 focus:outline-none focus:bg-brand-bg font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold text-brand-text-muted uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> Secured by Stripe
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessingPayment}
                        className={`w-full py-4 rounded-[2px] font-extrabold uppercase tracking-widest transition-all flex items-center justify-center ${
                          isProcessingPayment
                            ? "bg-brand-secondary/70 text-white cursor-not-allowed"
                            : "bg-brand-secondary text-white hover:bg-brand-primary shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {isProcessingPayment ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                        ) : (
                          <><Lock className="w-4 h-4 mr-2" /> Pay $50.00 & Confirm</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP: SUCCESS */}
              {step === "success" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-brand-primary mb-4 uppercase tracking-tight">Booking Confirmed!</h3>
                  <p className="text-brand-text-muted mb-8 max-w-sm font-medium leading-relaxed">
                    Your <strong className="text-brand-primary">{selectedService?.title}</strong> appointment with <strong className="text-brand-primary">{selectedDoctor?.name}</strong> has been scheduled for <br/>
                    <strong className="text-brand-primary text-lg inline-block mt-2">{selectedDate} at {selectedTime}</strong>.
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-brand-primary text-white px-8 py-4 w-full sm:w-auto rounded-[2px] font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors shadow-lg"
                  >
                    Return to site
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
