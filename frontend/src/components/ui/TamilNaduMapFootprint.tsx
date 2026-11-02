import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Maximize2,
  X,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Users,
  GraduationCap,
} from 'lucide-react';

export interface LocationFootprint {
  id: string;
  number: string;
  name: string;
  tag: string;
  role: string;
  color: string;
  hoverColor: string;
  schools: string;
  students: string;
  description: string;
  educationLink: string;
  highlights: string[];
  hotspotCoords: { top: string; left: string }; // Percentage relative to the image
  isHeadquarters?: boolean;
}

export const footprintLocations: LocationFootprint[] = [
  {
    id: 'coimbatore',
    number: '01',
    name: 'Coimbatore',
    tag: 'Headquarters Hub',
    role: 'Headquarters & Central Hub',
    color: '#7f1026', // maroon
    hoverColor: '#a11833',
    schools: '45+ Schools Documented',
    students: '45,000+ Students Mentored',
    description:
      'Headquarters & Central Hub. Our central location for educational programmes and student mentorship.',
    educationLink: '/education/coimbatore',
    highlights: [
      '1st Floor, Natesa Gounder St, Rathinapuri — Central Executive Office',
      'Rathinapuri Centre — Walk-in Student Counselling',
      '45+ Corporation & Govt Higher Secondary Schools Documented',
      'Direct Scholarship Disbursement Desk (₹5,000 to ₹10,000)',
    ],
    hotspotCoords: { top: '48%', left: '58.5%' },
    isHeadquarters: true,
  },
  {
    id: 'tiruppur',
    number: '02',
    name: 'Tiruppur',
    tag: 'Corporation Hub',
    role: 'Corporation School Drives',
    color: '#b77b08', // gold
    hoverColor: '#d28a00',
    schools: '18+ School Drives',
    students: '12,000+ Students Reached',
    description:
      'Corporation School Drives. Supporting students through educational awareness and career guidance.',
    educationLink: '/education/tiruppur',
    highlights: [
      'DSCET Off-Campus Tiruppur Admissions & Verification Hub',
      'Class 12 Career Guidance for First-Generation Learners',
      'Engineering & Polytechnic Direct Fee Verification',
      'Soft Skills & Delicate Ability Training in Corporation Schools',
    ],
    hotspotCoords: { top: '48%', left: '65.5%' },
  },
  {
    id: 'nilgiris',
    number: '03',
    name: 'Nilgiris',
    tag: 'Hill & Tribal Hub',
    role: 'Tribal & Hill Education Support',
    color: '#00817e', // teal
    hoverColor: '#008b88',
    schools: '22+ Hill & Tribal Schools',
    students: '8,500+ Tribal & Hill Students',
    description:
      'Rural & Hill Education Support. Extending educational opportunities, winter kits and learning support to students.',
    educationLink: '/education/nilgiris',
    highlights: [
      'GTRHSS Anaikatti & Nilgiris Tribal School Mentorship',
      'Agni Thaaragai Self-Defense Training for Hill Girls',
      'Free Higher Education Admission & Government Hostel Aid',
      'Plains College Free Higher Education Seat Verification',
    ],
    hotspotCoords: { top: '35%', left: '60%' },
  },
  {
    id: 'valparai',
    number: '04',
    name: 'Valparai',
    tag: 'Tea-Estate Hub',
    role: 'Tea-Estate Student Mentorship',
    color: '#008b88', // emerald teal
    hoverColor: '#00a39f',
    schools: '12+ Plantation Schools',
    students: '4,200+ Estate Students',
    description:
      'Tea-Estate Student Mentorship & Anamalai Hills Outreach. Uplifting plantation workers children through higher education.',
    educationLink: '/education/valparai',
    highlights: [
      'GHSS Valparai & Sholayar Nagar Tea Estate Drives',
      'Direct Career Roadmap & College Application Help Desk',
      '100% Free 7.5% Govt School Horizontal Quota Filing',
      'Annual Winter Study Kits & Book Sponsorships',
    ],
    hotspotCoords: { top: '56%', left: '59%' },
  },
  {
    id: 'kanchipuram',
    number: '05',
    name: 'Kanchipuram',
    tag: 'University Liaison',
    role: 'Educational Outreach & Support',
    color: '#064de0', // royal blue
    hoverColor: '#1d4ed8',
    schools: '14+ School Clusters',
    students: '9,500+ Students Guided',
    description:
      'Educational Outreach & Support. Promoting student awareness, premier university liaison and access to educational opportunities.',
    educationLink: '/education/kanchipuram',
    highlights: [
      'Anna University & Premier Collegiate Counselling Liaison',
      'First Graduate Fee Concession Verification',
      'Higher Education Grant & Scholarship Advisory',
      'Corporate CSR & Foundation Educational Aid Desks',
    ],
    hotspotCoords: { top: '17%', left: '87%' },
  },
];

export function TamilNaduMapFootprint() {
  const [activeLocationId, setActiveLocationId] = useState<string>('coimbatore');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeLocation =
    footprintLocations.find((loc) => loc.id === activeLocationId) ||
    footprintLocations[0];

  return (
    <section id="footprint" className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-[#f5f8fc] text-[#071c35] border-t border-slate-200">
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Heading */}
        <header className="text-center mb-9 space-y-3">
          <div className="text-[#c58b19] text-xs sm:text-sm font-extrabold tracking-[7px] uppercase">
            Our Footprint
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071c35] leading-tight">
            Impacting Students<br />
            <span className="text-[#7f1026]">Across Tamil Nadu &amp; India</span>
          </h1>

          <p className="max-w-[850px] mx-auto text-[#536174] text-base sm:text-lg leading-relaxed pt-1">
            From our headquarters at Rathinapuri, Coimbatore, GSG Trust extends
            mentorship, scholarships, and training across government and
            corporation schools.
          </p>
        </header>

        {/* Tamil Nadu Map Infographic Graphic */}
        <div className="w-full relative mt-8 rounded-[20px] overflow-hidden bg-white shadow-[0_18px_55px_rgba(7,28,53,0.12)] border border-slate-100 group">
          {/* Main Infographic Image */}
          <img
            src="/images/gsg-tamilnadu-footprint.png"
            alt="GSG Trust educational outreach map highlighting Coimbatore, Tiruppur, Nilgiris, Valparai and Kanchipuram across Tamil Nadu"
            loading="lazy"
            className="w-full h-auto object-contain block"
          />

          {/* Interactive Click-to-Zoom Button Overlay */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 bg-slate-900 hover:bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">View Full Infographic</span>
          </button>

          {/* Hotspot Interactive Markers mapped on the graphic */}
          {footprintLocations.map((loc) => {
            const isSelected = loc.id === activeLocationId;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                style={{
                  top: loc.hotspotCoords.top,
                  left: loc.hotspotCoords.left,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none z-10"
                title={`${loc.number} - ${loc.name}`}
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover/pin:opacity-75'
                  }`}
                    style={{ backgroundColor: loc.color }}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-white text-[11px] font-black shadow-lg transition-transform ${
                      isSelected ? 'scale-125 ring-2 ring-white' : 'scale-100 group-hover/pin:scale-115'
                    }`}
                    style={{ backgroundColor: loc.color }}
                  >
                    {loc.number}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 5 Outreach Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[18px] mt-[35px]">
          {footprintLocations.map((loc) => {
            const isSelected = activeLocationId === loc.id;
            return (
              <article
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                className={`bg-white p-[25px_18px] rounded-[16px] border shadow-[0_8px_24px_rgba(7,28,53,0.06)] transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 -translate-y-[7px] shadow-[0_16px_35px_rgba(7,28,53,0.12)]'
                    : 'border-[#e7edf5] hover:-translate-y-[7px] hover:shadow-[0_16px_35px_rgba(7,28,53,0.12)]'
                }`}
                style={{
                  borderColor: isSelected ? loc.color : undefined,
                }}
              >
                <div>
                  <div
                    className="w-[42px] h-[42px] flex items-center justify-center rounded-full text-white font-extrabold mb-4 shadow-sm"
                    style={{ backgroundColor: loc.color }}
                  >
                    {loc.number}
                  </div>
                  <h3
                    className="font-serif text-[20px] font-bold mb-[4px]"
                    style={{ color: loc.color }}
                  >
                    {loc.name}
                  </h3>
                  <span className="text-[12px] text-slate-500 font-semibold block mb-2">
                    {loc.tag}
                  </span>
                  <p className="text-[#536174] text-[13.5px] leading-[1.6] mb-3">
                    {loc.description}
                  </p>
                </div>

                <Link
                  to={loc.educationLink}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-white bg-slate-100 hover:bg-[#071c35] px-3 py-2 rounded-xl transition-colors border border-slate-200"
                >
                  <span>Explore Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Selected District Expanded Preview Bar */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: activeLocation.color }}>
                <MapPin className="w-3.5 h-3.5" />
                <span>Selected District: {activeLocation.name}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {activeLocation.name} Education &amp; Student Mentorship Portal
              </h3>
              <p className="text-slate-600 text-sm max-w-3xl">
                {activeLocation.highlights.join(' • ')}
              </p>
            </div>

            <Link
              to={activeLocation.educationLink}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: activeLocation.color }}
            >
              <span>View {activeLocation.name} Activities, Scholarships &amp; Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Closing Statement Footer */}
        <footer className="mt-[35px] text-center p-[25px] rounded-[16px] bg-gradient-to-r from-[#071c35] to-[#173b58] text-white shadow-lg">
          <h2 className="text-[22px] sm:text-[25px] font-bold mb-[10px] text-white">
            Building Brighter Futures Through Education
          </h2>
          <p className="text-[#e0e8f2] text-sm sm:text-base leading-[1.8] max-w-3xl mx-auto">
            GSG Trust is committed to empowering students through mentorship,
            scholarships, training and educational awareness.
          </p>
        </footer>
      </div>

      {/* Full Infographic Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#071c35] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">
                  GSG Trust Educational Outreach Map — Tamil Nadu
                </h3>
                <p className="text-xs text-amber-400">
                  Highlighting Coimbatore, Tiruppur, Nilgiris, Valparai and Kanchipuram
                </p>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-100 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src="/images/gsg-tamilnadu-footprint.png"
                alt="GSG Trust Educational Outreach Map"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-md"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Rathinapuri, Coimbatore • GSG Trust Geographic Footprint</span>
              <a
                href="/images/gsg-tamilnadu-footprint.png"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 font-bold hover:underline"
              >
                Open Full High-Res Graphic →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
