export interface Doctor {
  id: string;
  name: string;
  email: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  education: string;
  location: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Adrian Thorne",
    email: "khanarsalaan891@gmail.com",
    role: "Chief Implantologist",
    specialty: "12+ Years Excellence",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Thorne is a pioneer in modern implantology, focusing on minimally invasive techniques and immediate loading protocols.",
    education: "DDS, Harvard School of Dental Medicine",
    location: "Downtown Clinic"
  },
  {
    id: "doc-2",
    name: "Dr. Elena Vance",
    email: "khanarsalaan891@gmail.com",
    role: "Cosmetic Specialist",
    specialty: "Smile Design Expert",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Vance transforms smiles using advanced digital planning, porcelain veneers, and state-of-the-art whitening procedures.",
    education: "DMD, University of Pennsylvania",
    location: "Westside Branch"
  },
  {
    id: "doc-3",
    name: "Dr. Marcus Chen",
    email: "khanarsalaan891@gmail.com",
    role: "Orthodontist",
    specialty: "Digital Alignments",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Chen specializes in invisible aligners and complex orthodontic cases, bringing precision and comfort to every patient.",
    education: "DDS, MS Orthodontics, UCLA",
    location: "Downtown Clinic"
  }
];

export const services: Service[] = [
  {
    id: "srv-1",
    title: "General Dentistry",
    description: "Comprehensive check-ups, cleaning, and preventive care for a healthy smile.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400",
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: "srv-2",
    title: "Cosmetic Procedures",
    description: "Teeth whitening, veneers, and smile makeovers tailored to your facial features.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400",
    color: "bg-purple-50 text-purple-600"
  },
  {
    id: "srv-3",
    title: "Orthodontics",
    description: "Invisalign and traditional braces to straighten teeth and improve alignment.",
    image: "https://images.unsplash.com/photo-1516244485186-077d7ffcc360?auto=format&fit=crop&q=80&w=400",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    id: "srv-4",
    title: "Dental Implants",
    description: "Modern tooth replacement solutions that look and feel completely natural.",
    image: "https://images.unsplash.com/photo-1609916518885-af04fbe7935f?auto=format&fit=crop&q=80&w=400",
    color: "bg-orange-50 text-orange-600"
  }
];

export const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
