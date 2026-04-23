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
    name: "Dr. Sameer Malhotra",
    email: "khanarsalaan891@gmail.com",
    role: "Chief Implantologist",
    specialty: "15+ Years Excellence",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Sameer is a pioneer in modern implantology in India, focusing on minimally invasive techniques and immediate loading protocols.",
    education: "BDS, MDS, AIIMS Delhi",
    location: "Main Branch, Mumbai"
  },
  {
    id: "doc-2",
    name: "Dr. Ananya Sharma",
    email: "khanarsalaan891@gmail.com",
    role: "Cosmetic Specialist",
    specialty: "Smile Design Expert",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Ananya transforms smiles using advanced digital planning, porcelain veneers, and state-of-the-art whitening procedures.",
    education: "MDS, Manipal College of Dental Sciences",
    location: "Bandra Clinic"
  },
  {
    id: "doc-3",
    name: "Dr. Rahul Kapoor",
    email: "khanarsalaan891@gmail.com",
    role: "Orthodontist",
    specialty: "Digital Alignments",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    bio: "Dr. Rahul specializes in invisible aligners and complex orthodontic cases, bringing precision and comfort to every patient.",
    education: "BDS, MDS, King George's Medical University",
    location: "Main Branch, Mumbai"
  }
];

export const services: Service[] = [
  {
    id: "srv-1",
    title: "General Dentistry",
    description: "Comprehensive check-ups, cleaning, and preventive care for a healthy smile.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffce47267a5?auto=format&fit=crop&q=80&w=600",
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: "srv-2",
    title: "Cosmetic Procedures",
    description: "Teeth whitening, veneers, and smile makeovers tailored to your facial features.",
    image: "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?auto=format&fit=crop&q=80&w=600",
    color: "bg-purple-50 text-purple-600"
  },
  {
    id: "srv-3",
    title: "Orthodontics",
    description: "Invisalign and traditional braces to straighten teeth and improve alignment.",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&q=80&w=600",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    id: "srv-4",
    title: "Dental Implants",
    description: "Modern tooth replacement solutions that look and feel completely natural.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    color: "bg-orange-50 text-orange-600"
  }
];

export const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
