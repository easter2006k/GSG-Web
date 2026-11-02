import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  Building,
  User,
  Phone,
  Calendar,
  FileCheck,
  Shield,
  MessageCircle,
  Printer,
  Sparkles,
  ArrowRight,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';

interface TrackingData {
  appId: string;
  applicantName: string;
  category: 'Scholarship' | 'Counselling' | 'Volunteer';
  district: string;
  institution: string;
  status: string;
  stageStep: number; // 1 to 4
  submissionDate: string;
  verifiedBy: string;
  targetDetails: string;
}

const SAMPLE_RECORDS: Record<string, TrackingData> = {
  'GSG-SCH-2026-8492': {
    appId: 'GSG-SCH-2026-8492',
    applicantName: 'S. Kausalya Devi',
    category: 'Scholarship',
    district: 'Coimbatore',
    institution: 'Government Girls HSS, Rathinapuri',
    status: 'Document Verification in Progress',
    stageStep: 2,
    submissionDate: '24 Oct 2026',
    verifiedBy: 'Central Verification Desk / 1st Floor, Natesa Gounder St, Rathinapuri, Coimbatore',
    targetDetails: 'B.E Computer Science & Engineering (7.5% Govt School Quota)',
  },
  'GSG-CNS-2026-3012': {
    appId: 'GSG-CNS-2026-3012',
    applicantName: 'M. Vignesh Kumar',
    category: 'Counselling',
    district: 'Tiruppur',
    institution: 'Jaivabai Girls Model HSS, Tiruppur',
    status: 'Senior Counsellor Assigned',
    stageStep: 3,
    submissionDate: '25 Oct 2026',
    verifiedBy: 'Tiruppur District Education Cell',
    targetDetails: 'Engineering TNEA Choice Filling & Cut-off Guidance',
  },
  'GSG-VOL-2026-7741': {
    appId: 'GSG-VOL-2026-7741',
    applicantName: 'Dr. Priya Ramasamy',
    category: 'Volunteer',
    district: 'Nilgiris',
    institution: 'Government Arts College, Ooty',
    status: 'Onboarding & Orientation Ready',
    stageStep: 4,
    submissionDate: '22 Oct 2026',
    verifiedBy: 'GSG Trust Volunteer Coordination Committee',
    targetDetails: 'Tribal School Mentorship & Career Guidance Volunteer',
  },
};

export default function ApplicationStatusPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOverlayDemo, setShowOverlayDemo] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<TrackingData | null>(null);

  const handleSearch = (queryToUse?: string) => {
    const q = (queryToUse || searchQuery).trim().toUpperCase();
    if (!q) return;

    setLoading(true);
    setSearched(false);

    setTimeout(() => {
      setLoading(false);
      setSearched(true);

      if (SAMPLE_RECORDS[q]) {
        setResult(SAMPLE_RECORDS[q]);
      } else {
        // Dynamic simulated record for any custom ID or mobile number
        const isCns = q.includes('CNS');
        const isVol = q.includes('VOL');
        const cat = isCns ? 'Counselling' : isVol ? 'Volunteer' : 'Scholarship';
        const formattedId = q.startsWith('GSG-') ? q : `GSG-${cat.slice(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        setResult({
          appId: formattedId,
          applicantName: 'Meritorious Candidate',
          category: cat,
          district: 'Coimbatore',
          institution: 'Government Higher Secondary School',
          status: 'Record Found & Under Active Review',
          stageStep: 2,
          submissionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          verifiedBy: 'GSG Trust Central Help Desk, Rathinapuri',
          targetDetails: 'Higher Education Admission & Sponsorship Review',
        });
      }
    }, 850);
  };

  const triggerOverlayTest = () => {
    setShowOverlayDemo(true);
    setTimeout(() => {
      setShowOverlayDemo(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Overlay Demonstration Modal */}
      {showOverlayDemo && (
        <HeartbeatLoader
          variant="overlay"
          text="Synchronizing Central Application Database..."
          subtext="Validating records against Tamil Nadu 38-district education portal..."
        />
      )}

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Status &amp; Document Verification Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Track Application &amp; Appointment Status
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Verify real-time status of your scholarship application, career guidance session booking, or volunteer onboarding across Tamil Nadu.
          </p>

          {/* Search Card */}
          <div className="pt-6 max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="bg-white p-2.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 border border-white/30"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <Input
                  required
                  placeholder="Enter Application ID (e.g. GSG-SCH-2026-8492) or 10-digit Mobile"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3.5 rounded-xl border-slate-200 text-slate-900 text-sm font-medium w-full"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Searching...' : 'Track Status'}
              </Button>
            </form>

            {/* Quick Demo Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-300 font-medium">Quick Demo Samples:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('GSG-SCH-2026-8492');
                  handleSearch('GSG-SCH-2026-8492');
                }}
                className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-lg border border-white/20 transition-all font-mono"
              >
                GSG-SCH-2026-8492 (Scholarship)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('GSG-CNS-2026-3012');
                  handleSearch('GSG-CNS-2026-3012');
                }}
                className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-lg border border-white/20 transition-all font-mono"
              >
                GSG-CNS-2026-3012 (Counselling)
              </button>
              <button
                type="button"
                onClick={triggerOverlayTest}
                className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 px-3 py-1 rounded-lg border border-amber-400/30 transition-all font-bold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Test Fullscreen Overlay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {/* Active Heartbeat Loader */}
          {loading && (
            <div className="max-w-xl mx-auto animate-in fade-in duration-200">
              <HeartbeatLoader
                variant="card"
                size="md"
                text="Querying Central Student Database..."
                subtext="Searching authenticated application records and verification stages..."
              />
            </div>
          )}

          {/* Search Result Card */}
          {!loading && searched && result && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 uppercase tracking-wider">
                      {result.category} Application
                    </span>
                    <span className="text-xs text-slate-500">Registered {result.submissionDate}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                    {result.appId}
                  </h2>
                </div>

                <div className="sm:text-right">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-200">
                    {result.status}
                  </span>
                </div>
              </div>

              {/* Four-Stage Step Progression */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Processing Pipeline
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { step: 1, label: 'Submitted & Logged' },
                    { step: 2, label: 'Document Verification' },
                    { step: 3, label: 'District Cell Review' },
                    { step: 4, label: 'Final Sanction' },
                  ].map((stage) => {
                    const isDone = stage.step < result.stageStep;
                    const isCurrent = stage.step === result.stageStep;
                    return (
                      <div
                        key={stage.step}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : isCurrent
                            ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-400/30'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isCurrent ? (
                            <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center">
                              {stage.step}
                            </span>
                          )}
                          <span className="text-xs font-bold">Step {stage.step}</span>
                        </div>
                        <p className="text-[11px] font-semibold">{stage.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Applicant Profile Grid */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Applicant Full Name</span>
                  <strong className="text-sm text-slate-900 font-bold">{result.applicantName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Home District</span>
                  <strong className="text-sm text-slate-900 font-bold">{result.district}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Institution / School</span>
                  <strong className="text-sm text-slate-900 font-bold">{result.institution}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Scheme / Program Focus</span>
                  <strong className="text-sm text-slate-900 font-bold">{result.targetDetails}</strong>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-semibold block">Assigned Verification Node</span>
                  <strong className="text-slate-800 font-medium">{result.verifiedBy}</strong>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/919789340230?text=${encodeURIComponent(
                      `Hello GSG Trust, I am checking status for Application ID: ${result.appId} (${result.applicantName}, ${result.district}). Please share verification update.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> Message Verification Desk on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Print Verification Receipt
                  </button>
                </div>

                <Button
                  onClick={() => {
                    setSearched(false);
                    setResult(null);
                    setSearchQuery('');
                  }}
                  variant="outline"
                  className="text-xs font-semibold rounded-xl"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Track Another Application
                </Button>
              </div>
            </div>
          )}

          {/* Informational Guidance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Scholarship Grants</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Applications submitted online are validated within 48–72 hours by our district education coordinators.
              </p>
              <Link to="/scholarships" className="text-xs text-primary font-bold inline-flex items-center gap-1 pt-1 hover:underline">
                Explore Schemes <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Mentorship Slots</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                1-on-1 counseling appointment slips can be presented directly at our Rathinapuri guidance center.
              </p>
              <Link to="/counselling" className="text-xs text-amber-600 font-bold inline-flex items-center gap-1 pt-1 hover:underline">
                Book Guidance <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Volunteer Network</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Volunteers are verified against regional school needs in Tiruppur, Coimbatore, and Nilgiris.
              </p>
              <Link to="/volunteers" className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1 pt-1 hover:underline">
                Join Community <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
