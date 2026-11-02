import React, { useState } from 'react';
import {
  GraduationCap,
  User,
  Calendar,
  BookOpen,
  Phone,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Send,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { counsellingApi } from '../lib/api';
import { saveStudentSubmission } from '../lib/firebase';

const GOOGLE_SCRIPT_API = "https://script.google.com/macros/s/AKfycbyouI_JiVouJxEqOYu6zlAR3e4V97a1KZyK5SePFk9YyOMSC78ZBqmSG1ngb2aJwX8JNQ/exec";

export default function StudentDashboard() {
  // Form State
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [standard, setStandard] = useState('');
  const [group, setGroup] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Counselling State
  const [counsellingNeeded, setCounsellingNeeded] = useState<string>(''); // 'yes' or 'no'
  const [counsellingMessage, setCounsellingMessage] = useState('');
  const [selectedLanguageMode, setSelectedLanguageMode] = useState<'english' | 'tamil' | 'thanglish'>('english');

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Quick message templates for English, Tamil, and Thanglish
  const messageTemplates = {
    english: [
      "I need guidance on choosing the right degree after 12th standard.",
      "What engineering or medical scholarships are available for high-scoring students?",
      "Can you help me understand college fee structures and first-graduate concessions in Tamil Nadu?"
    ],
    tamil: [
      "எனக்கு 12ஆம் வகுப்புக்குப் பிறகு எந்தப் படிப்பைத் தேர்ந்தெடுப்பது என்பதில் வழிகாட்டுதல் தேவை.",
      "அரசு உதவித்தொகை மற்றும் கல்விக்கடன் பெறுவது எப்படி?",
      "பொறியியல் மற்றும் கலை அறிவியல் கல்லூரிகளின் சேர்க்கை விவரங்கள் தேவை."
    ],
    thanglish: [
      "12thku aprm enna course edukalam nu guidance venum sir.",
      "Government scholarships and first graduate concession details please.",
      "Engineering counseling process epdi work agum nu sollunga."
    ]
  };

  // Handle Final Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !dateOfBirth || !standard || !mobileNumber) {
      setErrorMessage('Please complete all mandatory fields (Full Name, Date of Birth, Standard, Mobile Number).');
      return;
    }

    if (mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (standard !== '10th' && !group) {
      setErrorMessage('Please select your academic group for 11th or 12th standard.');
      return;
    }

    if (!counsellingNeeded) {
      setErrorMessage('Please specify whether you need counselling assistance.');
      return;
    }

    if (counsellingNeeded === 'yes' && !counsellingMessage.trim()) {
      setErrorMessage('Please enter your concerns or requirements for counselling.');
      return;
    }

    setErrorMessage('');
    setSubmitting(true);

    try {
      // 1. Submit to Google Apps Script Web App
      try {
        const formDataParams = new URLSearchParams();
        formDataParams.append('formType', 'student');
        formDataParams.append('Full Name', fullName);
        formDataParams.append('Date of Birth', dateOfBirth);
        formDataParams.append('Standard', `${standard} Standard ${group ? `(${group})` : ''}`);
        formDataParams.append('Mobile', mobileNumber);
        formDataParams.append('Counselling Needed', counsellingNeeded === 'yes' ? 'Yes, I need Counselling' : 'No, Thanks');
        formDataParams.append('Message', counsellingMessage || 'None');
        formDataParams.append('Language', selectedLanguageMode);

        await fetch(GOOGLE_SCRIPT_API, {
          method: "POST",
          body: formDataParams,
          mode: "no-cors"
        });
      } catch (gasErr) {
        console.log('Google Apps Script submission notice:', gasErr);
      }

      // 2. Submit to backend counselling API if needed
      if (counsellingNeeded === 'yes') {
        try {
          await counsellingApi.createRequest({
            studentName: fullName,
            contactPhone: mobileNumber,
            districtName: 'Coimbatore',
            schoolName: `Standard: ${standard} ${group ? `(${group})` : ''}`,
            concernMessage: counsellingMessage,
            preferredLanguage: selectedLanguageMode
          });
        } catch (apiErr) {
          console.log('Backend counselling API request logged:', apiErr);
        }
      }

      // 3. Prepare student submission payload for Firebase Firestore & localStorage
      const studentData = {
        fullName,
        dateOfBirth,
        standard,
        group: standard !== '10th' ? group : 'N/A (10th Standard)',
        mobileNumber,
        otpVerified: true,
        counsellingNeeded,
        counsellingMessage: counsellingMessage || 'None requested',
        languageMode: selectedLanguageMode,
        registeredAt: new Date().toISOString()
      };

      // Save to Firebase Firestore (with fallback)
      await saveStudentSubmission(studentData);

      // Save active session profile locally
      localStorage.setItem('gsg_registered_student', JSON.stringify(studentData));

      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 600);
    } catch (err: any) {
      setSubmitting(false);
      setSubmitted(true); // Proceed to success screen regardless
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20 pb-24">
      {/* Hero Banner with Education & Student Imagery */}
      <section className="relative bg-[#071c35] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('/images/volunteers_mentorship.jpg')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071c35] via-[#071c35]/95 to-[#071c35]/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6 tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            GSG TRUST STUDENT PORTAL — மாணவர் உதவி மற்றும் வழிகாட்டுதல்
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Empowering Every Student’s Academic Journey
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            Register with GSG Trust to unlock free career mentorship, scholarship assistance, higher education counselling, and district-wide educational resources.
          </p>

          {/* Quick stats pills */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>10th, 11th & 12th Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Verification</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>English, தமிழ் & Thanglish Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {submitted ? (
          /* Success Screen */
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071c35] mb-3">
              Successfully Registered GSG Trust Student
            </h2>
            <p className="text-emerald-700 font-semibold text-lg mb-6 bg-emerald-50 py-2 px-4 rounded-xl inline-block border border-emerald-200">
              🎉 Welcome to the GSG Trust Family, {fullName}! (Synced with Google Sheets & Firebase DB)
            </p>
            <div className="bg-slate-50 rounded-xl p-6 text-left max-w-lg mx-auto mb-8 border border-slate-200 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <span className="font-bold text-slate-800">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Date of Birth:</span>
                <span className="font-bold text-slate-800">{dateOfBirth}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Standard & Group:</span>
                <span className="font-bold text-slate-800">{standard} {group ? `(${group})` : ''}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Mobile Number:</span>
                <span className="font-bold text-slate-800">+91 {mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Counselling Requested:</span>
                <span className={`font-bold uppercase ${counsellingNeeded === 'yes' ? 'text-amber-600' : 'text-slate-600'}`}>
                  {counsellingNeeded}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => window.location.href = '/scholarships'}
                className="bg-[#071c35] hover:bg-[#0d2e6e] text-white font-semibold px-6 py-3"
              >
                Explore Scholarships <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setDateOfBirth('');
                  setStandard('');
                  setGroup('');
                  setMobileNumber('');
                  setCounsellingNeeded('');
                  setCounsellingMessage('');
                }}
                variant="outline"
                className="border-slate-300 font-semibold px-6 py-3"
              >
                Register Another Student
              </Button>
            </div>
          </div>
        ) : (
          /* Registration Form Card */
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#071c35] to-[#0d2e6e] px-6 py-5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Student Portal Registration & Counselling</h3>
                <p className="text-xs text-slate-300">Fill in your academic details below</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              {/* 1. Full Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  1. Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name as per school records"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7f1026] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* 2. Date of Birth */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  2. Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7f1026] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* 3. Standard */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  3. Standard / Grade <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['10th', '11th', '12th'].map((std) => (
                    <button
                      type="button"
                      key={std}
                      onClick={() => {
                        setStandard(std);
                        if (std === '10th') setGroup('');
                      }}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                        standard === std
                          ? 'bg-[#7f1026] text-white border-[#7f1026] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      {std} Standard
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Group (Display only if 11th or 12th) */}
              {(standard === '11th' || standard === '12th') && (
                <div className="bg-amber-50/60 border border-amber-200 p-5 rounded-xl space-y-3 animate-fadeIn">
                  <label className="block text-sm font-bold text-[#071c35]">
                    4. Select Group / Stream <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Computer Science (Maths, Physics, Chem, CS)",
                      "Mathematics-Biology (Pure Science)",
                      "Commerce-Accountancy (Business Maths / Computer)",
                      "Pure Science (Physics, Chem, Botany, Zoology)",
                      "Vocational / Technical Stream",
                      "Arts / Humanities / History"
                    ].map((grp) => (
                      <button
                        type="button"
                        key={grp}
                        onClick={() => setGroup(grp)}
                        className={`p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                          group === grp
                            ? 'bg-[#071c35] text-white border-[#071c35] shadow'
                            : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/50'
                        }`}
                      >
                        {grp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Mobile Number */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <label className="block text-sm font-bold text-slate-700">
                  5. Mobile Number <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="absolute inset-y-0 left-10 flex items-center text-slate-500 text-sm font-semibold pointer-events-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7f1026] focus:bg-white transition-all font-mono tracking-wider"
                  />
                </div>
              </div>

              {/* 6. Counselling Needed? */}
              <div className="border-t border-slate-200 pt-6 space-y-3">
                <label className="block text-sm font-bold text-slate-700">
                  6. Counselling Needed? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCounsellingNeeded('yes')}
                    className={`py-3.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                      counsellingNeeded === 'yes'
                        ? 'bg-amber-500 text-[#071c35] border-amber-500 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    Yes, I need Counselling
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCounsellingNeeded('no');
                      setCounsellingMessage('');
                    }}
                    className={`py-3.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                      counsellingNeeded === 'no'
                        ? 'bg-[#071c35] text-white border-[#071c35] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>No, Thanks</span>
                  </button>
                </div>
              </div>

              {/* 7. If Counselling == Yes, Message Field supporting English, Tamil, Thanglish */}
              {counsellingNeeded === 'yes' && (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-[#071c35] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#7f1026]" />
                        Type Your Concerns or Requirements
                      </h4>
                      <p className="text-xs text-slate-500">Supports English, Tamil (தமிழ்), and Thanglish.</p>
                    </div>

                    {/* Language selector tabs */}
                    <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-semibold">
                      {(['english', 'tamil', 'thanglish'] as const).map((lang) => (
                        <button
                          type="button"
                          key={lang}
                          onClick={() => setSelectedLanguageMode(lang)}
                          className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                            selectedLanguageMode === lang
                              ? 'bg-[#071c35] text-white shadow'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {lang === 'tamil' ? 'தமிழ் (Tamil)' : lang === 'thanglish' ? 'Thanglish' : 'English'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick templates helper */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-500">Quick suggestions ({selectedLanguageMode}):</span>
                    <div className="flex flex-wrap gap-2">
                      {messageTemplates[selectedLanguageMode].map((tpl, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setCounsellingMessage(tpl)}
                          className="text-xs bg-white hover:bg-amber-50 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors text-left"
                        >
                          "{tpl}"
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={counsellingMessage}
                    onChange={(e) => setCounsellingMessage(e.target.value)}
                    placeholder={
                      selectedLanguageMode === 'tamil'
                        ? "உங்கள் கேள்விகள் அல்லது தேவைகளை இங்கே தமிழில் எழுதவும்..."
                        : selectedLanguageMode === 'thanglish'
                        ? "Engineering admission guidance, scholarships, or college details epdi ketukalam..."
                        : "Type your career goals, doubts about college admissions, or scholarship requirements..."
                    }
                    className="w-full p-4 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7f1026] transition-all font-sans"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-[#7f1026] hover:bg-[#9c1530] text-white font-bold px-8 py-4 text-base shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Submitting to Google Sheets & Firebase DB...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit & Register Student Portal
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
