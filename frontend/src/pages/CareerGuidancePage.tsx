import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Send,
  Lock,
  CheckCircle2,
  Check,
  Shield,
  GraduationCap,
  MessageCircle,
  Building,
  User,
  HelpCircle,
  Printer,
  BadgeCheck,
  ArrowRight,
  MapPinned,
  BookOpen,
  Award,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
];

const expectations = [
  {
    num: '1',
    title: 'Personal Cut-Off Analysis',
    desc: 'Determine your realistic chances across Engineering, Medical, and Arts colleges.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    num: '2',
    title: 'Fee Structure Verification',
    desc: 'Compare authentic annual tuition, exam, and hostel charges across institutions.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    num: '3',
    title: '7.5% Govt School Quota Guidance',
    desc: 'Step-by-step application advice for government school alumni.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    num: '4',
    title: 'GSG Scholarship Nomination',
    desc: 'Direct assessment for up to ₹10,000 scholarship aid.',
    color: 'from-purple-500 to-violet-600',
  },
];

const upcomingVenues = [
  {
    id: 'cbe-main',
    title: 'GSG Trust Main Centre — Coimbatore',
    address: '1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027',
    timings: 'Monday to Saturday: 9:30 AM – 6:00 PM',
    type: 'Permanent Daily Centre',
    tag: 'Daily Walk-in & Appointments',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    contact: '+91-97893 40230',
  },
  {
    id: 'tpr-camp',
    title: 'Tiruppur District Career Guidance Camp',
    address: 'Town Hall Community Education Centre, Tiruppur',
    timings: 'Every Saturday: 10:00 AM – 2:00 PM',
    type: 'Weekly Weekend Camp',
    tag: 'TNEA & Arts Focus',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    contact: '+91-97893 40230',
  },
  {
    id: 'slm-camp',
    title: 'Salem Regional Student Guidance Desk',
    address: 'Govt Higher Secondary School Auditorium, Salem',
    timings: 'Every Sunday: 10:00 AM – 1:30 PM',
    type: 'Regional Camp',
    tag: '7.5% Govt Quota Desk',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    contact: '+91-97893 40230',
  },
  {
    id: 'online-tele',
    title: 'Online & Telephonic Counselling Desk',
    address: 'Google Meet / Zoom & Direct Phone Consultation',
    timings: 'Daily (Flexible Slots on Prior Booking)',
    type: 'Virtual State-wide',
    tag: 'Remote Students (TN)',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    contact: '+91-97893 40230',
  },
];

export default function CareerGuidancePage() {
  const [form, setForm] = useState({
    fullName: '',
    schoolName: '',
    mobileNumber: '',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM - 11:00 AM',
    query: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointmentRef, setAppointmentRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.mobileNumber || form.mobileNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    const ref = `GSG-CNS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppointmentRef(ref);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      fullName: '',
      schoolName: '',
      mobileNumber: '',
      preferredDate: '',
      preferredTimeSlot: '10:00 AM - 11:00 AM',
      query: '',
    });
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
            <span className="text-amber-400 font-semibold">Career Guidance</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admissions 2026–2027 Mentorship Open</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Individual Student Mentorship • 1-on-1 Career Counselling
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Career{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              Guidance
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-amber-300 font-serif italic max-w-xl mx-auto">
            Discover your potential. Explore career pathways. Plan your future.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Confidential, personalized guidance from certified educators and counsellors. Discuss cut-offs, course suitability, college fee comparisons, and government quota options.
          </p>

          {/* Quick Stats Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> Engineering, Medical & Arts Cut-Offs
            </span>
            <span className="bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> 7.5% Govt School Quota Guidance
            </span>
            <span className="bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> GSG Scholarship Up to ₹10,000
            </span>
          </div>
        </div>
      </section>

      {/* Venues and Timing Schedule Section */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Active Venues & Timings
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Counselling Venues & Schedule (2026–2027)
                </h2>
              </div>
              <a
                href="tel:+919789340230"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" /> Student Helpline: +91-97893 40230
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400/80 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${venue.tagColor}`}>
                        {venue.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                      {venue.title}
                    </h3>
                    <div className="space-y-2 text-xs text-slate-600 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{venue.address}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{venue.timings}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#booking-form"
                    className="w-full text-center text-xs font-bold bg-white hover:bg-amber-50 text-slate-900 border border-slate-300 hover:border-amber-400 py-2 rounded-xl transition-colors block mt-2"
                  >
                    Reserve Slot Here →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Mentorship & Booking Grid */}
      <section id="booking-form" className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: What to Expect & Venue Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* What to Expect */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                    Roadmap to Success
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                    What to Expect in Your Session
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {expectations.map((item) => (
                    <div
                      key={item.num}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start gap-3.5 transition-all hover:bg-amber-50/40 hover:border-amber-200"
                    >
                      <div
                        className={`w-7 h-7 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 font-black text-xs mt-0.5 shadow-sm`}
                      >
                        {item.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-0.5">
                          {item.title}:
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Counselling Venue Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                  <Building className="w-5 h-5 text-amber-600" />
                  <h4>Counselling Venue:</h4>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-white/80 p-4 rounded-2xl border border-amber-200/60 shadow-sm">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-slate-900 block font-bold">GSG Trust Main Centre,</strong>
                    <span>Rathinapuri, Coimbatore - 641027.</span>
                    <span className="block mt-1 text-slate-500 italic text-xs">
                      (Online/telephonic counselling also available on request)
                    </span>
                  </div>
                </div>

                {/* Immediate Assistance */}
                <div className="pt-2 space-y-2">
                  <h5 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                    Need Immediate Assistance?
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You can call our student helpline directly Monday to Saturday between 9:30 AM and 6:00 PM.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="tel:+919789340230"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      +91-97893 40230
                    </a>
                    <a
                      href="https://wa.me/919789340230?text=Hello%20GSG%20Trust,%20I%20want%20to%20schedule%20a%20career%20counselling%20appointment."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Appointment Booking Form */}
            <div className="lg:col-span-7">
              <Card className="border border-slate-200/80 shadow-2xl rounded-3xl overflow-hidden bg-white">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white border-b border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                      Appointment Booking Form
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800 px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> 100% Free Mentorship
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    Book Your Free Mentorship Slot
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Fill in your details below. Our coordinator will confirm your exact slot via telephone.
                  </p>
                </div>

                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="py-8 text-center space-y-6 animate-fadeIn">
                      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          Appointment Request Received
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                          Thank you, {form.fullName}!
                        </h4>
                        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                          Our counselling mentor will call you at <strong className="text-slate-900 font-mono">{form.mobileNumber}</strong> to confirm your slot for <strong className="text-slate-900">{form.preferredDate} ({form.preferredTimeSlot})</strong>.
                        </p>
                      </div>

                      {/* Reference Badge */}
                      <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl px-6 py-3.5 text-center">
                        <BadgeCheck className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">
                          Booking ID:
                        </span>
                        <span className="text-xl font-mono font-bold text-amber-900">
                          {appointmentRef}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                        <a
                          href={`https://wa.me/919789340230?text=${encodeURIComponent(
                            `Hello GSG Trust, I have requested a counselling slot with Booking ID: ${appointmentRef}. Student: ${form.fullName}, School: ${form.schoolName}, Date: ${form.preferredDate} (${form.preferredTimeSlot}). Please confirm.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                        >
                          <MessageCircle className="w-4 h-4" /> Confirm via WhatsApp
                        </a>
                        <button
                          onClick={() => window.print()}
                          className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-5 rounded-xl flex items-center gap-2 text-sm transition-all"
                        >
                          <Printer className="w-4 h-4" /> Print Booking Slip
                        </button>
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          className="border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold py-3 px-5 rounded-xl text-sm"
                        >
                          Book Another Slot
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {loading && (
                        <HeartbeatLoader
                          variant="overlay"
                          text="Reserving Career Guidance Slot..."
                          subtext="Matching your stream with verified career guidance mentors..."
                        />
                      )}
                      <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Student Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Student Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="Enter student name"
                              value={form.fullName}
                              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>

                        {/* School / Institution Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            School / Institution Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Building className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Govt HSS Rathinapuri"
                              value={form.schoolName}
                              onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* Contact Mobile Number */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Contact Mobile Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              placeholder="97893 40230"
                              value={form.mobileNumber}
                              onChange={(e) =>
                                setForm({ ...form, mobileNumber: e.target.value.replace(/\D/g, '') })
                              }
                              className="w-full pl-12 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </div>
                        </div>

                        {/* Preferred Date */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Preferred Date <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              required
                              min={new Date().toISOString().split('T')[0]}
                              value={form.preferredDate}
                              onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </div>
                        </div>

                        {/* Preferred Time Slot */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Preferred Time Slot <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={form.preferredTimeSlot}
                            onChange={(e) => setForm({ ...form, preferredTimeSlot: e.target.value })}
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

                      {/* Key Questions */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Your Query / Key Questions (Optional)</span>
                          <span className="text-slate-400 font-normal lowercase text-[11px]">optional</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="E.g. Cut-off required for Computer Science, 7.5% reservation eligibility, hostel fees comparison..."
                          value={form.query}
                          onChange={(e) => setForm({ ...form, query: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>

                      {/* Submit CTA */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          {loading ? (
                            <span>Scheduling Your Mentorship Slot…</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Request Free Counselling Appointment</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Trust info */}
                      <div className="text-center space-y-1 pt-1">
                        <p className="text-xs text-slate-600 font-semibold flex items-center justify-center gap-1.5">
                          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>🔒 100% Free · No consultation fees are ever charged to students or parents.</span>
                        </p>
                        <p className="text-xs text-slate-400">
                          Free · No Middlemen · Tamil Nadu
                        </p>
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

      {/* START A PROJECT & STATUTORY COMPLIANCE FOOTER BLOCK */}
      <section className="bg-slate-950 text-white py-16 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Start a Project */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl font-black text-white">Start a Project</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scholarships/apply"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <GraduationCap className="w-4 h-4" /> Apply for Scholarship
                </Link>
                <Link
                  to="/counselling"
                  className="border border-slate-700 hover:bg-slate-800 text-slate-200 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  Book Free Counselling
                </Link>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2 max-w-md">
                Empowering Tamil Nadu students through free career guidance, verified college information, and direct scholarships since 2021.
              </p>

              {/* Contact lines */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <a
                  href="tel:+919789340230"
                  className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold">+91-97893 40230</span>
                </a>
                <a
                  href="https://wa.me/919789340230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="mailto:gsgtrustcbe@gmail.com"
                  className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>gsgtrustcbe@gmail.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Natesa+Gounder+St,+Lakshmipuram,+Rathinapuri,+Ganapathy,+Coimbatore,+Tamil+Nadu+641027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027</span>
                </a>
              </div>

              {/* Statutory Compliance Box */}
              <div className="pt-3 border-t border-slate-800">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Statutory Compliance
                </p>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  12AB Registered · 80G: AAETG361M/2025/1/1/2<br />
                  CSR-1: CSR001963 · PAN: AATG361M
                </p>
              </div>
            </div>

            {/* Col 2: Organisation */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Organisation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition-colors">
                    About GSG Trust
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-amber-400 transition-colors">
                    Our Programmes
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-amber-400 transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="hover:text-amber-400 transition-colors">
                    News & Updates
                  </Link>
                </li>
                <li>
                  <Link to="/volunteers" className="hover:text-amber-400 transition-colors">
                    Get Involved
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Students */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Students
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link to="/scholarships" className="hover:text-amber-400 transition-colors">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships/apply" className="text-amber-400 font-bold hover:underline">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships/track" className="hover:text-amber-400 transition-colors">
                    Track Application
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-amber-400 transition-colors">
                    College Portal
                  </Link>
                </li>
                <li>
                  <Link to="/counselling" className="hover:text-amber-400 transition-colors">
                    Counselling
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Sub-strip */}
          <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 GSG Trust. All rights reserved.</p>
            <p className="text-slate-400 font-medium">Empowering Youth · Building Futures · Tamil Nadu</p>
          </div>
        </div>
      </section>
    </div>
  );
}
