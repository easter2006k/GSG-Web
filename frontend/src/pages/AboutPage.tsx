import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  Heart,
  Users,
  Target,
  Sparkles,
  Phone,
  Mail,
  Building2,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Compass,
  HeartHandshake,
  Globe,
  ExternalLink,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExecutiveProfileCard } from '@/components/ui/ExecutiveProfileCard';

import { LeadershipDirectory } from '@/components/team/LeadershipDirectory';

// Core Features
const featuresList = [
  {
    icon: GraduationCap,
    title: 'Grants for Higher Education',
    description:
      'Providing financial grants and admission aid for deserving students to pursue college degrees without economic distress.',
    color: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    icon: BookOpen,
    title: 'Free Education Programs',
    description:
      'Direct free education, study resources, and career coaching for Government and Corporation school students.',
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    icon: Compass,
    title: 'Career Direction & Mentorship',
    description:
      'Expert guidance helping students identify career paths, clear doubts, and select top college courses with confidence.',
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    icon: Sparkles,
    title: 'Delicate Ability Programs',
    description:
      'Life skills, communication, emotional intelligence, leadership, and self-defense training (Agni Thaaragai) for holistic youth growth.',
    color: 'from-purple-500 to-pink-600',
    lightBg: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    icon: Lightbulb,
    title: 'Investigate & Advancement (R&D)',
    description:
      'Initiated by youthful instructors and researchers focusing on continuous improvement and effective educational methodologies.',
    color: 'from-cyan-500 to-blue-600',
    lightBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  {
    icon: HeartHandshake,
    title: '500+ Dedicated Volunteers',
    description:
      'A passionate force of over 500 volunteers from destitute prudent foundations committed to uplift society and guide students.',
    color: 'from-rose-500 to-red-600',
    lightBg: 'bg-rose-50 text-rose-700 border-rose-200',
  },
];

// FAQs based on user content
const faqItems = [
  {
    question: 'How can we help you?',
    answer:
      'We help to create a student community of Government and Corporation school students and equip them with skills and knowledge. We provide personalized career guidance, admission support, grants for higher education, and delicate ability workshops to help every student succeed.',
  },
  {
    question: 'How can I get help?',
    answer:
      'Students and parents can get in touch with GSG Trust directly through our student portal, by applying for scholarships and counselling online, or by calling our active hotline at +91-97893 40230. Our volunteers and career mentors are ready to guide you at every step.',
  },
  {
    question: 'Why We Help Students?',
    answer:
      'Making this the first objective of the Trust. We primarily focus on building a community with greater future equipping their skills and knowledge. We believe education is the most effective equalizer that transforms families and builds a progressive nation.',
  },
  {
    question: 'Why do I connect with GSG Trust?',
    answer:
      'GSG Trust is a youthful NGO body, serving the society from the year 2013, we have more than 500 volunteers who are from destitute prudent foundations and committed themselves to serve the society. With 100+ institution collaborations and over 45,000 students trained, our transparent and compassionate approach ensures real impact.',
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-800 text-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-slate-300">
          <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <span>Home</span>
          </Link>
          <span className="text-slate-500">/</span>
          <span className="text-amber-400 font-semibold">About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              GSG Trust • Serving Society Since 2013
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">GSG Trust</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We have completed <span className="text-amber-400 font-bold">100+ Collaborations</span> with schools and institutions,
              empowering <span className="text-emerald-400 font-bold">45,000+ trained students</span> and mobilizing over{' '}
              <span className="text-blue-300 font-bold">500+ dedicated volunteers</span> across India.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/programs">
                <Button size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold px-8 shadow-lg shadow-amber-400/20">
                  Explore Programs
                </Button>
              </Link>
              <Link to="/volunteers/apply">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold px-7 transition-all shadow-md"
                >
                  Become a Volunteer
                </Button>
              </Link>
              <a href="#quick-links">
                <Button
                  size="lg"
                  className="bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 font-medium px-6"
                >
                  Quick Links <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Stat Highlights Counters */}
        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-amber-400/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">45,000+</div>
              <div className="text-sm font-semibold text-white mt-1">Trained Students</div>
              <div className="text-xs text-slate-400 mt-1">Empowered with knowledge</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-blue-400/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">100+</div>
              <div className="text-sm font-semibold text-white mt-1">School Collaborations</div>
              <div className="text-xs text-slate-400 mt-1">Schools & institutions</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-400/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">500+</div>
              <div className="text-sm font-semibold text-white mt-1">Active Volunteers</div>
              <div className="text-xs text-slate-400 mt-1">Dedicated social reformers</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-purple-400/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">2013</div>
              <div className="text-sm font-semibold text-white mt-1">Serving Society</div>
              <div className="text-xs text-slate-400 mt-1">Over a decade of impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Check What Makes Us Different From Others */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Core Statement */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider">
                  About us
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Check what makes us different from others
                </h2>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative">
                  <div className="w-2 h-12 bg-amber-400 rounded-full absolute -left-1 top-6" />
                  <p className="text-slate-700 text-lg leading-relaxed font-medium pl-2">
                    &ldquo;We are centering on the improvement of the student community by giving grants for
                    higher education, free education, career direction and delicate ability programs. A group of
                    youthful experts who have involvement in instructing, Investigate and Advancement are the
                    authors of this NGO.&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-primary flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Higher Education Grants</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Direct financial support for students pursuing university degrees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Free Education & Guidance</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        No student left behind due to economic hurdles.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Career Direction</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        In-depth counseling on trending courses and future opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Delicate Ability Programs</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Life skills, personality development, communication & self-defense.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Stats Card */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/20 to-blue-600/20 rounded-3xl blur-xl" />
                  <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl text-white p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                          Key Milestone
                        </span>
                        <h3 className="text-2xl font-bold text-white">Our Track Record</h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-extrabold text-amber-400">45,000+</div>
                          <div className="text-sm font-medium text-slate-300">Trained Students</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-extrabold text-blue-400">100+</div>
                          <div className="text-sm font-medium text-slate-300">Collaborations</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-extrabold text-emerald-400">500+</div>
                          <div className="text-sm font-medium text-slate-300">Volunteers Committed</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                          <Heart className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link to="/volunteers/apply" className="block">
                        <Button className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold">
                          Join Us as a Volunteer
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Features — GSG TRUST */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Our Features
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              GSG TRUST
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              GSG Trust is a youthful NGO body, serving the society from the year 2013, for the empowerment
              of the youth and individuals in India. We have more than 500 volunteers who are from destitute
              prudent foundations and committed themselves to serve the society. We are centering on the
              improvement of the student community by giving grants for higher education, free education,
              career direction and delicate ability programs. A group of youthful experts who have
              involvement in instructing, Investigate and Advancement are the authors of this NGO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuresList.map((feat, index) => (
              <Card
                key={index}
                className="border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <CardContent className="p-7 flex flex-col h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">{feat.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">{feat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Motivation Quote Banner */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-400/30">
            <Heart className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome To Save Life And Make A Positive Impact
          </h2>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 max-w-2xl mx-auto shadow-xl">
            <p className="text-xl sm:text-2xl font-serif italic text-amber-300">
              &ldquo;Only when the society comes together and contributes we will be able to make an impact.&rdquo;
            </p>
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Every contribution enables a student from a corporation or government school to reach college,
            stand on their own feet, and uplift their entire family.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/volunteers/apply">
              <Button size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold px-8">
                Be a Volunteer
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 font-bold px-7 transition-all shadow-md"
              >
                Contact Our Helpdesk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership & Governance Directory */}
      <LeadershipDirectory
        heading="Meet Our Board & Trustees"
        subtitle="Dedicated founders, educators, and youth leaders driving GSG Trust's mission since 2013."
      />

      {/* Faq: How can we help you? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Faq
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How can we help you?
              </h2>
              <p className="text-slate-600 text-base max-w-xl mx-auto">
                Got questions about our student community, grant programs, and volunteer work? Here are answers.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {faqItems.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-primary/40 bg-blue-50/30 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg focus:outline-none"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-blue-100 text-primary text-xs flex items-center justify-center font-bold shrink-0">
                          Q{idx + 1}
                        </span>
                        <span>{item.question}</span>
                      </span>
                      <span className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed pl-14">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto">
              <p className="text-slate-700 font-medium text-sm">
                Have more questions or need immediate admission guidance?
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
                <a
                  href="tel:+919789340230"
                  className="flex items-center gap-2 text-primary hover:text-blue-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  +91-97893 40230
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href="mailto:info@gsgtrust.in"
                  className="flex items-center gap-2 text-primary hover:text-blue-800 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  info@gsgtrust.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links & Resource Hub */}
      <section id="quick-links" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Explore & Connect
              </span>
              <h2 className="text-3xl font-extrabold text-white">Quick Links & Navigation</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Direct access to all GSG Trust programs, courses, scholarships, and volunteer portals.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/"
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300">Home</div>
                <div className="text-xs text-slate-400 mt-1">Main Portal</div>
              </Link>

              <Link
                to="/about"
                className="p-5 rounded-xl bg-white/10 border border-amber-400/50 text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-amber-300">About Us</div>
                <div className="text-xs text-slate-300 mt-1">Our Story & Team</div>
              </Link>

              <Link
                to="/programs"
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300">Programs</div>
                <div className="text-xs text-slate-400 mt-1">Free Education & Grants</div>
              </Link>

              <Link
                to="/courses"
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300">Courses</div>
                <div className="text-xs text-slate-400 mt-1">Skill & Tech Training</div>
              </Link>

              <Link
                to="/volunteers"
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-400/20 text-purple-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300">Volunteers</div>
                <div className="text-xs text-slate-400 mt-1">Meet Our Community</div>
              </Link>

              <Link
                to="/volunteers/apply"
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-rose-400/20 text-rose-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300">Be a Volunteer</div>
                <div className="text-xs text-slate-400 mt-1">Join the Cause</div>
              </Link>

              <Link
                to="/scholarships"
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-400/20 text-cyan-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-amber-300">Scholarships</div>
                <div className="text-xs text-slate-400 mt-1">Higher Education Aid</div>
              </Link>

              <a
                href="#volunteer-section"
                onClick={() => {
                  window.location.href = '/#volunteer-section';
                }}
                className="p-5 rounded-xl bg-amber-400/10 border border-amber-400/40 hover:bg-amber-400 hover:text-slate-950 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-amber-300 group-hover:text-slate-950">Donation</div>
                <div className="text-xs text-slate-400 group-hover:text-slate-800 mt-1">Support a Student</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}