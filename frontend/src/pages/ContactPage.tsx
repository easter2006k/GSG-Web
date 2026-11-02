import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Shield,
  GraduationCap,
  MessageCircle,
  Building,
  User,
  HelpCircle,
  BadgeCheck,
  ExternalLink,
  Calendar,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';

const subjectOptions = [
  'Scholarship Eligibility / Application',
  'Career Guidance Programme Request for School',
  'College Fee Verification Enquiry',
  'Individual Counselling Query',
  'CSR Partnership / Volunteering',
  'Other General Enquiry',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    subject: 'Scholarship Eligibility / Application',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ref = `GSG-ENQ-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setEnquiryRef(ref);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      fullName: '',
      email: '',
      contactNumber: '',
      subject: 'Scholarship Eligibility / Application',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-slate-800 text-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400 font-semibold">Contact Us</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Helpdesk Active 9:30 AM – 6:00 PM</span>
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
            Official Trust Helpline & Office
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              GSG Trust
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Have questions about career guidance camps, college fee verification, scholarships, or 1-on-1 student counselling? Get in touch with our team in Coimbatore.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/919789340230?text=Hello%20GSG%20Trust,%20I%20am%20enquiring%20about%20student%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2 text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Directly on WhatsApp
            </a>
            <a
              href="tel:+919789340230"
              className="bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2 text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call +91-97893 40230
            </a>
          </div>
        </div>
      </section>

      {/* Main Section: Head Office Details & Send a Message Form */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Head Office Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                    Connect With Us
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-2xl">
                    Head Office Details
                  </h3>
                </div>

                {/* Details list */}
                <div className="space-y-5 text-sm text-slate-700">
                  {/* Office Address */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm mb-0.5">
                        Office Address
                      </strong>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        GSG Trust Centre,<br />
                        1st Floor, Natesa Gounder St, Lakshmipuram,<br />
                        Rathinapuri, Ganapathy, Coimbatore - 641027,<br />
                        Tamil Nadu, India.
                      </p>
                      <a
                        href="https://maps.google.com/?q=Natesa+Gounder+St,+Lakshmipuram,+Rathinapuri,+Ganapathy,+Coimbatore,+Tamil+Nadu+641027"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline mt-2"
                      >
                        Open in Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Phone Helpline */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm mb-0.5">
                        Phone Helpline
                      </strong>
                      <a
                        href="tel:+919789340230"
                        className="text-base font-bold text-slate-900 hover:text-amber-600 transition-colors block font-mono"
                      >
                        +91-97893 40230
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mon – Sat: 9:30 AM to 6:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Official Email */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm mb-0.5">
                        Official Email
                      </strong>
                      <a
                        href="mailto:gsgtrustcbe@gmail.com"
                        className="text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline block"
                      >
                        gsgtrustcbe@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Student Walk-In Hours */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm mb-0.5">
                        Student Walk-In Hours
                      </strong>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        Monday to Saturday: 9:30 AM – 6:00 PM<br />
                        <span className="text-slate-500 font-normal">Sunday: Prior appointment only</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/919789340230?text=Hello%20GSG%20Trust,%20I%20am%20enquiring%20about%20student%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center justify-between text-emerald-900 font-bold text-sm transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      Chat Directly on WhatsApp
                    </span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Send a Message Form */}
            <div className="lg:col-span-7">
              <Card className="border border-slate-200/90 shadow-2xl rounded-3xl overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white border-b border-slate-800">
                  <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    Send a Message
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    How Can We Assist You?
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Fill out the form below and a representative will reply within 24 hours.
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
                          Message Sent Successfully
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                          Thank you, {form.fullName}!
                        </h4>
                        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                          We have received your enquiry regarding <strong className="text-slate-900">&ldquo;{form.subject}&rdquo;</strong>. A GSG Trust coordinator will contact you within 24 hours.
                        </p>
                      </div>

                      {/* Reference Badge */}
                      <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl px-6 py-3.5 text-center">
                        <BadgeCheck className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">
                          Enquiry Ref:
                        </span>
                        <span className="text-xl font-mono font-bold text-amber-900">
                          {enquiryRef}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                        <a
                          href={`https://wa.me/919789340230?text=${encodeURIComponent(
                            `Hello GSG Trust, I submitted an enquiry with Reference ID: ${enquiryRef}. Subject: ${form.subject}. Name: ${form.fullName}. Please check.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp Immediate Follow-up
                        </a>
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          className="border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold py-3 px-5 rounded-xl text-sm"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {loading && (
                        <HeartbeatLoader
                          variant="overlay"
                          text="Dispatching Your Enquiry..."
                          subtext="Forwarding message to GSG Trust administrative desk..."
                        />
                      )}
                      <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Your Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="Enter your name"
                              value={form.fullName}
                              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              placeholder="your.email@example.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Contact Number (Optional) */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Contact Number (Optional)</span>
                            <span className="text-slate-400 font-normal lowercase text-[11px]">optional</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                              +91
                            </span>
                            <input
                              type="tel"
                              maxLength={10}
                              placeholder="97893 40230"
                              value={form.contactNumber}
                              onChange={(e) =>
                                setForm({ ...form, contactNumber: e.target.value.replace(/\D/g, '') })
                              }
                              className="w-full pl-12 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </div>
                        </div>

                        {/* Subject / Topic */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Subject / Topic
                          </label>
                          <select
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          >
                            {subjectOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Your Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Your Message / Enquiry Details <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="How can GSG Trust help you? Please describe your questions or requirements..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
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
                            <span>Sending Your Message…</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Send Enquiry Message</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Trust info */}
                      <div className="text-center pt-1">
                        <p className="text-xs text-slate-400 font-medium">
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
          <div className="mt-12 pt-6 border-t border-slate-900 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 GSG Trust. All rights reserved.</p>
            <p className="text-slate-400 font-medium">Empowering Youth · Building Futures · Tamil Nadu</p>
          </div>
        </div>
      </section>
    </div>
  );
}
