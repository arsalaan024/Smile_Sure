import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { LogOut, Calendar, FileText, ChevronRight, X, CheckCircle2, Clock3, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock treatment plans the user has "purchased"
const treatmentPlans = [
  {
    id: 1,
    name: "Teeth Whitening Package",
    sessions: 3,
    completedSessions: 2,
    startDate: "Oct 01, 2024",
    nextSession: "Oct 24, 2024",
    status: "active",
    price: "$250",
    doctor: "Dr. Adrian Thorne",
    description: "Professional in-clinic whitening treatment to brighten your smile by up to 8 shades.",
  },
  {
    id: 2,
    name: "Orthodontic Care Plan",
    sessions: 12,
    completedSessions: 12,
    startDate: "Jan 15, 2024",
    nextSession: null,
    status: "completed",
    price: "$2,400",
    doctor: "Dr. Serena Voss",
    description: "Full clear aligner treatment to correct dental misalignment over 12 months.",
  },
  {
    id: 3,
    name: "Periodontal Maintenance",
    sessions: 4,
    completedSessions: 0,
    startDate: "Nov 01, 2024",
    nextSession: "Nov 01, 2024",
    status: "upcoming",
    price: "$600",
    doctor: "Dr. Marcus Ellis",
    description: "Deep cleaning and gum care program to maintain your periodontal health.",
  },
];

const statusConfig = {
  active: { label: "Active", color: "text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20", icon: Clock3 },
  completed: { label: "Completed", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle2 },
  upcoming: { label: "Upcoming", color: "text-blue-600 bg-blue-50 border-blue-200", icon: AlertCircle },
};

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof treatmentPlans[0] | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/auth');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn || !user) return null;

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const [localBookings, setLocalBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smile_sure_bookings') || '[]');
    setLocalBookings(saved);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-brand-border px-6 lg:px-16 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-secondary rounded-[4px]" />
          <span className="text-xl font-extrabold tracking-tighter text-brand-primary uppercase">
            Smile Sure
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <span className="text-sm font-bold text-brand-primary hidden sm:inline-block">
            Welcome, {user.firstName || 'Patient'}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-bold text-red-500 hover:text-red-700 uppercase tracking-widest flex items-center transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-brand-primary uppercase tracking-tight mb-2">Patient Dashboard</h1>
          <p className="text-brand-text-muted font-medium">Manage your appointments and treatment plans.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Upcoming Appointment */}
          <div className="md:col-span-2 bg-white border border-brand-border rounded-[4px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border">
              <h2 className="text-xl font-extrabold text-brand-primary uppercase flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-brand-secondary" /> Upcoming Appointments
              </h2>
              <Link to="/" className="text-xs font-bold text-brand-secondary hover:text-brand-primary uppercase tracking-widest transition-colors flex items-center">
                Book New <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>

            <div className="space-y-6">
              {/* Render local storage bookings */}
              {localBookings.map((booking) => {
                const dateObj = new Date(booking.date);
                const month = dateObj.toLocaleString('en-US', { month: 'short' });
                const day = dateObj.getDate();

                return (
                  <div key={booking.id} className="bg-brand-bg border border-brand-border rounded-[4px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-brand-secondary transition-colors cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="bg-white px-4 py-3 rounded-[2px] shadow-sm text-center border border-brand-border">
                        <span className="block text-brand-secondary text-xs font-black uppercase tracking-widest mb-1">{month}</span>
                        <span className="block text-2xl font-black text-brand-primary">{day}</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-brand-primary uppercase text-lg mb-1">{booking.service}</h3>
                        <p className="text-sm font-medium text-brand-text-muted">with {booking.doctor}</p>
                        <p className="text-xs font-bold text-brand-secondary mt-2 flex items-center">
                          <Clock3 className="w-3 h-3 mr-1" /> {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-[2px] border border-green-200">Paid</span>
                      <button className="w-full sm:w-auto px-6 py-3 border border-brand-border text-brand-text-muted font-bold text-xs uppercase tracking-widest rounded-[2px] hover:bg-white transition-colors cursor-pointer">
                        Reschedule
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Default Mock Appointment */}
              {localBookings.length === 0 && (
                <div className="bg-brand-bg border border-brand-border rounded-[4px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-brand-secondary transition-colors cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="bg-white px-4 py-3 rounded-[2px] shadow-sm text-center border border-brand-border">
                      <span className="block text-brand-secondary text-xs font-black uppercase tracking-widest mb-1">Oct</span>
                      <span className="block text-2xl font-black text-brand-primary">24</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-brand-primary uppercase text-lg mb-1">General Checkup</h3>
                      <p className="text-sm font-medium text-brand-text-muted">with Dr. Adrian Thorne</p>
                      <p className="text-xs font-bold text-brand-secondary mt-2 flex items-center">
                        <Clock3 className="w-3 h-3 mr-1" /> 10:30 AM - 11:15 AM
                      </p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-6 py-3 border border-brand-border text-brand-text-muted font-bold text-xs uppercase tracking-widest rounded-[2px] hover:bg-white transition-colors cursor-pointer">
                    Reschedule
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Treatment Plans Card */}
          <div
            onClick={() => setShowPlans(true)}
            className="bg-white border border-brand-border rounded-[4px] p-6 shadow-sm hover:border-brand-secondary transition-all cursor-pointer group hover:shadow-md"
          >
            <div className="w-10 h-10 bg-brand-bg rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-secondary transition-colors">
              <FileText className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-extrabold text-brand-primary uppercase mb-2">Treatment Plans</h3>
            <p className="text-xs font-medium text-brand-text-muted mb-4">View your prescribed treatments and progress.</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded-[2px] border border-brand-secondary/20">
                {treatmentPlans.filter(p => p.status === 'active').length} Active
              </span>
              <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-1 rounded-[2px] border border-green-200">
                {treatmentPlans.filter(p => p.status === 'completed').length} Completed
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Treatment Plans Modal */}
      <AnimatePresence>
        {showPlans && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowPlans(false); setSelectedPlan(null); }}
              className="absolute inset-0 bg-brand-primary/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-white w-full max-w-2xl rounded-[4px] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-border shrink-0">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-brand-secondary" />
                  <h2 className="text-xl font-extrabold text-brand-primary uppercase tracking-tight">My Treatment Plans</h2>
                </div>
                <button
                  onClick={() => { setShowPlans(false); setSelectedPlan(null); }}
                  className="p-2 hover:bg-brand-bg rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-brand-text-muted" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 p-6">
                <AnimatePresence mode="wait">
                  {selectedPlan ? (
                    // Plan Detail View
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button
                        onClick={() => setSelectedPlan(null)}
                        className="text-sm font-bold text-brand-text-muted hover:text-brand-primary uppercase tracking-wider flex items-center gap-1 mb-6 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Plans
                      </button>

                      <div className="mb-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-2xl font-extrabold text-brand-primary uppercase tracking-tight">{selectedPlan.name}</h3>
                          <span className={`text-xs font-bold px-3 py-1 rounded-[2px] border uppercase tracking-widest shrink-0 ${statusConfig[selectedPlan.status as keyof typeof statusConfig].color}`}>
                            {statusConfig[selectedPlan.status as keyof typeof statusConfig].label}
                          </span>
                        </div>
                        <p className="text-brand-text-muted font-medium leading-relaxed">{selectedPlan.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                          { label: "Doctor", value: selectedPlan.doctor },
                          { label: "Total Cost", value: selectedPlan.price },
                          { label: "Start Date", value: selectedPlan.startDate },
                          { label: "Next Session", value: selectedPlan.nextSession || "—" },
                        ].map(item => (
                          <div key={item.label} className="bg-brand-bg p-4 rounded-[2px] border border-brand-border">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary mb-1">{item.label}</p>
                            <p className="font-bold text-brand-primary text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="bg-brand-bg p-4 rounded-[2px] border border-brand-border">
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-black uppercase tracking-widest text-brand-text-muted">Progress</p>
                          <p className="text-xs font-extrabold text-brand-primary">{selectedPlan.completedSessions}/{selectedPlan.sessions} Sessions</p>
                        </div>
                        <div className="w-full bg-brand-border rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(selectedPlan.completedSessions / selectedPlan.sessions) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-2 bg-brand-secondary rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Plans List View
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {treatmentPlans.map(plan => {
                        const StatusIcon = statusConfig[plan.status as keyof typeof statusConfig].icon;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            className="p-5 border border-brand-border rounded-[4px] hover:border-brand-secondary cursor-pointer transition-all group hover:shadow-md bg-white"
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h4 className="font-extrabold text-brand-primary uppercase text-sm">{plan.name}</h4>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-[2px] border uppercase tracking-widest flex items-center gap-1 shrink-0 ${statusConfig[plan.status as keyof typeof statusConfig].color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {statusConfig[plan.status as keyof typeof statusConfig].label}
                              </span>
                            </div>
                            <p className="text-xs text-brand-text-muted font-medium mb-3 line-clamp-1">{plan.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="w-32 bg-brand-border rounded-full h-1.5">
                                <div
                                  className="h-1.5 bg-brand-secondary rounded-full transition-all"
                                  style={{ width: `${(plan.completedSessions / plan.sessions) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-brand-text-muted">{plan.completedSessions}/{plan.sessions} sessions</span>
                              <ChevronRight className="w-4 h-4 text-brand-text-muted group-hover:text-brand-secondary transition-colors" />
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
