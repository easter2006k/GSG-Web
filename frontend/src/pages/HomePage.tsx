import React, { useState } from 'react';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  Heart,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Star,
  Radio,
  Sprout,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Stethoscope,
  HeartHandshake,
  HelpCircle,
  Send,
  Quote,
  DollarSign,
  Globe,
  Building2,
  ExternalLink,
  MessageCircle,
  X,
  Check,
  ChevronDown,
  Mail,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TamilNaduMapFootprint } from '@/components/ui/TamilNaduMapFootprint';
import { LeadershipDirectory } from '@/components/team/LeadershipDirectory';

// 9 Real Student Testimonials from prompt
const testimonialsData = [
  {
    id: 1,
    name: 'M. Neelalojini',
    degree: 'BE CSBS',
    college: 'Dhaanish Ahamed Institute of Technology',
    category: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    quote:
      'I thank GSG Trust for this guidance. Their style of Presentation is really enjoyable and informative. They provide opportunities to ask questions and patiently explained to us with real time examples, which all made us realize the current era. The guidance was up to my expectation. I learned many tricks for uplift of both my personal and professional life.',
  },
  {
    id: 2,
    name: 'P.S. Easter Raj',
    degree: 'B.Tech AIDS',
    college: 'Info Institute of Technology',
    category: 'Technology',
    avatar: '/images/team/easter.jpg',
    quote:
      'Everyone have a wish or aim in our life. I too have a ambition in the field of B.Tech AI & DS, but I afraid about my mark and also confused by attending so many career guidance programs conducted by many colleges in our school. I also met GSG Trust in our school & I thought they are also like other colleges which I have met earlier. But GSG Team has motivated us and gave us a clear vision about our career. One of the best thing happened ever in my life is the day which I have joined with GSG Trust. I’m upgrading with their guidance everyday to be a better person in my life.',
  },
  {
    id: 3,
    name: 'M. Sree Preethika',
    degree: 'B.Com CA',
    college: 'KKCAS',
    category: 'Arts & Science',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    quote:
      'Hello Friends! I got a wonderful and positive change in my life through GSG Trust. If you are in need of any support related to Medical, education and other societal needs, I’m assuring that GSG Trust is here to support you. Pursuing education and acquiring new skills can pave the way for a brighter future. Best of luck on your journey!',
  },
  {
    id: 4,
    name: 'S.P. Aathavan',
    degree: 'B.Tech AIDS',
    college: 'Rathinam Technical Campus',
    category: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
    quote:
      'GSG Trust is the most trustable one for the students. They are helping student to find their career based on ICC Test for free. The best coordinators are available to guide you for achieving the best. Let\'s join us for equipping yourself. Welcome you to discover the trust to make your goal ultimately achieve.',
  },
  {
    id: 5,
    name: 'S. Abarna',
    degree: 'II-B.Com CA',
    college: 'KKCAS',
    category: 'Arts & Science',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
    quote:
      'I am a proud student of GSG Trust. GSG is the one who makes me study by providing Free Education. Without their help, I wouldn\'t able to continue my graduation. When I finished 12th, I didn\'t even know about my career opportunities. GSG gave me good guidance and helped me join a good college without any expectations. Heartfelt thanks to everyone of the Trust.',
  },
  {
    id: 6,
    name: 'K. Dhanwanth',
    degree: 'BE Mechanical Engineering',
    college: 'CEIT',
    category: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop',
    quote:
      'Hi Dudes, I’m Dhanwanth. I want to share with you the changes that GSG has brought into my life. When I was in 12th grade, I came to GSG Education Trust for career guidance. At that time, I didn\'t know what was important to me, and I was confused about which college and program I have to choose. GSG guided me on what was right for me. They also helped me with every process starting from filling application and applying for government documents without charging. In addition, GSG has helped me develop my skills. They have guided me on which skills I should develop to have a successful future. I believe that GSG is not just a group or community. It is one of the best families.',
  },
  {
    id: 7,
    name: 'J. Abishek Joseph',
    degree: 'B.Tech IT',
    college: 'Info Institute of Technology',
    category: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop',
    quote:
      'GSG Trust is a trustworthy organization. It was to me after I completed my 12th grade; I’m struggled to get into college. GSG helped me a lot and provided me the educational scholarship. They are especially helping government school students for completing their graduation. Thanks to our beloved team of GSG Trust.',
  },
  {
    id: 8,
    name: 'R. Sudharson',
    degree: 'B.Sc CT',
    college: 'KGCAS',
    category: 'Arts & Science',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop',
    quote:
      'GSG Trust is very useful for me to Learn Leadership Skills. Our individuality plays a significant role in our personal growth. It incorporates many special characteristics to improve you. Join us today to become a best leader like us and enhance your individuality.',
  },
  {
    id: 9,
    name: 'Timoth Vincent Raj',
    degree: 'B.E ECE',
    college: 'Info Institute of Engineering',
    category: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop',
    quote:
      'GSG, this is not only a ngo, it gave me a family and supported me in my all the hardest times. They provided many opportunities and experience to explore myself. I have learn many things and which is more helpful for my career. Thanks to GSG for being a mentor to me.',
  },
];

// ─── Leadership & Governance ────────────────────────────────────────────────
// Managed dynamically via LeadershipDirectory component, synced with PostgreSQL DB & admin dashboard.

// 3 Programs with completion %
const latestPrograms = [
  {
    title: 'Thaagam Theerpom',
    badge: 'Flagship Movement',
    progress: 78,
    partner: 'Collaboration with Radio City',
    description:
      '“Thaagam Theerpom” is not just an event; it’s a movement driven by the collective spirit of caring and sharing. Providing life skills, youth water awareness, student relief and public service drives.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
    color: 'from-blue-600 to-indigo-700',
    tag: 'Radio City Partnered',
  },
  {
    title: "GSG's Green Initiatives",
    badge: 'Environment & Climate',
    progress: 49,
    partner: 'Community & School Drives',
    description:
      'Our dedication to environmental conservation is a testament to their commitment to a sustainable and greener future through massive tree plantation, eco-awareness, and waste reduction.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
    color: 'from-emerald-600 to-teal-700',
    tag: 'Greener Future',
  },
  {
    title: 'Agni Thaaragai',
    badge: 'Women & Youth Safety',
    progress: 68,
    partner: 'Self-Defense & Confidence',
    description:
      '“Agni Thaaragai” addresses this need head-on by offering a comprehensive self-defense program, equipping young girls and students with practical safety skills, courage, and mental grit.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    color: 'from-amber-600 to-orange-700',
    tag: 'Empowerment Drive',
  },
  {
    title: 'Little Hearts',
    badge: 'Community & Children',
    progress: 85,
    partner: 'Collaboration with Youth Foundation',
    description:
      'We conducted cultural events, games, and engaging activities in collaboration with Youth Foundation to bring happiness and emotional support to children and communities. These events became a heartwarming celebration of compassion, unity, and care — strengthening bonds and creating joyful memories for every child.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
    color: 'from-rose-500 to-pink-700',
    tag: 'Youth Foundation Partnered',
  },
  {
    title: 'Traffic Awareness Program',
    badge: 'Civic Responsibility',
    progress: 72,
    partner: 'Collaboration with Youth Foundation',
    description:
      'Road accidents are a major cause of injury and loss of life worldwide. GSG has actively organized road safety awareness initiatives in collaboration with the Youth Foundation to promote responsible citizenship and create safer roads for everyone. Through awareness rallies, public campaigns, and educational activities, the program encourages people to adopt safe and disciplined traffic habits.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    color: 'from-slate-700 to-slate-900',
    tag: 'Road Safety',
  },
  {
    title: "GSG's Lifesaving Mission",
    badge: 'Healthcare & Emergencies',
    progress: 88,
    partner: 'Govt & Private Hospitals',
    description:
      'Blood donation is a lifeline for countless individuals facing medical emergencies, surgeries, and critical health conditions. Donating blood is a selfless act that can save lives and provide hope to patients in need. Understanding the importance of a strong blood supply, GSG Trust has undertaken numerous blood donation drives in both government and private hospitals.',
    image: '/images/blood_donation_drive.jpg',
    color: 'from-rose-600 to-red-700',
    tag: 'Save Lives • Donate Blood',
  },
  {
    title: 'Flood Relief',
    badge: 'Humanitarian & Relief',
    progress: 95,
    partner: 'Collaboration with Youth Foundation',
    description:
      'In the face of adversity, compassion and solidarity shine the brightest. In 2018, when Kerala faced devastating floods, GSG Trust in collaboration with the Youth Foundation stepped forward to provide swift relief materials, food supplies, and essential assistance to affected families.',
    image: '/images/flood_relief_camp.jpg',
    color: 'from-blue-600 to-cyan-700',
    tag: 'Emergency Relief',
  },
];

// Specialised Courses
const specialisedCourses = [
  {
    icon: GraduationCap,
    title: 'Career Guidance & ICC Aptitude Test',
    desc: 'Free Interest-Competency-Career assessment helping students choose high-growth pathways without confusion.',
    badge: 'Free Assessment',
  },
  {
    icon: Lightbulb,
    title: 'AI, Data Science & Tech Foundations',
    desc: 'Hands-on exposure to B.Tech AI & DS, Computer Science, and digital problem solving for modern industries.',
    badge: 'Industry 4.0',
  },
  {
    icon: Award,
    title: 'Leadership & Individuality Skills',
    desc: 'Specialized programs designed to bring out individuality, public speaking, and team leadership.',
    badge: 'Personal Growth',
  },
  {
    icon: ShieldCheck,
    title: 'Agni Thaaragai Self-Defense',
    desc: 'Practical defensive tactics and confidence-building workshops for school and college girls.',
    badge: 'Safety First',
  },
  {
    icon: BookOpen,
    title: 'Higher Education & Scholarship Prep',
    desc: 'Complete guidance on applications, government certificates, and securing 100% scholarship seats.',
    badge: 'Scholarship Aid',
  },
  {
    icon: HeartHandshake,
    title: 'Youth Social Service & Volunteering',
    desc: 'Grassroots community outreach, empathy training, and active social impact projects.',
    badge: 'Social Impact',
  },
];

// FAQs
const faqs = [
  {
    question: 'How can i get help?',
    answer:
      'You can easily connect with us through our hotline at +91-97893 40230, register through our online contact or scholarship form, or visit our headquarters at 1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027. Our coordinators guide students through admission, course choices, document paperwork, and scholarships with zero charges.',
  },
  {
    question: 'Why We Help Students?',
    answer:
      'Making this the first objective of the Trust. We primarily focus on building a community with greater future equipping their skills and knowledge. We help to create a student community of Government and Corporation school students who possess tremendous talent but lack guidance, financial support, or awareness.',
  },
  {
    question: 'Why do i connect with GSG Trust?',
    answer:
      'Because GSG Trust is a youthful, authentic NGO serving since 2013 with over 8,000 volunteers. From free ICC aptitude tests and 100% free education scholarships to life mentorship and leadership training, we treat every student like family and ensure they succeed in higher education.',
  },
];

// Blog Posts
const blogPosts = [
  {
    date: '13 DEC',
    title: 'Stroke care in Puerto Ricro Charity campain',
    author: 'Wade Warren',
    comments: '05 Comment',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&h=300&fit=crop',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati consectetur adipisicing.',
  },
  {
    date: '21 DEC',
    title: 'Maecenas tempus tellusin eget condimentum',
    author: 'Wade Warren',
    comments: '05 Comment',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop',
    excerpt: 'Skill development drives and community education sessions transforming youth across corporation schools.',
  },
  {
    date: '13 DEC',
    title: 'posuere imperdiet aecena malesuada Praesent',
    author: 'Wade Warren',
    comments: '05 Comment',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=300&fit=crop',
    excerpt: 'Agni Thaaragai self-defense and student leadership conventions bringing together over 500 participants.',
  },
];

export default function HomePage() {
  // Testimonial filter and carousel state
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState('1000');

  // Interactive Volunteer Form State
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    message: '',
  });
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Profile Popup Hover State
  const [hoveredProfile, setHoveredProfile] = useState<{
    name: string;
    roleOrRoles: string | string[];
    image: string;
    category: string;
  } | null>(null);

  const filteredTestimonials =
    activeCategory === 'All'
      ? testimonialsData
      : testimonialsData.filter((t) => t.category === activeCategory);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setVolunteerSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-800">
      {/* Top Banner & Radio City Collaboration Callout */}
      <div className="bg-[#071c35] text-white text-xs sm:text-sm py-2.5 px-4 border-b border-white/10">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs tracking-wide">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-600" />
              Collaboration with Radio City
            </span>
            <span className="font-semibold text-amber-200">
              Thaagam Theerpom Movement Active Now
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <a
              href="tel:+919789340230"
              className="hover:text-amber-400 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Contact: +91-97893 40230</span>
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#0d2e6e] text-white py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">

            {/* Left Column: Core Messaging */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#1246a8] border border-blue-400/40 px-4 py-2 rounded-full text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Serving Society Since 2013</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.18] text-white">
                Empowering Youth,{' '}
                <span className="text-amber-300">
                  Inspiring Change
                </span>
              </h1>

              <p className="text-slate-200 text-lg sm:text-xl max-w-2xl leading-relaxed font-normal">
                GSG Trust builds brighter futures through education and community service.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  onClick={() => setDonateModalOpen(true)}
                  size="lg"
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-extrabold px-8 py-4 shadow-xl hover:shadow-2xl transition-all text-base rounded-xl"
                >
                  <Heart className="w-5 h-5 mr-2 text-rose-600 fill-rose-600" />
                  Donate Now
                </Button>

                <a href="#volunteer-section">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Volunteer
                  </Button>
                </a>

                <Link to="/courses">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-slate-100 hover:text-white hover:bg-white/15 rounded-xl px-6 py-4 text-base font-bold"
                  >
                    Explore Courses
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Namma School Namma Ooru Palli Callout */}
              <div className="bg-[#103a8a] border border-blue-400/30 p-6 rounded-2xl flex items-center gap-4 max-w-3xl shadow-lg mt-6">
                <div className="w-12 h-12 p-2.5 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm font-black text-lg">
                  🏛️
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                    Namma School Namma Ooru Palli • Government of Tamil Nadu
                  </div>
                  <div className="text-white font-bold text-base sm:text-lg mt-0.5">
                    Join hands with us to support communities across Tamil Nadu.
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Key Metrics Showcase Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="relative rounded-3xl bg-white text-slate-900 p-7 sm:p-9 shadow-2xl border border-slate-100 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                        GSG Impact Dashboard
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                        Serving Society Since 2013
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Verified NGO
                    </span>
                  </div>

                  {/* 4 Stats Grids */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                      <CountUpNumber
                        end={13}
                        suffix="+"
                        duration={10000}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Years of Social Service
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <CountUpNumber
                        end={8000}
                        suffix="+"
                        duration={10000}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Volunteers
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                      <CountUpNumber
                        end={15}
                        suffix="+"
                        duration={10000}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Projects Completed
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                      <CountUpNumber
                        end={7.48}
                        decimals={2}
                        prefix="₹"
                        suffix="L+"
                        duration={10000}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-rose-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Donations Received
                      </div>
                    </div>
                  </div>

                  {/* Total Registered Volunteers Callout */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                    <div>
                      <div className="font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
                        <CountUpNumber
                          end={38475}
                          formatCommas={true}
                          duration={10000}
                          as="span"
                          className="font-black text-amber-400 inline"
                        />
                        <span>Volunteers Registered</span>
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Empowering communities across districts
                      </div>
                    </div>
                    <Link to="/volunteers">
                      <Button size="sm" className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-xs px-4 py-2">
                        Join Force
                      </Button>
                    </Link>
                  </div>

                  {/* Tagline Footer */}
                  <div className="text-center pt-2">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
                      &ldquo;Empowering communities. Inspiring change. Building a better tomorrow.&rdquo;
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                About Us & Core Mission
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                We make a different life for every people
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                A group of youthful experts who have involvement in instructing, Investigate and
                Advancement are the authors of this NGO. We are centering within the change of the
                youthful minds to engage the areas of:
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed -mt-2">
                Since 2013, our grassroots movement bridges systemic educational and economic gaps,
                nurturing ambition from corporation classrooms to regional leadership through five
                interconnected pillars of social transformation:
              </p>

              {/* 5 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* 1. Agriculture */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">Agriculture</h4>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Green Earth
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-700">Rural upliftment & green awareness</p>
                      <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                        Organic farming drives, seed balls, student eco-clubs & sustainable livelihoods for rural farming families.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Education */}
                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">Education</h4>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          Zero-Fee Aid
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-blue-700">Free guidance, courses & scholarships</p>
                      <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                        Free psychometric tests, college admission support, higher study grants & career path workshops for 45,000+ students.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Medicine */}
                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">Medicine</h4>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          Healthcare
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-rose-700">Healthcare aid & welfare camps</p>
                      <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                        Free community health & eye checkup camps, emergency healthcare support, blood donation networks & wellness awareness.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Innovation */}
                <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">Innovation</h4>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Future Tech
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-amber-700">Emerging tech & creative skills</p>
                      <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                        Hands-on STEM labs, AI & coding bootcamps, creative ideation challenges & digital tools for under-resourced youth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Social Service (Span 2) */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">Social Service</h4>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                          Community Action
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-purple-700">
                        Community upliftment, Agni Thaaragai self defense & Thaagam Theerpom
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                        Empowering girls with martial safety maneuvers through <strong className="text-slate-700 font-semibold">Agni Thaaragai</strong>, delivering clean drinking water drives with <strong className="text-slate-700 font-semibold">Thaagam Theerpom</strong>, and active student relief networks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Key Impact Highlights */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-sm">
                <div className="border-r border-slate-200 pr-2">
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900">10+ Years</div>
                  <div className="text-[11px] text-slate-500 font-medium">Unbroken Service</div>
                </div>
                <div className="border-r border-slate-200 px-2">
                  <div className="text-lg sm:text-xl font-extrabold text-primary">8,000+</div>
                  <div className="text-[11px] text-slate-500 font-medium">Active Volunteers</div>
                </div>
                <div className="pl-2">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-600">100% Free</div>
                  <div className="text-[11px] text-slate-500 font-medium">Guidance & Testing</div>
                </div>
              </div>

              {/* Founder Spotlight Card & Action Link */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="p-4 rounded-2xl bg-[#0d2e6e] text-white flex items-center gap-4 shadow-lg border border-blue-900 flex-1">
                  <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-amber-400 overflow-hidden shrink-0 shadow-md">
                    <img
                      src="/images/team/vinodkumar_ravichandran_square.jpg"
                      alt="Vinodkumar Ravichandran"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-base text-white">Vinodkumar Ravichandran</div>
                    <div className="text-xs text-amber-300 font-semibold">Founder-Chairman - GSG Trust</div>
                    <div className="text-xs text-slate-200 mt-0.5">
                      Guiding youth transformation with visionary dedication since 2013.
                    </div>
                  </div>
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-md hover:shadow-lg shrink-0 group"
                >
                  Explore More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Side Visual Image & Callout */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=650&fit=crop"
                  alt="Students and Youth in Career Guidance"
                  className="w-full h-[560px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded-full text-xs shadow-sm">
                      GetSetGo Training & Guidance
                    </span>
                    <span className="px-3 py-1 bg-blue-600/90 text-white font-semibold rounded-full text-xs backdrop-blur-sm">
                      Registered Trust Since 2013
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">Bridging Dreams & Opportunities</h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Empowering corporation, government school, and rural students across Tamil Nadu with
                    free psychometric tests, admissions aid, and holistic life coaching.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-300">
                    <span className="inline-flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      <Check className="w-4 h-4 text-emerald-400" /> Free Psychometric Tests
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      <Check className="w-4 h-4 text-emerald-400" /> Direct College Counseling
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Top Badge */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-slate-100 max-w-[230px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-slate-900 text-sm">100% Free Aid</span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Zero charges for career testing, guidance & admission support.
                </p>
              </div>

              {/* Floating Bottom Left Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">45,000+ Students</div>
                  <div className="text-[11px] text-slate-500">Mentored Across Tamil Nadu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs / Latest Programs (Continuous Line Animation Moving Right to Left) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3.5 py-1 rounded-full inline-block">
                Our Programs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Latest Programs
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                We know the greatest Process starts from the intiation to processing and betterment
                of the society.
              </p>
            </div>

            <Link to="/programs" className="shrink-0">
              <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs px-5 py-2.5">
                View All Programs <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Continuous Horizontal Right-to-Left Line Track */}
        <div className="relative w-full overflow-hidden py-8 sm:py-12">
          {/* Edge Gradients for seamless infinite aesthetic */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee Track Container */}
          <div className="flex animate-marquee-rtl py-4">
            {/* First Set of Cards */}
            <div className="flex gap-6 shrink-0 pr-6">
              {latestPrograms.map((program, idx) => (
                <Card
                  key={`p1-${idx}`}
                  className="w-[340px] sm:w-[390px] shrink-0 rounded-3xl border border-slate-200/90 shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-3 hover:shadow-[0_22px_55px_rgba(16,42,86,0.42),0_0_30px_rgba(18,70,168,0.3)] hover:border-[#102A56] hover:z-20 relative overflow-hidden flex flex-col justify-between bg-white select-none cursor-pointer"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        {program.badge}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs shadow-md">
                        {program.tag}
                      </div>
                    </div>

                    <CardContent className="p-7 space-y-4">
                      <h3 className="text-2xl font-bold text-slate-900 line-clamp-1">{program.title}</h3>

                      {/* Progress Bar with Exact Percentage */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span className="text-slate-700">Movement Impact & Target</span>
                          <span className="text-primary font-extrabold text-lg">
                            {program.progress}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className={`h-full bg-gradient-to-r ${program.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{program.description}</p>
                    </CardContent>
                  </div>

                  <div className="p-7 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">{program.partner}</span>
                    <Link to="/programs">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary/80 font-bold text-xs"
                      >
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Second Cloned Set of Cards for Seamless Infinite Loop */}
            <div className="flex gap-6 shrink-0 pr-6" aria-hidden="true">
              {latestPrograms.map((program, idx) => (
                <Card
                  key={`p2-${idx}`}
                  className="w-[340px] sm:w-[390px] shrink-0 rounded-3xl border border-slate-200/90 shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-3 hover:shadow-[0_22px_55px_rgba(16,42,86,0.42),0_0_30px_rgba(18,70,168,0.3)] hover:border-[#102A56] hover:z-20 relative overflow-hidden flex flex-col justify-between bg-white select-none cursor-pointer"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        {program.badge}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs shadow-md">
                        {program.tag}
                      </div>
                    </div>

                    <CardContent className="p-7 space-y-4">
                      <h3 className="text-2xl font-bold text-slate-900 line-clamp-1">{program.title}</h3>

                      {/* Progress Bar with Exact Percentage */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span className="text-slate-700">Movement Impact & Target</span>
                          <span className="text-primary font-extrabold text-lg">
                            {program.progress}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className={`h-full bg-gradient-to-r ${program.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{program.description}</p>
                    </CardContent>
                  </div>

                  <div className="p-7 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">{program.partner}</span>
                    <Link to="/programs">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary/80 font-bold text-xs"
                      >
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Trustees Section */}
      <LeadershipDirectory
        heading="Meet Our Board & Trustees"
        subtitle="Dedicated founders, educators, and youth leaders driving GSG Trust's mission since 2013."
      />
      {/* Become Volunteer Section (with Solid Form) */}
      <section id="volunteer-section" className="py-20 bg-white relative">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#071c35] text-white shadow-2xl overflow-hidden border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column Information */}
              <div className="lg:col-span-5 p-8 sm:p-12 space-y-6 bg-[#041021] border-b lg:border-b-0 lg:border-r border-slate-800">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  Become Volunteer
                </span>

                <h2 className="text-3xl font-extrabold leading-tight text-white">
                  Become a volunteer
                </h2>

                <p className="text-slate-300 text-base leading-relaxed">
                  Are you interested in being a volunteer or doing social service. Here's a chance
                  to be a volunteer of GSG Trust.
                </p>

                <div className="p-5 rounded-2xl bg-slate-900 border border-amber-400/40 text-amber-200 text-sm space-y-1.5 shadow-sm">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Welcome To Save Life And Make A Positive Impact
                  </div>
                  <p className="text-xs text-slate-300">
                    “Only when the society comes together and contributes, we will be able to make
                    an impact.”
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Engage in career guidance camps in your district</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Join Thaagam Theerpom & Green Initiatives</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Over 8,000 volunteers across Tamil Nadu</span>
                  </div>
                </div>
              </div>

              {/* Right Column Form (Solid Inputs) */}
              <div className="lg:col-span-7 p-8 sm:p-12 bg-[#071c35]">
                {volunteerSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 bg-slate-900 rounded-2xl border border-emerald-400/30">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Thank You, {volunteerForm.name}!</h3>
                    <p className="text-slate-300 text-sm max-w-md">
                      Your volunteer application has been received successfully. A GSG Trust
                      coordinator will contact you at {volunteerForm.phone} shortly.
                    </p>
                    <Button
                      onClick={() => {
                        setVolunteerSubmitted(false);
                        setVolunteerForm({ name: '', email: '', phone: '', dob: '', message: '' });
                      }}
                      variant="outline"
                      className="border-slate-700 text-white hover:bg-white hover:text-slate-900 mt-4"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="Dr. / Mr. / Ms."
                          value={volunteerForm.name}
                          onChange={(e) =>
                            setVolunteerForm({ ...volunteerForm, name: e.target.value })
                          }
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Your Email *
                        </label>
                        <Input
                          type="email"
                          required
                          placeholder="email@example.com"
                          value={volunteerForm.email}
                          onChange={(e) =>
                            setVolunteerForm({ ...volunteerForm, email: e.target.value })
                          }
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          required
                          placeholder="+91 97893 40230"
                          value={volunteerForm.phone}
                          onChange={(e) =>
                            setVolunteerForm({ ...volunteerForm, phone: e.target.value })
                          }
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Date Of Birth
                        </label>
                        <Input
                          type="date"
                          value={volunteerForm.dob}
                          onChange={(e) =>
                            setVolunteerForm({ ...volunteerForm, dob: e.target.value })
                          }
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Message / Interests
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your background or which causes you are interested in..."
                        value={volunteerForm.message}
                        onChange={(e) =>
                          setVolunteerForm({ ...volunteerForm, message: e.target.value })
                        }
                        className="w-full rounded-md bg-slate-800 border border-slate-700 p-3 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 text-base rounded-xl transition-all shadow-lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Volunteer Registration
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses / Specialised Courses Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-100 px-3.5 py-1 rounded-full">
              Our Courses
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Specialised Courses
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We offer a varied variety of courses to all our students which enable a skill
              development for all students. Varied variety of courses to develops Skill of the
              Community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {specialisedCourses.map((c, i) => (
              <Card
                key={i}
                className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 p-3 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold">
                      <c.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                      {c.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>

                  <div className="pt-2">
                    <Link
                      to="/courses"
                      className="inline-flex items-center text-primary font-bold text-xs hover:underline"
                    >
                      Explore syllabus <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Bar Under Courses (Solid Dark Card) */}
          <div className="mt-16 rounded-2xl bg-[#0d2e6e] p-8 text-white shadow-xl border border-blue-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center text-center">
              <div className="border-b sm:border-b-0 sm:border-r border-blue-400/20 pb-4 sm:pb-0">
                <CountUpNumber end={10} suffix="+" duration={10000} className="text-4xl font-extrabold text-amber-400" />
                <div className="text-sm font-medium text-slate-200 mt-1">Years Experiences</div>
              </div>
              <div className="border-b lg:border-b-0 lg:border-r border-blue-400/20 pb-4 lg:pb-0">
                <CountUpNumber end={8000} suffix="+" duration={10000} className="text-4xl font-extrabold text-emerald-400" />
                <div className="text-sm font-medium text-slate-200 mt-1">Volunteers</div>
              </div>
              <div className="border-b sm:border-b-0 sm:border-r border-blue-400/20 pb-4 sm:pb-0">
                <CountUpNumber end={15} suffix="+" duration={10000} className="text-4xl font-extrabold text-sky-400" />
                <div className="text-sm font-medium text-slate-200 mt-1">We Complete Project</div>
              </div>
              <div>
                <Button
                  onClick={() => setDonateModalOpen(true)}
                  size="lg"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  <Heart className="w-5 h-5 mr-2 text-rose-600 fill-rose-600" />
                  Donate for charity
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Faq
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How can we help you?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We help to create a student community of Government and Corporation school students
              and equip them with skills and knowledge.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-6 bg-white border-t border-slate-100 text-slate-600 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feedback Section (Solid Dark High-Contrast Cards, ZERO Glassmorphism) */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider bg-slate-800 border border-slate-700 px-3.5 py-1 rounded-full">
              Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What Say Our Client</h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Hear it from the students what they think about GSG Trust
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {['All', 'Engineering', 'Technology', 'Arts & Science'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of All 9 Testimonials in Solid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <Card
                key={item.id}
                className="bg-slate-800 border border-slate-700 rounded-2xl flex flex-col justify-between hover:border-amber-400/60 transition-all text-white p-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.name}</h4>
                      <p className="text-amber-300 text-xs font-semibold">{item.degree}</p>
                      <p className="text-slate-400 text-xs">{item.college}</p>
                    </div>
                  </div>

                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Verified Student</span>
                  <span className="text-amber-300 font-medium">{item.category}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Blog Post Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-100 px-3.5 py-1 rounded-full">
              Our Blog Post
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Latest News & Update
            </h2>
            <p className="text-slate-600 text-base">
              Skill development drives and community education sessions transforming youth across corporation schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Card
                key={idx}
                className="rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 px-3 py-1 rounded-lg text-xs font-extrabold shadow-md">
                      {post.date}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="font-semibold text-primary">{post.author}</span>
                      <span>•</span>
                      <span>{post.comments}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 hover:text-primary transition-colors">
                      <Link to="/gallery">{post.title}</Link>
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center text-primary font-bold text-xs hover:underline"
                  >
                    Read More <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Footprint & Reach Section (Tamil Nadu Map Interactive Hub) */}
      <TamilNaduMapFootprint />

      {/* Subscribe Newsletters & Hot Line Strip (Solid Styling, ZERO Glassmorphism) */}
      <section className="py-18 bg-[#0d2e6e] text-white">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Newsletter Form */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Subscribe Newsletters
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-lg">
                Get updates on upcoming career counselling sessions, free scholarships, and
                volunteer events.
              </p>

              {newsletterSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-sm font-semibold">
                  Thank you for subscribing to GSG Trust updates!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-amber-400"
                  />
                  <Button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 shrink-0 shadow-md"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
            </div>

            {/* Right: Hotline & Volunteer Overview (Solid Blue Card) */}
            <div className="lg:col-span-6 p-7 rounded-2xl bg-[#103a8a] border border-blue-400/30 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Hot Line
                  </div>
                  <a
                    href="tel:+919789340230"
                    className="text-2xl sm:text-3xl font-extrabold text-white hover:text-amber-300 transition-colors flex items-center gap-2 mt-1"
                  >
                    <Phone className="w-6 h-6 text-amber-400 animate-bounce" />
                    +91-97893 40230
                  </a>
                </div>

                <div className="flex gap-4">
                  <div className="text-center bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl shadow-sm">
                    <div className="text-xl font-bold text-amber-400">748980</div>
                    <div className="text-xs text-slate-300">Donation</div>
                  </div>
                  <div className="text-center bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl shadow-sm">
                    <div className="text-xl font-bold text-emerald-400">38475</div>
                    <div className="text-xs text-slate-300">Volunteers</div>
                  </div>
                </div>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed border-t border-blue-400/20 pt-3">
                GSG Trust is a youthful NGO body, serving the society from the year 2013, we have
                more than 500 volunteers who are from destitute prudent foundations and committed
                themselves to serve the society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Donation Modal (Solid Backdrop) */}
      {donateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setDonateModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Make An Impact
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Donate for Charity</h3>
              <p className="text-slate-600 text-sm">
                Support destitute and corporation school students with scholarships and learning
                kits.
              </p>
            </div>

            {/* Donation Amount selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Select Amount (INR)</label>
              <div className="grid grid-cols-4 gap-2">
                {['500', '1000', '2500', '5000'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedDonation(amt)}
                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                      selectedDonation === amt
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank details preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-600">
              <div className="font-bold text-slate-900 text-sm">GSG Trust Official Bank Account</div>
              <div>Account Name: GSG Trust (Get Set Go)</div>
              <div>Bank: Indian Overseas Bank / Canara Bank</div>
              <div>UPI ID: 9789340230@upi (or scan code at office)</div>
              <div>Hotline Verification: +91-97893 40230</div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  alert(
                    `Thank you for contributing ₹${selectedDonation}! Please reach out on WhatsApp/Call +91-97893 40230 for the receipt and 80G tax exemption voucher.`
                  );
                  setDonateModalOpen(false);
                }}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl"
              >
                Proceed with ₹{selectedDonation} Contribution
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}