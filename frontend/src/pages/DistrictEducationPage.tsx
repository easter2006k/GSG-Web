import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Heart,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  Maximize2,
  X,
  Send,
  Calendar,
  Layers,
  Compass,
  FileCheck,
  Search,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DISTRICT_EDUCATION_DATA,
  DISTRICT_LIST,
  DistrictEducationInfo,
  DistrictPhotoItem,
} from '@/data/districtEducationData';
import { CountUpNumber } from '@/components/ui/CountUpNumber';

const coreEducationPortals = [
  {
    name: 'Programs',
    href: '/programs',
    badge: '6 Core Pillars',
    description: 'Comprehensive educational, self-defense & community upliftment drives across Tamil Nadu schools.',
    image: '/images/programs_overview.jpg',
    icon: GraduationCap,
    buttonText: 'Explore Programs',
  },
  {
    name: 'Courses',
    href: '/courses',
    badge: 'Colleges & Cut-offs',
    description: 'Engineering, Arts, Science, Commerce and Allied Medical degrees directory with admission guidance.',
    image: '/images/gallery/cards/ghss-kalapatti_photo.jpg',
    icon: BookOpen,
    buttonText: 'Explore Courses',
  },
  {
    name: 'Scholarships',
    href: '/scholarships',
    badge: 'Direct Trust Grants',
    description: 'Merit-based scholarships, 7.5% Government School horizontal quota zero-fee verification & First Graduate aid.',
    image: '/images/volunteers_field_work.jpg',
    icon: Award,
    buttonText: 'Explore Scholarships',
  },
  {
    name: 'Field Gallery',
    href: '/gallery',
    badge: '45+ Schools Documented',
    description: 'High-resolution archive of real on-ground school awareness sessions, student camps & volunteer drives.',
    image: '/images/gallery/cards/chss-peelamedu_photo.jpg',
    icon: ImageIcon,
    buttonText: 'Explore Field Gallery',
  },
];

const districtCards = [
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    tag: 'Headquarters Hub',
    role: 'Central Hub & 45+ Schools Documented',
    summary: 'Central headquarters driving corporation school mentorship, free ICC aptitude testing, and direct collegiate fee grants.',
    image: '/images/gallery/cards/chss-rathinapuri_photo.jpg',
    accent: '#7f1026',
    stats: '45,000+ Students Mentored',
  },
  {
    id: 'tiruppur',
    name: 'Tiruppur',
    tag: 'Corporation Hub',
    role: '70+ Schools Documented & Corporation Drives',
    summary: 'Empowering children of industrial & textile workers across 70 documented government and corporation higher secondary schools.',
    image: '/images/gallery/tiruppur/cards/nanjappa-mpl-boys-hss_photo.jpg',
    accent: '#b77b08',
    stats: '15,000+ Students Mentored',
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    tag: 'University Liaison',
    role: 'Northern Outreach & CSR Educational Desks',
    summary: 'Anna University single-window counselling advisory, First Graduate certificate verification, and corporate CSR educational aid.',
    image: '/images/agni_thaaragai.jpg',
    accent: '#064de0',
    stats: '9,500+ Students Guided',
  },
  {
    id: 'nilgiris',
    name: 'Nilgiris',
    tag: 'Hill & Tribal Hub',
    role: 'Tribal School Mentorship & Hill Education',
    summary: 'Extending educational opportunities, winter study kits, and free government hostel admissions to tribal and remote mountain students.',
    image: '/images/gallery/cards/ghss-velliangadu_photo.jpg',
    accent: '#00817e',
    stats: '8,500+ Tribal & Hill Students',
  },
  {
    id: 'valparai',
    name: 'Valparai',
    tag: 'Tea-Estate Hub',
    role: 'Tea-Estate Student Welfare & Anamalai Desks',
    summary: 'Dedicated mentorship and career roadmaps for plantation workers’ children, ensuring 100% free higher education admissions.',
    image: '/images/gallery/cards/ghss-madukkarai_photo.jpg',
    accent: '#008b88',
    stats: '5,200+ Estate Students',
  },
];

const DISTRICT_METRICS_DATA: Record<
  string,
  {
    students: number;
    schools: number;
    scholarshipsLakhs: number;
    volunteers: number;
  }
> = {
  coimbatore: {
    students: 45000,
    schools: 45,
    scholarshipsLakhs: 7.48,
    volunteers: 500,
  },
  tiruppur: {
    students: 15000,
    schools: 70,
    scholarshipsLakhs: 3.20,
    volunteers: 120,
  },
  kanchipuram: {
    students: 9500,
    schools: 14,
    scholarshipsLakhs: 2.80,
    volunteers: 85,
  },
  nilgiris: {
    students: 8500,
    schools: 22,
    scholarshipsLakhs: 2.50,
    volunteers: 95,
  },
  valparai: {
    students: 5200,
    schools: 12,
    scholarshipsLakhs: 2.00,
    volunteers: 60,
  },
};

export default function DistrictEducationPage() {
  const { districtId } = useParams<{ districtId?: string }>();
  const navigate = useNavigate();

  // Selected district state - managed locally so clicking districts doesn't reload the page
  const initialKey = districtId && DISTRICT_EDUCATION_DATA[districtId.toLowerCase()]
    ? districtId.toLowerCase()
    : 'coimbatore';

  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialKey);

  // Sync if route param changes externally (e.g. browser back/forward or footer navigation)
  useEffect(() => {
    if (districtId && DISTRICT_EDUCATION_DATA[districtId.toLowerCase()]) {
      setSelectedDistrict(districtId.toLowerCase());
    }
  }, [districtId]);

  const selectedKey = selectedDistrict;

  const currentDistrict: DistrictEducationInfo =
    DISTRICT_EDUCATION_DATA[selectedKey] || DISTRICT_EDUCATION_DATA.coimbatore;

  const currentMetrics =
    DISTRICT_METRICS_DATA[selectedKey] || DISTRICT_METRICS_DATA.coimbatore;

  // Active sub-tab inside district
  const [activeTab, setActiveTab] = useState<'all' | 'activities' | 'scholarships' | 'guidance' | 'gallery'>('all');

  // Lightbox Modal for Photo
  const [activePhoto, setActivePhoto] = useState<DistrictPhotoItem | null>(null);

  // Photo category filter and visible count
  const [districtPhotoCategory, setDistrictPhotoCategory] = useState<string>('All');
  const [districtPhotoLimit, setDistrictPhotoLimit] = useState<number>(12);

  // Scholarship Application / Help Modal
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: '',
    phone: '',
    school: '',
    standard: '12th Standard',
    courseInterest: 'Engineering (B.E / B.Tech)',
    message: '',
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Switch district in-page without reloading the page or triggering full route loaders
  const handleDistrictChange = (newDistrictId: string, shouldScroll = false) => {
    const key = newDistrictId.toLowerCase();
    setSelectedDistrict(key);
    // Update browser URL cleanly without page reload
    window.history.replaceState(null, '', `/education/${key}`);

    if (shouldScroll) {
      const el = document.getElementById('selected-district-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Smooth scroll helper for division jump links
  const handleScrollToDivision = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone) {
      alert('Please fill in your name and contact phone number.');
      return;
    }
    setApplySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* 1. TOP HEADER BANNER - GSG TRUST EDUCATION HUB */}
      <section className="bg-[#071c35] text-white py-14 sm:py-18 border-b border-slate-800">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-400/40 px-4 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>GSG Trust State-Wide Education &amp; Student Mentorship Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Education, Scholarships &amp; <br />
              <span className="text-amber-400">District Outreach Initiatives</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-1">
              Select any core educational division or explore our specialized district operations across
              Coimbatore, Tiruppur, Kanchipuram, Nilgiris, and Valparai for localized activities, scholarships, career roadmaps, and school galleries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORE EDUCATION PORTALS (4 VISUAL CARDS) */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 block">
                Educational Divisions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Core Education Portals
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Direct access to our flagship programs, college degrees directory, scholarship schemes, and photo archives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {coreEducationPortals.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.name}
                  className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image preview */}
                    <div className="relative h-36 w-full overflow-hidden bg-slate-200">
                      <img
                        src={portal.image}
                        alt={portal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <span className="absolute top-3 right-3 bg-slate-900/90 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        {portal.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#7f1026] transition-colors">
                          {portal.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {portal.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link to={portal.href}>
                      <Button className="w-full bg-[#071c35] hover:bg-[#0d2e6e] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                        <span>{portal.buttonText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SPECIFICALLY DISTRICTS SELECTION SECTION */}
      <section id="district-selection" className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] text-amber-600">
            Field Operations &amp; Regional Hubs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            Specifically Districts
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Click on any district below to explore its specific Education-Related Activities, District Scholarships, Career Guidance Camps, and Picture Gallery.
          </p>
        </div>

        {/* 5 District Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {districtCards.map((dist) => {
            const isSelected = dist.id === selectedKey;
            return (
              <div
                key={dist.id}
                onClick={() => handleDistrictChange(dist.id, true)}
                className={`group bg-white rounded-2xl border cursor-pointer overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'ring-3 ring-[#7f1026] border-[#7f1026] -translate-y-1.5 shadow-xl'
                    : 'border-slate-200 hover:border-slate-400 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Photo with District Badge */}
                  <div className="relative h-32 w-full bg-slate-200 overflow-hidden">
                    <img
                      src={dist.image}
                      alt={`${dist.name} GSG Trust District Education`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <span
                      className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: dist.accent }}
                    >
                      {dist.tag}
                    </span>
                    <span className="absolute bottom-2 left-2.5 text-white text-xs font-semibold">
                      {dist.stats}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#7f1026] transition-colors">
                        {dist.name}
                      </h3>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      {dist.role}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {dist.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'bg-[#7f1026] text-white'
                        : 'bg-slate-100 group-hover:bg-[#071c35] text-slate-800 group-hover:text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Currently Viewing' : `Select ${dist.name}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SELECTED DISTRICT DETAILED PORTAL VIEW */}
      <div id="selected-district-view" className="scroll-mt-24 pt-8">
        {/* District Switcher Pill Bar */}
        <div className="bg-[#071c35] text-white border-b border-slate-800 sticky top-20 z-30 shadow-md">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                  Active District:
                </span>
              </div>

              {/* 5 District Buttons - switches smoothly without page reload */}
              <div className="flex flex-wrap items-center gap-2">
                {DISTRICT_LIST.map((dist) => {
                  const isActive = dist.id === selectedKey;
                  return (
                    <button
                      key={dist.id}
                      onClick={() => handleDistrictChange(dist.id, false)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 shadow-lg scale-105 ring-2 ring-white/50'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span>{dist.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Fast Jump to Divisions - smooth scroll without reloading */}
              <div className="hidden xl:flex items-center gap-3 text-xs text-slate-300 border-l border-slate-700 pl-4">
                <a
                  href="#district-activities"
                  onClick={(e) => handleScrollToDivision(e, 'district-activities')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Activities
                </a>
                <span>•</span>
                <a
                  href="#district-scholarships"
                  onClick={(e) => handleScrollToDivision(e, 'district-scholarships')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Scholarships
                </a>
                <span>•</span>
                <a
                  href="#district-guidance"
                  onClick={(e) => handleScrollToDivision(e, 'district-guidance')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Career Guidance
                </a>
                <span>•</span>
                <a
                  href="#district-gallery"
                  onClick={(e) => handleScrollToDivision(e, 'district-gallery')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  School Gallery
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* District Hero Section */}
        <section className={`relative bg-gradient-to-r ${currentDistrict.bannerColor} text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800`}>
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-400/40 px-4 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>GSG Trust Regional Operations • {currentDistrict.name}</span>
                </div>

                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    {currentDistrict.name} District Portal
                  </h2>
                  <p className="text-xl sm:text-2xl text-slate-200 font-semibold mt-2">
                    {currentDistrict.subtitle}
                  </p>
                </div>

                <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
                  {currentDistrict.summary}
                </p>

                {/* Office Callout */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-3xl shadow-xl">
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>Regional Desk: {currentDistrict.officeDetails.address}</span>
                    </div>
                    <div className="text-slate-300">
                      Coordinator: <strong className="text-amber-300">{currentDistrict.officeDetails.incharge}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${currentDistrict.officeDetails.phone}`}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md w-full sm:w-auto"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Helpline</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={() => setApplyModalOpen(true)}
                    size="lg"
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-xl text-sm sm:text-base cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Apply for {currentDistrict.name} Scholarship
                  </Button>

                  <a
                    href="#district-gallery"
                    onClick={(e) => handleScrollToDivision(e, 'district-gallery')}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition-all cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4 mr-2" />
                      View District Photo Gallery
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right: Key Stats Card */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-white text-slate-900 rounded-3xl p-7 sm:p-9 shadow-2xl border border-slate-100 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        District Impact Metrics
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        {currentDistrict.name} Outreach
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Active Operations
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                      <CountUpNumber
                        key={`${selectedKey}-students`}
                        end={currentMetrics.students}
                        formatCommas={true}
                        suffix="+"
                        duration={10000}
                        className="text-3xl sm:text-4xl font-black text-amber-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Students Mentored
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                      <CountUpNumber
                        key={`${selectedKey}-schools`}
                        end={currentMetrics.schools}
                        suffix="+"
                        duration={10000}
                        className="text-3xl sm:text-4xl font-black text-blue-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Schools &amp; Drives
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <CountUpNumber
                        key={`${selectedKey}-scholarships`}
                        end={currentMetrics.scholarshipsLakhs}
                        decimals={2}
                        prefix="₹"
                        suffix="L+"
                        duration={10000}
                        className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Scholarships &amp; Aid
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                      <CountUpNumber
                        key={`${selectedKey}-volunteers`}
                        end={currentMetrics.volunteers}
                        suffix="+"
                        duration={10000}
                        className="text-3xl sm:text-4xl font-black text-purple-600 mb-1"
                      />
                      <div className="text-xs sm:text-sm font-bold text-slate-700">
                        Active Volunteers
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="text-amber-300 font-bold block">100% Free Service</span>
                      <span className="text-slate-300">Zero fees for career tests &amp; guidance</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setApplyModalOpen(true)}
                      className="bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 text-xs px-4 cursor-pointer"
                    >
                      Get Help
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Filter Pills */}
        <div className="bg-white border-b border-slate-200 sticky top-36 z-20 shadow-sm">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Details', icon: Layers },
                  { id: 'activities', label: 'Education Activities', icon: BookOpen },
                  { id: 'scholarships', label: 'District Scholarships', icon: Award },
                  { id: 'guidance', label: 'Career Guidance & ICC', icon: Compass },
                  { id: 'gallery', label: 'Picture Gallery', icon: Maximize2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-semibold text-slate-500 hidden md:inline">
                Viewing: <strong className="text-slate-900">{currentDistrict.name} District Portal</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Main District Content */}
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-20">
          
          {/* SECTION A: EDUCATION ACTIVITIES */}
          {(activeTab === 'all' || activeTab === 'activities') && (
            <section id="district-activities" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    District Initiatives
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    Education-Related Activities in {currentDistrict.name}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Targeted student development, school camps, self-defense, and community upliftment.
                  </p>
                </div>

                <Button
                  onClick={() => setApplyModalOpen(true)}
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold shrink-0 shadow-sm cursor-pointer"
                >
                  Request School Camp in {currentDistrict.name}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentDistrict.activities.map((act, idx) => (
                  <Card
                    key={idx}
                    className="rounded-3xl border border-slate-200 bg-white hover:border-slate-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-primary">
                          {act.category}
                        </span>
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                          {act.badge}
                        </span>
                      </div>

                      <h4 className="text-2xl font-bold text-slate-900 leading-snug">
                        {act.title}
                      </h4>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {act.description}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                        <span>Impact: <strong className="text-slate-900">{act.beneficiaries}</strong></span>
                        <span className="text-primary flex items-center gap-1">
                          Active Initiative <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* SECTION B: DISTRICT SCHOLARSHIPS */}
          {(activeTab === 'all' || activeTab === 'scholarships') && (
            <section id="district-scholarships" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
                    Financial Aid &amp; Grants
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    Scholarships for Students in {currentDistrict.name}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    100% Free Higher Education grants, tuition fee waivers, and destitute student support.
                  </p>
                </div>

                <Link to="/scholarships">
                  <Button variant="outline" className="font-bold border-slate-300 text-slate-800 cursor-pointer">
                    View Statewide Scholarships Portal <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentDistrict.scholarships.map((sch, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                        {sch.type}
                      </div>

                      <div className="text-2xl sm:text-3xl font-black text-amber-600">
                        {sch.amount}
                      </div>

                      <h4 className="font-bold text-lg text-slate-900 leading-tight">
                        {sch.title}
                      </h4>

                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div><strong>Eligibility:</strong> {sch.eligibility}</div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {sch.highlight}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100">
                      <Button
                        onClick={() => setApplyModalOpen(true)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl cursor-pointer"
                      >
                        Apply for This Grant
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION C: CAREER GUIDANCE & ICC APTITUDE TESTING */}
          {(activeTab === 'all' || activeTab === 'guidance') && (
            <section id="district-guidance" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full">
                    Aptitude &amp; Higher Education
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    Career Guidance &amp; Counselling Desk — {currentDistrict.name}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Free Interest-Competency-Career (ICC) assessments, rank list guidance, and college selection.
                  </p>
                </div>

                <Link to="/career-guidance">
                  <Button variant="outline" className="font-bold border-slate-300 text-slate-800 cursor-pointer">
                    View Career Portal <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentDistrict.careerGuidance.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {item.tag}
                      </span>
                      <h4 className="font-bold text-lg text-slate-900 pt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <Button
                        size="sm"
                        onClick={() => setApplyModalOpen(true)}
                        className="w-full bg-[#071c35] text-white hover:bg-[#0d2e6e] text-xs font-bold py-2 rounded-xl cursor-pointer"
                      >
                        Request Guidance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION D: PICTURE GALLERY (SPECIFIC TO DISTRICT) */}
          {(activeTab === 'all' || activeTab === 'gallery') && (
            <section id="district-gallery" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full">
                    Field Photographs
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    {currentDistrict.name} School Photo Gallery
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">
                    Authentic documentation of government &amp; corporation school visits and student interactions in {currentDistrict.name}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/gallery?district=${currentDistrict.id}`}>
                    <Button variant="outline" className="font-bold border-slate-300 text-slate-800 cursor-pointer">
                      View Interactive {currentDistrict.id === 'tiruppur' ? '70-School Tiruppur' : '45+ Schools'} Gallery Stage <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Category Filter Pills and View Mode */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {['All', 'Career Guidance', 'Higher Education', 'Soft Skills', 'Govt School Quota'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setDistrictPhotoCategory(cat);
                        setDistrictPhotoLimit(12);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        districtPhotoCategory === cat
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-semibold text-slate-500">
                  Showing {Math.min(districtPhotoLimit, currentDistrict.photos.filter((p) => districtPhotoCategory === 'All' || p.category === districtPhotoCategory).length)} of {currentDistrict.photos.filter((p) => districtPhotoCategory === 'All' || p.category === districtPhotoCategory).length} Documented Schools
                </div>
              </div>

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentDistrict.photos
                  .filter((p) => districtPhotoCategory === 'All' || p.category === districtPhotoCategory)
                  .slice(0, districtPhotoLimit)
                  .map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setActivePhoto(photo)}
                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5 flex flex-col"
                  >
                    {/* Image Container with Zoom overlay */}
                    <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={photo.photoUrl}
                        alt={`${photo.schoolName} - GSG Trust`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      <div className="absolute top-4 right-4 bg-slate-900/90 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Maximize2 className="w-4 h-4 text-amber-400" />
                      </div>

                      <div className="absolute top-4 left-4">
                        <span className="bg-[#071c35]/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 shadow-sm">
                          {photo.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-xs font-bold text-amber-400 flex items-center gap-1 mb-0.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{photo.studentsCount}</span>
                        </div>
                        <h4 className="font-bold text-lg text-white leading-tight">
                          {photo.schoolName}
                        </h4>
                        <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{photo.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Description footer */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {photo.caption}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
                        <span>Click to view full image</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination / Expand controls */}
              {currentDistrict.photos.filter((p) => districtPhotoCategory === 'All' || p.category === districtPhotoCategory).length > 12 && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  {districtPhotoLimit < currentDistrict.photos.filter((p) => districtPhotoCategory === 'All' || p.category === districtPhotoCategory).length ? (
                    <>
                      <Button
                        onClick={() => setDistrictPhotoLimit((prev) => prev + 12)}
                        variant="outline"
                        className="font-bold border-slate-300 text-xs px-5 py-2 rounded-xl"
                      >
                        Load More (+12)
                      </Button>
                      <Button
                        onClick={() => setDistrictPhotoLimit(currentDistrict.photos.length)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl shadow-md"
                      >
                        Show All {currentDistrict.photos.length} Schools
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setDistrictPhotoLimit(12)}
                      variant="outline"
                      className="font-bold border-slate-300 text-xs px-5 py-2 rounded-xl"
                    >
                      Show Less (Top 12)
                    </Button>
                  )}
                </div>
              )}
            </section>
          )}

          {/* SECTION E: DISTRICT CALLOUT BANNER */}
          <section className="bg-gradient-to-r from-[#071c35] to-[#123962] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  Direct Student Assistance
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Are you a student or parent in {currentDistrict.name}?
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Contact our regional coordinator for direct higher education fee verification, First Graduate certificate help, 7.5% Government school quota applications, and personalized career mentoring.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Button
                  onClick={() => setApplyModalOpen(true)}
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg cursor-pointer"
                >
                  Request Educational Aid
                </Button>

                <a
                  href={`tel:${currentDistrict.officeDetails.phone}`}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 text-center text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {currentDistrict.officeDetails.phone}</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL FOR PICTURE GALLERY */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#071c35] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {activePhoto.schoolName} — {activePhoto.location}
                  </h4>
                  <p className="text-xs text-amber-300">
                    {activePhoto.title} • {activePhoto.studentsCount}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img
                src={photoUrlFallback(activePhoto.photoUrl)}
                alt={activePhoto.schoolName}
                className="max-h-[55vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Category: {activePhoto.category}
                </span>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>

              <a
                href={activePhoto.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 inline-flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Open High-Res</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 6. DISTRICT STUDENT AID / COUNSELLING REQUEST MODAL */}
      {applyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setApplyModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Direct Student Application
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentDistrict.name} Education Support
                </h3>
              </div>

              <button
                onClick={() => {
                  setApplyModalOpen(false);
                  setApplySubmitted(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applySubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Request Submitted!</h4>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{applyForm.name}</strong>. Our {currentDistrict.name} regional coordinator will contact you at <strong>{applyForm.phone}</strong> shortly with admission and scholarship guidance.
                </p>
                <Button
                  onClick={() => {
                    setApplyModalOpen(false);
                    setApplySubmitted(false);
                    setApplyForm({
                      name: '',
                      phone: '',
                      school: '',
                      standard: '12th Standard',
                      courseInterest: 'Engineering (B.E / B.Tech)',
                      message: '',
                    });
                  }}
                  className="bg-[#071c35] text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Enter student's name"
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    className="rounded-xl border-slate-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone *
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="rounded-xl border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Class / Standard
                    </label>
                    <select
                      value={applyForm.standard}
                      onChange={(e) => setApplyForm({ ...applyForm, standard: e.target.value })}
                      className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm text-slate-800 shadow-xs focus:outline-none"
                    >
                      <option>10th Standard</option>
                      <option>11th Standard</option>
                      <option>12th Standard</option>
                      <option>College / Polytechnic Student</option>
                      <option>Parent / Guardian</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    School Name &amp; Location
                  </label>
                  <Input
                    placeholder={`e.g. Government Higher Secondary School, ${currentDistrict.name}`}
                    value={applyForm.school}
                    onChange={(e) => setApplyForm({ ...applyForm, school: e.target.value })}
                    className="rounded-xl border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Degree / Course of Interest
                  </label>
                  <select
                    value={applyForm.courseInterest}
                    onChange={(e) => setApplyForm({ ...applyForm, courseInterest: e.target.value })}
                    className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm text-slate-800 shadow-xs focus:outline-none"
                  >
                    <option>Engineering (B.E / B.Tech / AI &amp; DS)</option>
                    <option>Arts, Science &amp; Commerce (B.Com / B.Sc / BCA)</option>
                    <option>Allied Health Sciences &amp; Nursing</option>
                    <option>Polytechnic Diploma / Lateral Entry</option>
                    <option>Direct GSG Scholarship Aid</option>
                    <option>7.5% Govt School Quota Free Seat Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Requirement or Query (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your question or scholarship requirement..."
                    value={applyForm.message}
                    onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 shadow-xs focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-3 rounded-xl text-sm shadow-md cursor-pointer"
                  >
                    Submit Request to {currentDistrict.name} Desk
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function photoUrlFallback(url: string): string {
  return url || '/images/programs_overview.jpg';
}
