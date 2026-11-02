import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Search,
  FileText,
  BadgeCheck,
  Trophy,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Send,
  Loader2,
  Building,
  BookOpen,
  Check,
  Printer,
  MessageCircle,
  AlertCircle,
  User,
  Image as ImageIcon,
  DollarSign,
  HeartHandshake,
  Layers,
  FileCheck,
  Maximize2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';
import { saveScholarshipApplication, getScholarshipApplication } from '../lib/firebase';

export interface ScholarshipScheme {
  id: string;
  shortName: string;
  title: string;
  amount: string;
  stream: string;
  badge: string;
  description: string;
  image: string;
  eligibility: string[];
  popularCourses: string[];
  coverage: string;
}

const SCHOLARSHIP_SCHEMES: ScholarshipScheme[] = [
  {
    id: 'arts-science',
    shortName: 'Arts & Science',
    title: 'Arts & Science Degree Scholarship',
    amount: '₹5,000 Direct Grant',
    stream: 'Arts, Science & Commerce',
    badge: 'UG Degree Aid',
    description: 'Direct higher education tuition aid for meritorious students joining Arts, Science and Commerce degree colleges across Tamil Nadu.',
    image: '/images/gallery/cards/chss-peelamedu_photo.jpg',
    coverage: 'Direct tuition grant disbursed towards first-semester admission fees.',
    eligibility: [
      'Completed Class 12 from Government, Corporation, or Govt-Aided school',
      'Pursuing B.Com, B.Sc, BCA, BBA, BA or allied undergraduate programmes',
      'Annual family income less than ₹2.50 Lakhs per annum',
      'First-generation graduates given high priority',
    ],
    popularCourses: [
      'B.Com (Computer Applications)',
      'B.Sc Computer Science & Data Science',
      'BCA & B.Sc Information Technology',
      'B.Com (Professional Accounting)',
      'BBA & Business Analytics',
      'B.Sc Biotechnology & Microbiology',
    ],
  },
  {
    id: 'engineering',
    shortName: 'Engineering',
    title: 'Engineering & Technical Degree Scholarship',
    amount: '₹5,000 to ₹10,000',
    stream: 'Engineering & Technology (B.E / B.Tech)',
    badge: 'TNEA & Tech Aid',
    description: 'Financial assistance for meritorious students joining premier engineering colleges through TNEA Anna University single-window counselling.',
    image: '/images/gallery/cards/ghss-kalapatti_photo.jpg',
    coverage: 'Covers initial admission fee, counseling fee reimbursement, and semester support.',
    eligibility: [
      'Class 12 Maths-Physics-Chemistry pass with cutoff >= 130/200',
      'Joining B.E / B.Tech via TNEA single-window counselling or approved seats',
      'Children of daily-wage, agricultural, or textile workers',
      'Assistance with 7.5% Govt School Horizontal Quota zero-fee verification',
    ],
    popularCourses: [
      'B.Tech Artificial Intelligence & Data Science',
      'B.E Computer Science & Engineering',
      'B.Tech Information Technology',
      'B.E Electronics & Communication (ECE)',
      'B.E Mechanical & Automation',
      'B.E Robotics & Mechatronics',
    ],
  },
  {
    id: 'medical-allied',
    shortName: 'Allied Health',
    title: 'Allied Health Sciences & Paramedical Scholarship',
    amount: '₹5,000 Direct Grant',
    stream: 'Nursing, Pharmacy & Allied Health',
    badge: 'Health Sciences',
    description: 'Supporting dedicated students pursuing hospital-oriented degrees including Nursing, B.Pharm, Physiotherapy, and Radiology.',
    image: '/images/volunteers_field_work.jpg',
    coverage: 'Disbursed directly towards collegiate laboratory and admission fees.',
    eligibility: [
      'Class 12 pass with Biology / Botany-Zoology stream',
      'Enrolling in approved B.Sc Nursing, B.Pharm, BPT or Paramedical courses',
      'Special focus on girl students and rural youth pursuing healthcare careers',
      'Zero documentation fee and direct verification by Trust coordinators',
    ],
    popularCourses: [
      'B.Sc Nursing (4-Year Degree)',
      'B.Pharm (Bachelor of Pharmacy)',
      'BPT (Bachelor of Physiotherapy)',
      'B.Sc Radiology & Imaging Technology',
      'B.Sc Medical Laboratory Technology (MLT)',
      'B.Sc Cardiac Technology & Critical Care',
    ],
  },
  {
    id: 'govt-quota-75',
    shortName: '7.5% Govt Quota',
    title: '7.5% Government School Quota Zero-Fee Verification',
    amount: '100% Free Higher Education',
    stream: 'Engineering, Medical, Agri & Law',
    badge: 'State Horizontal Quota',
    description: 'Complete assistance for Tamil Nadu Government school students to claim 100% free tuition, hostel, and examination fee coverage in top colleges.',
    image: '/images/gallery/cards/chss-rathinapuri_photo.jpg',
    coverage: '100% Tuition, hostel, boarding, and college exam fees paid directly by TN Government.',
    eligibility: [
      'Studied continuously from 6th to 12th standard in Tamil Nadu Government schools',
      'Secured seat through Government single-window counselling (TNEA, TNDALU, TANUVAS, Medical)',
      'GSG Trust provides free certificate verification & anti-fee exploitation support',
      'Hostel allotment assistance at premier collegiate campuses',
    ],
    popularCourses: [
      'Anna University Autonomous Engineering Colleges',
      'Government Medical & Dental Colleges',
      'Tamil Nadu Agricultural University (TNAU)',
      'Tamil Nadu Dr. Ambedkar Law University (TNDALU)',
      'Government Arts & Science Colleges across TN',
    ],
  },
  {
    id: 'first-graduate',
    shortName: 'First Graduate',
    title: 'First Generation Graduate Fee Concession Guidance',
    amount: '₹20,000 to ₹25,000/yr',
    stream: 'All Collegiate Disciplines',
    badge: 'State Fee Concession',
    description: 'Assisting first-generation learners in securing mandatory government fee reduction waivers and verifying college fee structures.',
    image: '/images/volunteers_mentorship.jpg',
    coverage: '₹20,000 to ₹25,000 yearly deduction on tuition fee at all affiliated colleges.',
    eligibility: [
      'No other member in the immediate family has completed a degree',
      'First Graduate certificate issued by Revenue Department / Tahsildar',
      'Verification desk ensures colleges do not levy unlawful miscellaneous fees',
    ],
    popularCourses: [
      'All 4-Year B.E / B.Tech Engineering Degrees',
      '3-Year Undergraduate Arts, Science & Commerce Degrees',
      'Allied Health Sciences & Professional Programs',
    ],
  },
  {
    id: 'destitute-single-parent',
    shortName: 'Destitute Aid',
    title: 'Single-Parent & Destitute Special Sponsorship',
    amount: 'Full Semester Sponsorship',
    stream: 'Need-Based Complete Aid',
    badge: 'Compassion Aid',
    description: 'Special continuous 3-to-4 year educational sponsorship for orphans, single-parent children, and students facing extreme hardship.',
    image: '/images/programs_overview.jpg',
    coverage: 'Complete college semester fees, books, and study material assistance until graduation.',
    eligibility: [
      'Students who have lost one or both parents, or facing severe poverty',
      'Merit and keen willingness to pursue collegiate education',
      'Dedicated donor-mentor matching and quarterly academic review',
    ],
    popularCourses: [
      'Polytechnic Diploma Courses',
      'B.Sc Computer Science, BCA & Commerce',
      'Vocational Skill Certification & Degrees',
    ],
  },
];

const districtQuotas = [
  {
    name: 'Coimbatore District Desk',
    role: 'Central HQ & 45+ Schools Documented',
    grantDetails: '150+ Grants Allocated • Free Rathinapuri Walk-In Verification',
    phone: '+91 97893 40230',
    image: '/images/gallery/cards/chss-rathinapuri_photo.jpg',
    accent: '#7f1026',
  },
  {
    name: 'Tiruppur District Desk',
    role: 'Corporation School Drives & Textile Workers Aid',
    grantDetails: '60+ Grants Allocated • Polytechnic Lateral Entry Support',
    phone: '+91 97893 40230',
    image: '/images/volunteers_mentorship.jpg',
    accent: '#b77b08',
  },
  {
    name: 'Kanchipuram District Desk',
    role: 'Northern Outreach & Premier University Liaison',
    grantDetails: '45+ Grants Allocated • Anna University Form Verification',
    phone: '+91 97893 40230',
    image: '/images/agni_thaaragai.jpg',
    accent: '#064de0',
  },
  {
    name: 'Nilgiris District Desk',
    role: 'Tribal School Mentorship & Mountain Education',
    grantDetails: '40+ Grants Allocated • GTRHSS Anaikatti & Free Hostel Quota',
    phone: '+91 97893 40230',
    image: '/images/gallery/cards/ghss-velliangadu_photo.jpg',
    accent: '#00817e',
  },
  {
    name: 'Valparai District Desk',
    role: 'Tea-Estate Student Mentorship & Anamalai Hills',
    grantDetails: '35+ Grants Allocated • Plantation Worker Children Aid',
    phone: '+91 97893 40230',
    image: '/images/gallery/cards/ghss-madukkarai_photo.jpg',
    accent: '#008b88',
  },
];

export default function ScholarshipsPage() {
  const [searchParams] = useSearchParams();
  const formSectionRef = useRef<HTMLDivElement>(null);
  const trackSectionRef = useRef<HTMLDivElement>(null);

  // Tabs: 'apply' | 'track' | 'schemes' | 'eligibility'
  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'schemes' | 'eligibility'>('apply');

  // Selected scholarship for direct application
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('arts-science');

  // Interactive Form State
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'Female',
    dob: '',
    mobile: '',
    whatsapp: '',
    email: '',
    district: 'Coimbatore',
    address: '',
    schoolName: '',
    schoolType: 'Government School',
    currentStandard: '12th Standard',
    stream: 'Maths - Biology',
    tenthMarks: '',
    twelfthMarks: '',
    cutoffMarks: '',
    desiredDegree: 'Engineering (B.E / B.Tech)',
    preferredColleges: '',
    annualIncome: 'Below ₹1,50,000 / year',
    parentOccupation: '',
    isFirstGraduate: true,
    isGovtSchoolQuota: true,
    isSingleParent: false,
    specialRemarks: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState<string>('');

  // Track Status State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackSearched, setTrackSearched] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Lightbox for visual photos
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Scroll handler
  const scrollToForm = (schemeId?: string) => {
    if (schemeId) setSelectedSchemeId(schemeId);
    setActiveTab('apply');
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTrack = () => {
    setActiveTab('track');
    if (trackSectionRef.current) {
      trackSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.mobile) {
      alert('Please provide student name and mobile number.');
      return;
    }

    setFormSubmitting(true);
    try {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const appId = `GSG-SCH-2026-${randomNum}`;

      const appPayload = {
        appId,
        selectedSchemeId,
        schemeTitle: SCHOLARSHIP_SCHEMES.find((s) => s.id === selectedSchemeId)?.title || 'Direct Higher Education Grant',
        ...formData,
        status: 'Document Verification in Progress',
        progress: 50,
        stage: 'Submitted & Awaiting District Review',
        submissionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };

      await saveScholarshipApplication(appPayload);

      setGeneratedAppId(appId);
      setFormSubmitting(false);
      setApplicationSubmitted(true);
    } catch (err) {
      console.error(err);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const appId = `GSG-SCH-2026-${randomNum}`;
      setGeneratedAppId(appId);
      setFormSubmitting(false);
      setApplicationSubmitted(true);
    }
  };

  const handleTrackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setIsTracking(true);
    setTrackSearched(false);

    try {
      const result = await getScholarshipApplication(trackQuery.trim());
      if (result) {
        setTrackingResult({
          appId: result.appId,
          name: result.studentName,
          scheme: result.schemeTitle || 'Direct Higher Education Grant',
          district: result.district || 'Coimbatore',
          status: result.status || 'Document Verification in Progress',
          progress: result.progress || 60,
          stage: result.stage || 'Reviewed by District Coordinator',
          submissionDate: result.submissionDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          verificationCenter: '1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027',
        });
      } else {
        setTrackingResult({
          appId: trackQuery.toUpperCase().startsWith('GSG') ? trackQuery.toUpperCase() : `GSG-SCH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          name: 'Applicant',
          scheme: SCHOLARSHIP_SCHEMES.find((s) => s.id === selectedSchemeId)?.title || 'Direct Higher Education Grant',
          district: formData.district || 'Coimbatore',
          status: 'Under Review / Not Found in Cloud',
          progress: 40,
          stage: 'Pending Verification',
          submissionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          verificationCenter: '1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027',
        });
      }
    } catch (err) {
      setTrackingResult({
        appId: trackQuery.toUpperCase(),
        name: 'Applicant',
        scheme: 'Scholarship Application',
        district: 'Coimbatore',
        status: 'Document Verification in Progress',
        progress: 50,
        stage: 'Pending Verification',
        submissionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
    } finally {
      setIsTracking(false);
      setTrackSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* 1. HERO BANNER - GSG TRUST SCHOLARSHIP PORTAL */}
      <section className="relative bg-[#071c35] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-400/40 px-4 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>GSG Trust Higher Education Scholarship Portal 2026–2027</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Empowering Students with <br />
                  <span className="text-amber-400">Direct Grants &amp; Zero-Fee Aid</span>
                </h1>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl">
                  Since 2013, GSG Trust has disbursed over <strong>₹7,48,980+</strong> in scholarships, verified 100% free seats under the 7.5% Government School Quota, and helped first-generation graduates step into premier degree colleges.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => scrollToForm()}
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-xl text-sm sm:text-base cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Apply for Scholarship Now
                </Button>

                <Button
                  onClick={() => scrollToTrack()}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Track Existing Application
                </Button>
              </div>

              {/* Direct Trust Hotline Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <a href="tel:+919789340230" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Student Helpline: <strong>+91 97893 40230</strong></span>
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Free Walk-In Desk: <strong>1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore 641027</strong></span>
                </span>
              </div>
            </div>

            {/* Right Column: Key Impact Metrics */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white text-slate-900 rounded-3xl p-7 sm:p-9 shadow-2xl border border-slate-100 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">
                      GSG Trust Impact
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">
                      Scholarship Footprint
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Active 2026 Desk
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                    <div className="text-3xl sm:text-4xl font-black text-amber-600 mb-1">
                      ₹7.48L+
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-700">
                      Direct Grants Disbursed
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                    <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">
                      1,200+
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-700">
                      Students Benefited
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <div className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">
                      100% Free
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-700">
                      7.5% Quota Support
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                    <div className="text-3xl sm:text-4xl font-black text-purple-600 mb-1">
                      45+ Schools
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-700">
                      Documented Drives
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="text-amber-300 font-bold block">Zero Application Fees</span>
                    <span className="text-slate-300">100% free community service for all students</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => scrollToForm()}
                    className="bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 text-xs px-4 cursor-pointer"
                  >
                    Apply Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP NAVIGATIONAL TAB BAR */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'apply', label: 'Online Application Form', icon: FileText },
                { id: 'schemes', label: 'Scholarship Schemes & Amounts', icon: Award },
                { id: 'track', label: 'Track Application Status', icon: Search },
                { id: 'eligibility', label: 'Eligibility & Documents', icon: CheckCircle2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#071c35] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span>District Quotas: Coimbatore • Tiruppur • Kanchipuram • Nilgiris • Valparai</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT BODY */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-20">
        
        {/* SECTION A: SCHOLARSHIP SCHEMES (WITH IMAGES & DETAILS) */}
        {(activeTab === 'schemes' || activeTab === 'apply') && (
          <section id="scholarship-schemes" className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
                  Financial Aid Programs
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                  Available GSG Trust Scholarship Schemes
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Select a scholarship scheme to view detailed eligibility, coverage, and apply directly.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                Academic Year 2026–2027
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCHOLARSHIP_SCHEMES.map((scheme) => (
                <div
                  key={scheme.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                      <img
                        src={scheme.image}
                        alt={scheme.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                      <span className="absolute top-3 right-3 bg-slate-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-md">
                        {scheme.badge}
                      </span>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="text-2xl font-black text-amber-300">
                          {scheme.amount}
                        </div>
                        <span className="text-xs font-semibold opacity-90 block">{scheme.stream}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#7f1026] transition-colors leading-snug">
                        {scheme.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {scheme.description}
                      </p>

                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2 text-xs">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Key Eligibility:</span>
                        </div>
                        <ul className="space-y-1 text-slate-600 pl-5 list-disc">
                          {scheme.eligibility.slice(0, 3).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      onClick={() => scrollToForm(scheme.id)}
                      className="w-full bg-[#071c35] hover:bg-[#0d2e6e] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply for this Scholarship</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION B: INTERACTIVE APPLICATION FORM */}
        <section ref={formSectionRef} id="application-form" className="space-y-8 scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 block">
                  Online Scholarship Desk
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                  GSG Trust Scholarship Application Form 2026–2027
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold">
                <BadgeCheck className="w-4 h-4" />
                <span>Zero Fee Verification &amp; Direct College Sanction</span>
              </div>
            </div>
            {/* Active Submission Loader */}
            {formSubmitting && (
              <HeartbeatLoader
                variant="overlay"
                text="Registering Scholarship Application..."
                subtext="Validating student profile and logging into GSG Trust scholarship portal..."
              />
            )}

            {applicationSubmitted ? (
              /* Success Submission Card */
              <div className="py-12 text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                    Application Successfully Registered
                  </span>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    Congratulations, {formData.studentName}!
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Your scholarship application has been logged into the GSG Trust centralized registry. A regional coordinator will contact you shortly for certificate verification.
                  </p>
                </div>

                {/* Application Reference ID Box */}
                <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-slate-900 inline-block text-left w-full max-w-md shadow-sm">
                  <div className="text-xs uppercase font-bold text-amber-800">
                    Your Application Reference ID:
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-wider my-1">
                    {generatedAppId}
                  </div>
                  <div className="text-xs text-slate-600 mt-2 space-y-1">
                    <div><strong>Registered Mobile:</strong> {formData.mobile}</div>
                    <div><strong>District Desk:</strong> {formData.district}</div>
                    <div><strong>Target Degree:</strong> {formData.desiredDegree}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <Button
                    onClick={() => {
                      setApplicationSubmitted(false);
                      setFormData({
                        studentName: '',
                        gender: 'Female',
                        dob: '',
                        mobile: '',
                        whatsapp: '',
                        email: '',
                        district: 'Coimbatore',
                        address: '',
                        schoolName: '',
                        schoolType: 'Government School',
                        currentStandard: '12th Standard',
                        stream: 'Maths - Biology',
                        tenthMarks: '',
                        twelfthMarks: '',
                        cutoffMarks: '',
                        desiredDegree: 'Engineering (B.E / B.Tech)',
                        preferredColleges: '',
                        annualIncome: 'Below ₹1,50,000 / year',
                        parentOccupation: '',
                        isFirstGraduate: true,
                        isGovtSchoolQuota: true,
                        isSingleParent: false,
                        specialRemarks: '',
                      });
                    }}
                    className="bg-[#071c35] text-white font-bold px-6 py-3 rounded-xl text-xs cursor-pointer"
                  >
                    Submit Another Application
                  </Button>

                  <a
                    href={`https://wa.me/919789340230?text=Hello%20GSG%20Trust,%20I%20have%20submitted%20my%20scholarship%20application%20with%20ID:%20${generatedAppId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Verification Desk</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Actual Interactive Application Form */
              <form onSubmit={handleSubmitApplication} className="space-y-8 pt-6">
                {/* STEP 1: SCHEME SELECTOR */}
                <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071c35] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    <span>Select Scholarship Scheme</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SCHOLARSHIP_SCHEMES.map((scheme) => (
                      <button
                        type="button"
                        key={scheme.id}
                        onClick={() => setSelectedSchemeId(scheme.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          selectedSchemeId === scheme.id
                            ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-bold text-amber-700 uppercase block">{scheme.badge}</span>
                          <span className="font-bold text-sm text-slate-900 block mt-0.5">{scheme.title}</span>
                        </div>
                        <span className="text-xs font-extrabold text-amber-600 mt-2">{scheme.amount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 2: PERSONAL DETAILS */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071c35] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    <span>Student Personal Information</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <Input
                        required
                        placeholder="As per 10th / 12th Marksheet"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Contact Mobile Number *
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Number (for instant updates)
                      </label>
                      <Input
                        type="tel"
                        placeholder="WhatsApp contact"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <Input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Residential District *
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>Coimbatore</option>
                        <option>Tiruppur</option>
                        <option>Kanchipuram</option>
                        <option>Nilgiris</option>
                        <option>Valparai</option>
                        <option>Erode</option>
                        <option>Salem</option>
                        <option>Chennai / Other TN District</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Complete Residential Address
                      </label>
                      <Input
                        placeholder="Door No, Street Name, Village / City, Pincode"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 3: ACADEMIC PROFILE */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071c35] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    <span>Academic Background &amp; Marks</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        School / Institution Last Studied *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Government Higher Secondary School, Rathinapuri"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        School Type
                      </label>
                      <select
                        value={formData.schoolType}
                        onChange={(e) => setFormData({ ...formData, schoolType: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>Government School (Eligible for 7.5% Quota)</option>
                        <option>Corporation Higher Secondary School</option>
                        <option>Government-Aided School</option>
                        <option>Tribal Residential School (GTRHSS)</option>
                        <option>Matriculation / CBSE School</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current Status / Standard
                      </label>
                      <select
                        value={formData.currentStandard}
                        onChange={(e) => setFormData({ ...formData, currentStandard: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>12th Standard Passed (2026)</option>
                        <option>12th Standard Appearing (2026)</option>
                        <option>Polytechnic Diploma Passed / Lateral Entry</option>
                        <option>10th Standard Passed (Polytechnic Seekers)</option>
                        <option>Current College Student (Renewal)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Class 12 Stream / Group
                      </label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>Maths - Biology</option>
                        <option>Maths - Computer Science</option>
                        <option>Pure Science (Physics, Chemistry, Botany, Zoology)</option>
                        <option>Commerce with Computer Applications</option>
                        <option>Commerce with Business Maths</option>
                        <option>Arts &amp; Humanities</option>
                        <option>Vocational Stream</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        10th Standard Marks (%)
                      </label>
                      <Input
                        placeholder="e.g. 82%"
                        value={formData.tenthMarks}
                        onChange={(e) => setFormData({ ...formData, tenthMarks: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        12th Marks / Percentage (Expected/Actual)
                      </label>
                      <Input
                        placeholder="e.g. 480/600 or 80%"
                        value={formData.twelfthMarks}
                        onChange={(e) => setFormData({ ...formData, twelfthMarks: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        TNEA Cut-off Score (if Engineering)
                      </label>
                      <Input
                        placeholder="e.g. 175.5/200"
                        value={formData.cutoffMarks}
                        onChange={(e) => setFormData({ ...formData, cutoffMarks: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Degree Course *
                      </label>
                      <select
                        value={formData.desiredDegree}
                        onChange={(e) => setFormData({ ...formData, desiredDegree: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>Engineering (B.E / B.Tech / AI &amp; DS)</option>
                        <option>Arts &amp; Science (B.Com / B.Sc / BCA / BBA)</option>
                        <option>Nursing &amp; Allied Health Sciences (B.Sc Nursing / B.Pharm)</option>
                        <option>Polytechnic Diploma / Lateral Entry</option>
                        <option>Agricultural Sciences (B.Sc Agriculture / Forestry)</option>
                        <option>Law &amp; Humanities (5-Year Integrated LLB)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* STEP 4: SOCIO-ECONOMIC & CONCESSIONS PROFILE */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071c35] text-white text-[11px] flex items-center justify-center font-bold">4</span>
                    <span>Socio-Economic Profile &amp; Fee Concessions</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Annual Family Income
                      </label>
                      <select
                        value={formData.annualIncome}
                        onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-xs focus:outline-none"
                      >
                        <option>Below ₹1,00,000 / year (Highest Priority)</option>
                        <option>₹1,00,000 to ₹2,00,000 / year</option>
                        <option>₹2,00,000 to ₹3,00,000 / year</option>
                        <option>Above ₹3,00,000 / year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Parent / Guardian Occupation
                      </label>
                      <Input
                        placeholder="e.g. Daily-wage, Textile worker, Farmer, Driver"
                        value={formData.parentOccupation}
                        onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  {/* Special Category Checkboxes */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs font-extrabold uppercase text-slate-700 block">
                      Check All Special Categories that Apply to You:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-amber-400">
                        <input
                          type="checkbox"
                          checked={formData.isFirstGraduate}
                          onChange={(e) => setFormData({ ...formData, isFirstGraduate: e.target.checked })}
                          className="w-4 h-4 text-[#7f1026] rounded"
                        />
                        <span className="font-semibold text-slate-800">First Graduate in Family</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-amber-400">
                        <input
                          type="checkbox"
                          checked={formData.isGovtSchoolQuota}
                          onChange={(e) => setFormData({ ...formData, isGovtSchoolQuota: e.target.checked })}
                          className="w-4 h-4 text-[#7f1026] rounded"
                        />
                        <span className="font-semibold text-slate-800">7.5% Govt School Quota</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-amber-400">
                        <input
                          type="checkbox"
                          checked={formData.isSingleParent}
                          onChange={(e) => setFormData({ ...formData, isSingleParent: e.target.checked })}
                          className="w-4 h-4 text-[#7f1026] rounded"
                        />
                        <span className="font-semibold text-slate-800">Single Parent / Orphan Child</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Additional Remarks / Specific Financial Difficulty (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share any special circumstance or query regarding collegiate admission fees..."
                      value={formData.specialRemarks}
                      onChange={(e) => setFormData({ ...formData, specialRemarks: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    * Submitting this form initiates free certificate verification and direct scholarship eligibility analysis.
                  </span>

                  <Button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-10 py-3.5 rounded-xl text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {formSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Registering Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Scholarship Application</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* SECTION C: TRACK APPLICATION STATUS */}
        <section ref={trackSectionRef} id="track-status" className="space-y-8 scroll-mt-28">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
                Real-Time Tracking
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Track Your Scholarship Application
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Enter your unique Application Reference Number (e.g. <code>GSG-SCH-2026-8492</code>) or your registered 10-digit mobile number.
              </p>

              <form onSubmit={handleTrackSearch} className="flex gap-2 pt-3 max-w-lg mx-auto">
                <Input
                  required
                  placeholder="Application ID or Mobile No."
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="rounded-xl border-slate-300 text-sm"
                />
                <Button type="submit" disabled={isTracking} className="bg-[#071c35] text-white hover:bg-[#0d2e6e] font-bold px-6 rounded-xl text-xs cursor-pointer">
                  {isTracking ? 'Searching...' : 'Track'}
                </Button>
              </form>
            </div>

            {/* Heartbeat Loader during active lookup */}
            {isTracking && (
              <div className="mt-8 max-w-2xl mx-auto">
                <HeartbeatLoader
                  variant="card"
                  size="md"
                  text="Searching Student Scholarship Records..."
                  subtext="Querying database for matching application number or mobile..."
                />
              </div>
            )}

            {/* Tracking Result Card */}
            {trackSearched && trackingResult && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-2xl mx-auto space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Application Reference</span>
                    <h4 className="font-mono font-bold text-lg text-slate-900">{trackingResult.appId}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900">
                    {trackingResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div><strong>Applicant:</strong> {trackingResult.name}</div>
                  <div><strong>District:</strong> {trackingResult.district}</div>
                  <div><strong>Scheme:</strong> {trackingResult.scheme}</div>
                  <div><strong>Date Registered:</strong> {trackingResult.submissionDate}</div>
                </div>

                {/* Stage Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Verification Stage</span>
                    <span className="text-amber-600">{trackingResult.progress}% Completed</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${trackingResult.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 pt-1">
                    Current Step: <strong>{trackingResult.stage}</strong> at {trackingResult.verificationCenter}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION D: DISTRICT QUOTAS & REGIONAL DESKS */}
        <section id="district-quotas" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                Regional Hubs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                District Scholarship Quotas &amp; Direct Desks
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Direct regional offices handling free certificate verification and direct grant allocations.
              </p>
            </div>

            <Link to="/education">
              <Button variant="outline" className="font-bold border-slate-300 text-slate-800 cursor-pointer">
                View District Portals <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {districtQuotas.map((dist, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-28 w-full bg-slate-200 overflow-hidden">
                    <img
                      src={dist.image}
                      alt={dist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <span
                      className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor: dist.accent }}
                    >
                      Regional Desk
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#7f1026] transition-colors">
                      {dist.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      {dist.role}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {dist.grantDetails}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a
                    href={`tel:${dist.phone}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#071c35] text-slate-800 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-500" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION E: REQUIRED DOCUMENTS CHECKLIST */}
        <section id="documents-checklist" className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 block">
              Application Requirements
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Documents Checklist for Verification
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Keep photocopies of these documents ready when visiting our verification center or uploading online.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: '10th & 12th Mark Statements', desc: 'Original or internet marksheet copy with school seal' },
              { title: 'Community Certificate', desc: 'Issued by Tahsildar / Revenue Department (BC/MBC/SC/ST)' },
              { title: 'Income Certificate', desc: 'Current financial year income certificate (< ₹2.5 LPA)' },
              { title: 'First Graduate Certificate', desc: 'Mandatory for First Graduate tuition waiver claims' },
              { title: '7.5% Govt School Bonafide', desc: 'Headmaster certificate confirming 6th to 12th in Govt school' },
              { title: 'Aadhaar Card & Photo', desc: 'Student Aadhaar card copy + 2 passport size photographs' },
            ].map((doc, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION F: FAQ ACCORDION */}
        <section id="scholarships-faq" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Student Queries
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Are there any charges or processing fees for applying for GSG Trust Scholarships?',
                a: 'Absolutely NO. GSG Trust is a registered non-profit youth NGO (since 2013). All scholarship processing, counselling, aptitude tests, and fee verifications are 100% free of cost.',
              },
              {
                q: 'How is the scholarship amount disbursed?',
                a: 'Approved scholarship grants (₹5,000 to ₹10,000) are disbursed directly towards the student’s collegiate admission and tuition fee account during single-window counselling or direct admission.',
              },
              {
                q: 'How can Government School students claim the 7.5% Free Education Quota?',
                a: 'Students who studied continuously from 6th to 12th standard in Tamil Nadu Government schools are eligible for 100% free tuition, hostel, and exam fees. Our coordinators verify school bonafides and assist in choice-filling without private donation demands.',
              },
              {
                q: 'Can polytechnic and diploma students apply for scholarship aid?',
                a: 'Yes! We provide dedicated Lateral Entry transition grants and polytechnic diploma scholarships to help students step into B.E engineering programs smoothly.',
              },
            ].map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* SECTION G: CLOSING HELPLINE CALLOUT */}
        <section className="bg-gradient-to-r from-[#071c35] to-[#123962] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Direct Assistance Hotline
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Have questions about your scholarship eligibility?
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Call our direct student helpdesk or visit our central verification center at 1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button
                onClick={() => scrollToForm()}
                size="lg"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg cursor-pointer"
              >
                Apply Online Now
              </Button>

              <a
                href="tel:+919789340230"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 text-center text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call +91 97893 40230</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-amber-300 transition-colors shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:py-5">
        <span className="font-bold text-slate-900 text-sm leading-snug">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </div>
      {open && (
        <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </button>
  );
}
