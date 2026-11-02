import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Compass,
  Droplets,
  Leaf,
  Heart,
  ShieldCheck,
  LifeBuoy,
  Car,
  Utensils,
  Award,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Send,
  Lock,
  ArrowRight,
  BookOpen,
  Filter,
  Check,
  GraduationCap,
  Building2,
  X,
  MessageCircle,
  BadgeCheck,
  Shield,
  User,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';

// 9 Core Signature Programs
const signaturePrograms = [
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    category: 'Education & Mentorship',
    icon: Compass,
    image: '/images/volunteers_mentorship.jpg',
    color: 'from-blue-600 to-indigo-700',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-200',
    description:
      'Making informed career choices is a critical step in a student’s life, and GSG Trust recognizes the importance of guiding and empowering young minds.',
    details:
      'We conduct systematic orientation sessions, cut-off assessments, 7.5% reservation counselling, and college course mapping for Class 10 and Class 12 students across Tamil Nadu government and corporation schools.',
    link: 'https://www.gsgtrust.in/p-Carreerguidance.html',
    badge: 'Flagship Program',
  },
  {
    id: 'thaagam-theerpom',
    title: 'Thaagam Theerpom',
    category: 'Water & Public Welfare',
    partner: 'Collaboration with Radio City',
    icon: Droplets,
    image: '/images/programs_overview.jpg',
    color: 'from-cyan-600 to-blue-700',
    lightBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description:
      'In a world where water scarcity poses a growing challenge, the need for collective action and innovative solutions become paramount.',
    details:
      'Organized in collaboration with Radio City, this campaign addresses acute drinking water scarcity through community water pots, borewell restorations, public awareness rallies, and purified water distribution points during harsh summers.',
    link: 'https://www.gsgtrust.in/p-Thaagamtheerpom.html',
    badge: 'Radio City Partner',
  },
  {
    id: 'green-initiatives',
    title: "GSG's Green Initiatives",
    category: 'Environment & Ecology',
    icon: Leaf,
    image: '/images/volunteers_field_work.jpg',
    color: 'from-emerald-600 to-teal-700',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Their efforts to save the environment encompass a range of initiatives, including pond cleaning, extensive plantation drives, and creative methods like growing plants in coconut shells.',
    details:
      'Over 10,000+ native saplings planted across rural Tamil Nadu, lake clean-ups with youth volunteers, and eco-friendly urban gardening methods using discarded coconut shells to foster ecological consciousness.',
    link: 'https://www.gsgtrust.in/p-Greenini.html',
    badge: '10,000+ Trees',
  },
  {
    id: 'blood-donation',
    title: "GSG's Lifesaving Mission",
    category: 'Healthcare & Emergencies',
    icon: Heart,
    image: '/images/blood_donation_drive.jpg',
    color: 'from-rose-600 to-red-700',
    lightBg: 'bg-rose-50 text-rose-700 border-rose-200',
    description:
      'Blood donation is a lifeline for countless individuals facing medical emergencies, surgeries, and critical health conditions. Donating blood is a selfless act that can save lives and provide hope to patients in need.',
    details:
      'Understanding the importance of a strong blood supply, GSG Trust has undertaken numerous blood donation drives in both government and private hospitals.',
    link: 'https://www.gsgtrust.in/p-Blooddon.html',
    badge: 'Save Lives • Donate Blood',
  },
  {
    id: 'agni-thaaragai',
    title: 'Agni Thaaragai',
    category: 'Women Safety & Empowerment',
    icon: ShieldCheck,
    image: '/images/agni_thaaragai.jpg',
    color: 'from-purple-600 to-pink-700',
    lightBg: 'bg-purple-50 text-purple-700 border-purple-200',
    description:
      'In today’s society, it’s crucial for individuals, especially young girls, to feel confident in their ability to protect themselves if the need arises.',
    details:
      'Practical self-defense training, martial arts techniques, situational awareness, and psychological confidence building imparted to thousands of girl students in schools and colleges.',
    link: 'https://www.gsgtrust.in/p-Agnithar.html',
    badge: 'Self-Defense',
  },
  {
    id: 'flood-relief',
    title: 'Flood Relief in Kerala',
    category: 'Disaster Relief & Humanitarian',
    icon: LifeBuoy,
    image: '/images/flood_relief_camp.jpg',
    color: 'from-blue-600 to-cyan-700',
    lightBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    description:
      'In the face of adversity, compassion and solidarity shine the brightest. In 2018, the southern Indian state of Kerala faced one of the most devastating floods in its history. Thousands of families lost their homes, belongings, and livelihoods, forcing them to rebuild their lives from the ground up.',
    details:
      'During this difficult period, GSG Trust, in collaboration with the Youth Foundation, stepped forward to support the flood-affected communities. Driven by humanitarian values and social responsibility, the team took swift action to provide relief materials, food supplies, and essential assistance to the families impacted by the disaster.',
    link: '',
    badge: 'Disaster Relief',
  },
  {
    id: 'traffic-awareness',
    title: 'Traffic Awareness Program',
    category: 'Civic Responsibility',
    icon: Car,
    image: '/images/volunteers_field_work.jpg',
    color: 'from-slate-700 to-slate-900',
    lightBg: 'bg-slate-100 text-slate-700 border-slate-300',
    description:
      'Road accidents are a major cause of injury and loss of life worldwide. Traffic awareness programs play a vital role in educating individuals about safe driving practices, responsible road behavior, and the importance of following traffic rules and regulations.',
    details:
      'GSG has actively organized road safety awareness initiatives in collaboration with the Youth Foundation to promote responsible citizenship and create safer roads for everyone. Through awareness rallies, public campaigns, and educational activities, the program encourages people to adopt safe and disciplined traffic habits.',
    link: 'https://www.gsgtrust.in/p-Trafaware.html',
    badge: 'Road Safety',
  },
  {
    id: 'feed-the-needy',
    title: 'Feed the Needy',
    category: 'Hunger Relief',
    partner: 'In association with Jeeva Shanthi Trust',
    icon: Utensils,
    image: '/images/programs_overview.jpg',
    color: 'from-orange-600 to-amber-700',
    lightBg: 'bg-orange-50 text-orange-700 border-orange-200',
    description:
      'GSG Trust in association with Jeeva Shanthi Trust, recently came together to provide essential food assistance to those in need.',
    details:
      'Joint initiative providing freshly prepared, hygienic meals, grocery packages, and drinking water packets to destitute persons, pavement dwellers, and disadvantaged families.',
    link: 'https://www.gsgtrust.in/p-FTN.html',
    badge: 'Food Support',
  },
  {
    id: 'i-2024',
    title: 'I-2024 Educational Grants',
    category: 'Scholarships & Grants',
    quote: '"If you don\'t build your dreams, someone else will hire you to help them build theirs."',
    icon: Award,
    image: '/images/volunteers_mentorship.jpg',
    color: 'from-yellow-600 to-amber-700',
    lightBg: 'bg-amber-50 text-amber-800 border-amber-200',
    description:
      '"If you don\'t build your dreams, someone else will hire you to help them build theirs." GSG Educational Grants: Investing in Knowledge.',
    details:
      'Annual higher education grants and financial sponsorships awarded to promising, economically challenged students entering engineering, medicine, arts, and science degrees.',
    link: 'https://www.gsgtrust.in/p-I2024.html',
    badge: 'Higher Ed Grants',
  },
  {
    id: 'little-hearts',
    title: 'Little Hearts',
    category: 'Community & Children',
    icon: Heart,
    image: '/images/programs_overview.jpg',
    color: 'from-rose-500 to-pink-700',
    lightBg: 'bg-rose-50 text-rose-700 border-rose-200',
    description:
      'We conducted cultural events, games, and engaging activities in collaboration with Youth Foundation to bring happiness and emotional support to children and communities.',
    details:
      'These events became a heartwarming celebration of compassion, unity, and care. Volunteers from different walks of life came together to organize activities, distribute gifts, and create joyful memories for every child. Through "Little Hearts," bonds were strengthened, smiles were shared, and hope blossomed in the hearts of many young lives.',
    link: '',
    badge: 'Youth Foundation Partnered',
  },
];

// Workshops & Seminars
const upcomingWorkshops = [
  {
    id: 'workshop-1',
    mode: 'In-person',
    status: 'Registration Open',
    title: 'School to Career Guidance Camp — Coimbatore District',
    description:
      'Comprehensive orientation for Class 10 & 12 government school students on course options, entrance exams, and 7.5% reservation benefits.',
    date: 'Thu, 15 Oct, 2026',
    time: '03:00 pm - 09:30 pm',
    venue: 'Corporation Higher Secondary School Auditorium, Rathinapuri, Coimbatore',
    target: 'Class 10, 11 & 12 Government & Corporation School Students',
  },
  {
    id: 'workshop-2',
    mode: 'Hybrid',
    status: 'Registration Open',
    title: 'CYSTEM-100: Higher Education & Engineering Cutoff Masterclass',
    description:
      'Step-by-step guidance on TNEA engineering counselling, cut-off calculations, college prioritization, and GSG Trust scholarship application.',
    date: 'Thu, 22 Oct, 2026',
    time: '03:30 pm - 07:00 pm',
    venue: 'Online via Live Interactive Webinar & GSG Trust Centre',
    target: 'Class 12 Science/Maths Students and Parents',
  },
  {
    id: 'workshop-3',
    mode: 'In-person',
    status: 'Registration Open',
    title: 'Allied Health Sciences & Medical Careers Orientation',
    description:
      'Expert panel session on Nursing, Physiotherapy, Lab Technology, and Pharmacy prospects in Tamil Nadu and abroad.',
    date: 'Thu, 5 Nov, 2026',
    time: '03:30 pm - 07:30 pm',
    venue: 'GSG Trust Main Hall, Coimbatore',
    target: 'Biology/Science Stream Students',
  },
];

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
];

export default function ProgramsPage() {
  const { slug } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'In-person' | 'Online' | 'Hybrid'>('All');
  const [modalProgram, setModalProgram] = useState<any | null>(null);

  // Workshop Registration Modal State
  const [registeringWorkshop, setRegisteringWorkshop] = useState<any | null>(null);
  const [workshopRegistered, setWorkshopRegistered] = useState(false);
  const [workshopStudent, setWorkshopStudent] = useState({ name: '', phone: '', school: '' });

  // 1-on-1 Counselling Form State
  const [counsellingForm, setCounsellingForm] = useState({
    fullName: '',
    schoolName: '',
    mobileNumber: '',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM - 11:00 AM',
    query: '',
  });
  const [counsellingSubmitted, setCounsellingSubmitted] = useState(false);
  const [counsellingLoading, setCounsellingLoading] = useState(false);
  const [counsellingRef, setCounsellingRef] = useState('');

  const filteredWorkshops =
    selectedFilter === 'All'
      ? upcomingWorkshops
      : upcomingWorkshops.filter((w) => w.mode === selectedFilter);

  const handleCounsellingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellingForm.mobileNumber || counsellingForm.mobileNumber.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    setCounsellingLoading(true);
    const ref = `GSG-CNS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setCounsellingRef(ref);

    setTimeout(() => {
      setCounsellingLoading(false);
      setCounsellingSubmitted(true);
    }, 700);
  };

  const handleWorkshopRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkshopRegistered(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-800 text-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400 font-semibold">Programs</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Serving Tamil Nadu Youth Since 2013</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            GSG Trust Programmes • Serving Since 2013
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Programs</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            From free career guidance and student scholarships to ecological conservation and disaster relief, GSG Trust empowers students and uplifts communities across Tamil Nadu and beyond.
          </p>

          {/* Trust Profile Callout */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-3xl mx-auto mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-serif italic text-amber-300 shadow-xl">
            &ldquo;GSG Trust is a youthful NGO body, serving the society from the year 2013, we have more than 500 volunteers who are from destitute prudent foundations and committed themselves to serve the society.&rdquo;
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a href="#signature-programs">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 font-bold px-7 rounded-xl shadow-lg shadow-amber-500/20">
                Signature Programs
              </Button>
            </a>
            <a href="#workshops">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold px-7 rounded-xl transition-all shadow-md"
              >
                Free Student Workshops
              </Button>
            </a>
            <a href="#counselling">
              <Button
                size="lg"
                className="bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 font-semibold px-6 rounded-xl"
              >
                1-on-1 Career Counselling
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Multi-Panel Overview Image Banner */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <img
              src="/images/programs_overview.jpg"
              alt="GSG Trust 3 Key Pillars: Student Mentorship, Tree Plantation Drive, and Community Drinking Water Aid"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 9 Core Signature Programs Section */}
      <section id="signature-programs" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Signature Initiatives
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              GSG Trust Programs
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Empowering students through education, protecting our environment, and providing compassionate community aid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {signaturePrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <Card
                  key={prog.id}
                  className="border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden flex flex-col group bg-white"
                >
                  {/* Card Header */}
                  <div className={`p-6 bg-gradient-to-r ${prog.color} text-white relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-black/25 flex items-center justify-center text-white shadow">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 bg-black/25 text-white rounded-full text-xs font-bold">
                        {prog.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{prog.title}</h3>
                    <p className="text-xs text-white/90 font-semibold mt-1">{prog.category}</p>
                    {prog.partner && (
                      <p className="text-xs text-amber-300 font-bold mt-1.5 flex items-center gap-1">
                        ★ {prog.partner}
                      </p>
                    )}
                  </div>

                  {/* Optional Image Thumbnail */}
                  {prog.image && (
                    <div className="h-44 w-full overflow-hidden relative border-b border-slate-100 bg-slate-100">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{prog.description}</p>
                    <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-100 pt-3">
                      {prog.details}
                    </p>

                    {prog.quote && (
                      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 font-serif italic">
                        {prog.quote}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-start">
                      <button
                        onClick={() => setModalProgram(prog)}
                        className="text-amber-600 hover:text-amber-700 text-sm font-bold flex items-center gap-1.5 transition-colors"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Student Workshops & Seminars */}
      <section id="workshops" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Career Guidance Programmes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Free Student Workshops & Seminars
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
              Discover upcoming career guidance sessions, School-to-Career camps, and higher education cut-off masterclasses organized by GSG Trust across Tamil Nadu schools and online.
            </p>

            {/* Mode Filter Bar */}
            <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Mode:
              </span>
              {(['All', 'In-person', 'Online', 'Hybrid'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedFilter(mode)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedFilter === mode
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Workshop Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredWorkshops.map((ws) => (
              <Card
                key={ws.id}
                className="border border-slate-200/90 shadow-md hover:shadow-xl transition-all rounded-3xl bg-white overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ws.mode === 'In-person'
                          ? 'bg-blue-100 text-blue-800'
                          : ws.mode === 'Hybrid'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {ws.mode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {ws.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{ws.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{ws.description}</p>

                  <div className="space-y-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-medium text-slate-800">{ws.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{ws.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{ws.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                    <strong className="text-slate-700">Target:</strong> {ws.target}
                  </div>
                  <Button
                    onClick={() => {
                      setRegisteringWorkshop(ws);
                      setWorkshopRegistered(false);
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2.5 rounded-xl shadow-sm"
                  >
                    Register Free Seat
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 mt-8 font-medium">
            Free · No Middlemen · 100% Student-Centric across Tamil Nadu
          </p>
        </div>
      </section>

      {/* 1-on-1 Career Counselling Section */}
      <section id="counselling" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider block">
                  Personal Guidance
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  1-on-1 Career Counselling
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Confidential, personalized guidance from certified educators and counsellors. Discuss cut-offs, course suitability, college fee comparisons, and government quota options.
                </p>
              </div>

              {/* What to Expect Box */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">What to Expect in Your Session:</h3>
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900">Personal Cut-Off Analysis:</strong> Determine your realistic chances across Engineering, Medical, and Arts colleges.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900">Fee Structure Verification:</strong> Compare authentic annual tuition, exam, and hostel charges across institutions.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900">7.5% Govt School Quota Guidance:</strong> Step-by-step application advice for government school alumni.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-slate-900">GSG Scholarship Nomination:</strong> Direct assessment for up to ₹10,000 scholarship aid.
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue details */}
              <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <h4 className="font-extrabold text-amber-900 text-sm">Counselling Venue:</h4>
                <p className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    GSG Trust Main Centre, Rathinapuri, Coimbatore - 641027.<br />
                    <span className="italic text-slate-500 text-xs">(Online/telephonic counselling also available on request)</span>
                  </span>
                </p>

                <div className="pt-2 border-t border-amber-200/60">
                  <h5 className="font-bold text-amber-900 text-xs uppercase tracking-wider">Need Immediate Assistance?</h5>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    You can call our student helpline directly Monday to Saturday between 9:30 AM and 6:00 PM.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="tel:+919789340230"
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1.5"
                    >
                      <Phone className="w-4 h-4 text-amber-600" /> +91-97893 40230
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href="https://wa.me/919789340230?text=Hello%20GSG%20Trust,%20I%20want%20to%20schedule%20a%20career%20counselling%20appointment."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Chat →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Booking Form */}
            <div className="lg:col-span-7">
              <Card className="border border-slate-200/90 shadow-2xl rounded-3xl overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white border-b border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                      Appointment Booking Form
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800 px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> 100% Free
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Book Your Free Mentorship Slot
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    Fill in your details below. Our coordinator will confirm your exact slot via telephone.
                  </p>
                </div>

                <CardContent className="p-6 sm:p-8">
                  {counsellingSubmitted ? (
                    <div className="py-8 text-center space-y-6 animate-fadeIn">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-extrabold text-slate-900">
                        Appointment Requested!
                      </h4>
                      <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-slate-900">{counsellingForm.fullName}</strong>. Our counselling coordinator will call you at <strong className="text-slate-900 font-mono">{counsellingForm.mobileNumber}</strong> to confirm your session.
                      </p>
                      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl text-xs font-mono font-bold text-amber-900">
                        Booking ID: {counsellingRef}
                      </div>
                      <div className="pt-2">
                        <Button
                          onClick={() => {
                            setCounsellingSubmitted(false);
                            setCounsellingForm({
                              fullName: '',
                              schoolName: '',
                              mobileNumber: '',
                              preferredDate: '',
                              preferredTimeSlot: '10:00 AM - 11:00 AM',
                              query: '',
                            });
                          }}
                          className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-6 rounded-xl"
                        >
                          Book Another Slot
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {counsellingLoading && (
                        <HeartbeatLoader
                          variant="overlay"
                          text="Scheduling Mentorship Appointment..."
                          subtext="Allocating counsellor slot from Coimbatore / Tiruppur district desks..."
                        />
                      )}
                      <form onSubmit={handleCounsellingSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Student Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter student name"
                            value={counsellingForm.fullName}
                            onChange={(e) =>
                              setCounsellingForm({ ...counsellingForm, fullName: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            School / Institution Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Govt HSS Rathinapuri"
                            value={counsellingForm.schoolName}
                            onChange={(e) =>
                              setCounsellingForm({ ...counsellingForm, schoolName: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Contact Mobile Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit number"
                            value={counsellingForm.mobileNumber}
                            onChange={(e) =>
                              setCounsellingForm({
                                ...counsellingForm,
                                mobileNumber: e.target.value.replace(/\D/g, ''),
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Preferred Date <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={counsellingForm.preferredDate}
                            onChange={(e) =>
                              setCounsellingForm({ ...counsellingForm, preferredDate: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Preferred Time Slot <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={counsellingForm.preferredTimeSlot}
                            onChange={(e) =>
                              setCounsellingForm({ ...counsellingForm, preferredTimeSlot: e.target.value })
                            }
                            className="w-full px-3 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          >
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Your Query / Key Questions (Optional)</span>
                          <span className="text-slate-400 font-normal lowercase text-[11px]">optional</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="E.g. Cut-off required for Computer Science, 7.5% reservation eligibility, hostel fees..."
                          value={counsellingForm.query}
                          onChange={(e) =>
                            setCounsellingForm({ ...counsellingForm, query: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={counsellingLoading}
                          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          {counsellingLoading ? (
                            <span>Scheduling Your Appointment…</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Request Free Counselling Appointment</span>
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>🔒 100% Free · No consultation fees are ever charged to students or parents.</span>
                      </div>
                    </form>
                  </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Compliance & Organisation Trust Bar */}
      <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Statutory Compliance
              </span>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                12AB Registered · 80G: AAETG361M/2025/1/1/2<br />
                CSR-1: CSR001963 · PAN: AATG361M
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Centre Office & Hotline
              </span>
              <div className="text-xs sm:text-sm text-slate-300 space-y-1">
                <div className="font-bold">+91-97893 40230 · gsgtrustcbe@gmail.com</div>
                <div className="text-xs text-slate-400">
                  1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
              <Link to="/scholarships">
                <Button size="sm" className="bg-amber-500 text-white hover:bg-amber-600 font-bold px-4 py-2.5 rounded-xl shadow">
                  Apply for Scholarship
                </Button>
              </Link>
              <a href="#counselling">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold px-4 py-2.5 rounded-xl"
                >
                  Book Free Counselling
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Registration Modal */}
      {registeringWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setRegisteringWorkshop(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                {registeringWorkshop.mode}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{registeringWorkshop.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {registeringWorkshop.date} · {registeringWorkshop.time}
              </p>
            </div>

            {workshopRegistered ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Seat Reserved!</h4>
                <p className="text-sm text-slate-600">
                  We have registered <span className="font-bold">{workshopStudent.name}</span> for this workshop.
                  Confirmation has been logged for {workshopStudent.phone}.
                </p>
                <Button
                  onClick={() => setRegisteringWorkshop(null)}
                  className="bg-slate-900 text-white hover:bg-slate-800 font-semibold mt-2 rounded-xl"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleWorkshopRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter student name"
                    value={workshopStudent.name}
                    onChange={(e) => setWorkshopStudent({ ...workshopStudent, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit phone number"
                    value={workshopStudent.phone}
                    onChange={(e) => setWorkshopStudent({ ...workshopStudent, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    School / College Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name of your institution"
                    value={workshopStudent.school}
                    onChange={(e) => setWorkshopStudent({ ...workshopStudent, school: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow"
                  >
                    Confirm Free Seat
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {modalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalProgram(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow">
                <modalProgram.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase">{modalProgram.category}</span>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">{modalProgram.title}</h3>
              </div>
            </div>

            {modalProgram.image && (
              <div className="rounded-2xl overflow-hidden mb-4 border border-slate-100 aspect-video">
                <img src={modalProgram.image} alt={modalProgram.title} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-slate-700 text-sm leading-relaxed mb-4">{modalProgram.description}</p>
            <p className="text-slate-600 text-xs leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {modalProgram.details}
            </p>

            <div className="flex items-center justify-end pt-2">
              <Button onClick={() => setModalProgram(null)} variant="outline" className="text-xs rounded-xl">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER SECTION MATCHING EXACT SPEC */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: About NGO */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-black shadow-lg">
                  GSG
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">GSG Trust</h4>
                  <span className="text-[11px] text-amber-400 font-semibold block">Get Set Go NGO • Est. 2013</span>
                </div>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed">
                GSG Trust is a youthful NGO body, serving the society from the year 2013, we have more than 500 volunteers who are from destitute prudent foundations and committed themselves to serve the society.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-base font-bold text-amber-400 block font-mono">748,980</span>
                  <span className="text-[11px] text-slate-400">Donation</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-base font-bold text-emerald-400 block font-mono">38,475</span>
                  <span className="text-[11px] text-slate-400">Volunteers</span>
                </div>
              </div>
            </div>

            {/* Col 2: About */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                About
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link to="/" className="hover:text-amber-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-amber-400 transition-colors font-semibold text-amber-400">
                    Programs
                  </Link>
                </li>
                <li>
                  <a href="#signature-programs" className="hover:text-amber-400 transition-colors">
                    Donation
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Quick links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link to="/courses" className="hover:text-amber-400 transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/volunteers" className="hover:text-amber-400 transition-colors">
                    Volunteers
                  </Link>
                </li>
                <li>
                  <Link to="/volunteers#volunteer-section" className="hover:text-amber-400 transition-colors">
                    Be a Volunteer
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships" className="hover:text-amber-400 transition-colors">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/volunteers#footprint" className="hover:text-amber-400 transition-colors">
                    Our Footprint
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="hover:text-amber-400 transition-colors">
                    Blog & News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Hot Line & Office */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Hot Line & Office
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block uppercase">Hot Line</span>
                  <a href="tel:+919789340230" className="text-base font-bold text-amber-400 hover:underline">
                    +91-97893 40230
                  </a>
                </div>
                <div className="flex items-start gap-2 pt-1 text-slate-400">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>info@gsgtrust.in</span>
                </div>
                <div className="pt-2">
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">Follow Us -</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/919789340230"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-800 hover:bg-emerald-600 text-white p-2 rounded-lg text-xs transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://www.instagram.com/gsg_getsetgo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-800 hover:bg-pink-600 text-white p-2 rounded-lg text-xs transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-strip footer */}
          <div className="mt-12 pt-6 border-t border-slate-900 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 GSG Trust (Get Set Go). All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link to="/about" className="hover:text-amber-400 transition-colors">About us</Link>
              <Link to="/courses" className="hover:text-amber-400 transition-colors">Courses</Link>
              <Link to="/volunteers" className="hover:text-amber-400 transition-colors">Volunteers</Link>
              <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
