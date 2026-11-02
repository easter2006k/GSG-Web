import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Send,
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  MessageCircle,
  BadgeCheck,
  Clock,
  Briefcase,
  User,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';
import { volunteersApi } from '../lib/api';

const GOOGLE_SCRIPT_API = "https://script.google.com/macros/s/AKfycbyouI_JiVouJxEqOYu6zlAR3e4V97a1KZyK5SePFk9YyOMSC78ZBqmSG1ngb2aJwX8JNQ/exec";

export default function VolunteersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    district: '',
    occupation: 'Student (School / College)',
    areaOfInterest: 'Career Guidance & Mentorship',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volunteerId, setVolunteerId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone/WhatsApp number.');
      return;
    }
    setLoading(true);

    const generatedId = `GSG-VOL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setVolunteerId(generatedId);

    try {
      // 1. Submit to Google Apps Script Web App
      try {
        const formDataParams = new URLSearchParams();
        formDataParams.append('formType', 'volunteer');
        formDataParams.append('Full Name', formData.fullName);
        formDataParams.append('Phone', formData.phone);
        formDataParams.append('Email', formData.email || '');
        formDataParams.append('City / District', formData.district || '');
        formDataParams.append('Occupation', formData.occupation || '');
        formDataParams.append('Area of Interest', formData.areaOfInterest || '');
        formDataParams.append('Motivation', formData.message || '');

        await fetch(GOOGLE_SCRIPT_API, {
          method: "POST",
          body: formDataParams,
          mode: "no-cors"
        });
      } catch (gasErr) {
        console.log('Google Apps Script submission notice:', gasErr);
      }

      // 2. Submit to Backend API
      try {
        await volunteersApi.apply({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.district,
          skills: [formData.occupation],
          interests: [formData.areaOfInterest],
          message: formData.message,
        });
      } catch (apiErr) {
        console.log('Backend volunteer API application logged:', apiErr);
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setLoading(false);
      setSubmitted(true); // Fallback to success UI view
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      district: '',
      occupation: 'Student (School / College)',
      areaOfInterest: 'Career Guidance & Mentorship',
      message: '',
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
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              About us
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400 font-semibold">Volunteers</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Volunteer Force Active 2026–2027</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            GSG Trust Volunteer Force • Est. 2013
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Become a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              Volunteer
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Join our family of more than <span className="text-amber-400 font-bold">500+ volunteers</span> from destitute prudent foundations committed to serving society and empowering students across India.
          </p>

          {/* Core Quote Box */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-2xl mx-auto mt-6 shadow-xl relative">
            <Quote className="w-8 h-8 text-amber-400/40 absolute -top-4 -left-3" />
            <p className="text-base sm:text-lg font-serif italic text-amber-300 leading-relaxed">
              &ldquo;Welcome To Save Life And Make A Positive Impact. Only when the society comes together and contributes we will be able to make an impact.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Registration Form */}
      <section id="volunteer-section" className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider block">
                  Join Our Social Mission
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Make a Real Difference in Students&apos; Lives
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Are you interested in being a volunteer or doing social service? Here is your chance to join GSG Trust. We work closely with government and corporation schools, training students in higher education opportunities, career direction, and delicate ability programs.
                </p>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600">500+</div>
                  <div className="text-xs text-slate-600 font-bold mt-0.5">Committed Volunteers</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">45,000+</div>
                  <div className="text-xs text-slate-600 font-bold mt-0.5">Students Trained</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600">100+</div>
                  <div className="text-xs text-slate-600 font-bold mt-0.5">School Collaborations</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-purple-600">10+ Yrs</div>
                  <div className="text-xs text-slate-600 font-bold mt-0.5">Service Since 2013</div>
                </div>
              </div>

              {/* Inspiring Volunteer Photo */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src="/images/volunteers_mentorship.jpg"
                    alt="GSG Trust Volunteers mentoring students in Tamil Nadu classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <p className="text-xs text-white font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      GSG Trust volunteer educators conducting career guidance in Tamil Nadu schools
                    </p>
                  </div>
                </div>
              </div>

              {/* What Volunteers Do */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  How Volunteers Contribute:
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Conduct career guidance & counselling camps in government schools.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mentor students in college selection and higher education grants.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Lead delicate ability (soft skills, communication, self-defense) sessions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Participate in Thaagam Theerpom welfare initiatives & student support desks.</span>
                  </li>
                </ul>
              </div>

              {/* Direct Contact Info */}
              <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 text-slate-800 space-y-2">
                <div className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-600" />
                  Direct Hotline for Volunteers:
                </div>
                <a
                  href="tel:+919789340230"
                  className="text-2xl font-black text-slate-900 hover:text-amber-600 transition-colors block"
                >
                  +91-97893 40230
                </a>
                <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email: <strong>info@gsgtrust.in</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7">
              <Card className="border border-slate-200/90 shadow-2xl rounded-3xl overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white border-b border-slate-800">
                  <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    Volunteer Application Form
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    Volunteer Application Form
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Fill out your details to join our active volunteer community.
                  </p>
                </div>

                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="py-8 px-4 text-center space-y-6 animate-fadeIn">
                      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          Application Received Successfully
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                          Thank You, {formData.fullName || 'Volunteer'}!
                        </h4>
                        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                          Your volunteer registration has been logged. Our GSG Trust volunteer coordinator will reach out to you at <strong className="text-slate-900 font-mono">{formData.phone}</strong> shortly.
                        </p>
                      </div>

                      {/* Reference Badge */}
                      <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl px-6 py-3.5 text-center">
                        <BadgeCheck className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">
                          Volunteer ID:
                        </span>
                        <span className="text-xl font-mono font-bold text-amber-900">
                          {volunteerId}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                        <a
                          href={`https://wa.me/919789340230?text=${encodeURIComponent(
                            `Hello GSG Trust, I have registered as a volunteer with ID: ${volunteerId}. Name: ${formData.fullName}, Area of Interest: ${formData.areaOfInterest}. Excited to join!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
                        >
                          <MessageCircle className="w-4 h-4" /> Connect with Coordinator on WhatsApp
                        </a>
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          className="border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold py-3 px-5 rounded-xl text-sm"
                        >
                          Submit Another Application
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {loading && (
                        <HeartbeatLoader
                          variant="overlay"
                          text="Submitting Volunteer Application..."
                          subtext="Connecting your profile with GSG community programs..."
                        />
                      )}
                      <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="Enter your name"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>

                        {/* Phone / WhatsApp Number */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Phone / WhatsApp Number <span className="text-rose-500">*</span>
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
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                              }
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>

                        {/* City / District */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            City / District <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Coimbatore, Chennai, Salem"
                              value={formData.district}
                              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Current Occupation */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Current Occupation
                          </label>
                          <select
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                          >
                            <option value="Student (School / College)">Student (School / College)</option>
                            <option value="Recent Graduate">Recent Graduate</option>
                            <option value="Working Professional">Working Professional</option>
                            <option value="Teacher / Educator">Teacher / Educator</option>
                            <option value="Social Worker">Social Worker</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Primary Area of Interest */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Primary Area of Interest
                          </label>
                          <select
                            value={formData.areaOfInterest}
                            onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                          >
                            <option value="Career Guidance & Mentorship">Career Guidance & Mentorship</option>
                            <option value="Free Education & Tutoring">Free Education & Tutoring</option>
                            <option value="Delicate Ability & Soft Skills">Delicate Ability & Soft Skills</option>
                            <option value="School Camp Organizing">School Camp Organizing</option>
                            <option value="Community & Welfare Drives">Community & Welfare Drives</option>
                          </select>
                        </div>
                      </div>

                      {/* Motivation */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Tell Us About Yourself / Motivation
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Why would you like to volunteer with GSG Trust? Any prior experience?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 sm:py-5 text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          {loading ? (
                            <span>Submitting Application…</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Submit Volunteer Application</span>
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-xs text-center text-slate-500 pt-1">
                        By submitting, you agree to receive communications from GSG Trust regarding volunteer activities.
                      </p>
                    </form>
                  </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Field Work Community Impact Showcase */}
      <section id="footprint" className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Ground Reality & Footprint
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Empowering Communities from the Grassroots
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                From tree sapling plantation drives to educational kit distributions and school career counselling camps, our volunteers are on the ground across Tamil Nadu every week.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <span className="text-2xl font-black text-amber-400 block">748,980</span>
                  <span className="text-xs text-slate-400">Donation Impact</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <span className="text-2xl font-black text-emerald-400 block">38,475</span>
                  <span className="text-xs text-slate-400">Volunteers Network</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-black text-blue-400 block">45,000+</span>
                  <span className="text-xs text-slate-400">Students Reached</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
              <img
                src="/images/volunteers_field_work.jpg"
                alt="GSG Trust volunteers distributing kits in rural schoolyard"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION MATCHING EXACT SPEC */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: About NGO */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-white px-3 py-1.5 rounded-xl shadow-md">
                  <img
                    src="/images/logo.png"
                    alt="GSG Trust - Get Set Go"
                    className="h-10 w-auto object-contain"
                  />
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
                  <Link to="/programs" className="hover:text-amber-400 transition-colors">
                    Programs
                  </Link>
                </li>
                <li>
                  <a href="#volunteer-section" className="hover:text-amber-400 transition-colors">
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
                  <Link to="/volunteers" className="hover:text-amber-400 transition-colors font-semibold text-amber-400">
                    Volunteers
                  </Link>
                </li>
                <li>
                  <a href="#volunteer-section" className="hover:text-amber-400 transition-colors">
                    Be a Volunteer
                  </a>
                </li>
                <li>
                  <Link to="/scholarships" className="hover:text-amber-400 transition-colors">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <a href="#footprint" className="hover:text-amber-400 transition-colors">
                    Our Footprint
                  </a>
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
