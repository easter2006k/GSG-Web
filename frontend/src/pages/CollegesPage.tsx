import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Building2,
  GraduationCap,
  Sparkles,
  Phone,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Award,
  BookOpen,
  DollarSign,
  X,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { allCollegesData, College, CourseItem } from '@/data/collegesData';

export default function CollegesPage() {
  const [searchParams] = useSearchParams();
  const initialDistrict = searchParams.get('district') || 'All Districts';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [selectedType, setSelectedType] = useState<string>('All College Types');
  const [selectedStream, setSelectedStream] = useState<string>('All Course Streams');
  const [selectedCollegeModal, setSelectedCollegeModal] = useState<College | null>(null);

  // Filtering Logic
  const filteredColleges = useMemo(() => {
    return allCollegesData.filter((college) => {
      // District filter
      if (selectedDistrict !== 'All Districts' && college.district !== selectedDistrict) {
        return false;
      }

      // Type filter
      if (selectedType !== 'All College Types' && college.type !== selectedType) {
        return false;
      }

      // Stream filter
      if (selectedStream !== 'All Course Streams') {
        const hasStream = college.courses.some((c) => c.stream === selectedStream);
        if (!hasStream) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(q);
        const matchesLocation = college.location.toLowerCase().includes(q);
        const matchesDistrict = college.district.toLowerCase().includes(q);
        const matchesCourse = college.courses.some((c) => c.name.toLowerCase().includes(q));

        if (!matchesName && !matchesLocation && !matchesDistrict && !matchesCourse) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDistrict, selectedType, selectedStream, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-800 text-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-slate-300">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-500">/</span>
          <span className="text-amber-400 font-semibold">Colleges & Course Directory</span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Verified Database • Academic Year 2026-2027
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Colleges & Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Directory</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Explore higher education options across Tamil Nadu with verified fee structures, academic year timestamps,
            course durations, and direct enquiry channels.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Admission Guidance
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Direct GSG Scholarship Nomination
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Phone className="w-3.5 h-3.5 text-blue-400" /> Helpline: +91 97893 40230
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Search Box */}
              <div className="md:col-span-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search college, course, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* District Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  aria-label="Filter by District"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 font-medium"
                >
                  <option value="All Districts">District: All Districts</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Erode">Erode</option>
                  <option value="Tiruppur">Tiruppur</option>
                  <option value="Salem">Salem</option>
                  <option value="Namakkal">Namakkal</option>
                  <option value="Dharmapuri">Dharmapuri</option>
                  <option value="Nilgiris">Nilgiris</option>
                </select>
              </div>

              {/* Institution Type Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Filter by Institution Type"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 font-medium"
                >
                  <option value="All College Types">Institution Type: All Types</option>
                  <option value="Autonomous">Autonomous</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="Aided">Aided</option>
                </select>
              </div>

              {/* Course Stream Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  aria-label="Filter by Course Stream"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 font-medium"
                >
                  <option value="All Course Streams">Stream: All Streams</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts & Science">Arts & Science</option>
                  <option value="Allied Health Science">Allied Health Science</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            </div>

            {/* Match Counter Badge */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-700">
                Showing <span className="text-primary font-bold">{filteredColleges.length}</span> institutions matching your criteria
              </span>
              <span className="text-slate-400 font-mono">Academic Year 2026-2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* College Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredColleges.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">No institutions found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                No colleges match your selected filters. Try choosing "All Districts" or clearing your search.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDistrict('All Districts');
                  setSelectedType('All College Types');
                  setSelectedStream('All Course Streams');
                }}
                variant="outline"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredColleges.map((college) => (
                <Card
                  key={college.id}
                  className="border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all rounded-3xl overflow-hidden bg-white"
                >
                  {/* Card Header */}
                  <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            college.type === 'Autonomous'
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {college.type}
                        </span>

                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          📍 {college.district} District
                        </span>

                        {college.isPartner && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            ⭐ GSG Trust Partner
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-extrabold text-slate-900 hover:text-primary transition-colors">
                        <button
                          onClick={() => setSelectedCollegeModal(college)}
                          className="text-left font-extrabold hover:underline"
                        >
                          {college.name}
                        </button>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {college.location}
                      </p>
                    </div>

                    {/* Enquiry Buttons */}
                    <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
                      <a
                        href={`tel:${college.phone.replace(/\s+/g, '')}`}
                        className="text-xs font-bold text-slate-700 hover:text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-500" />
                        Call: {college.phone}
                      </a>

                      <a
                        href={college.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 shadow-sm"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        WhatsApp Enquiry →
                      </a>
                    </div>
                  </div>

                  {/* Courses & Fee Structure Grid */}
                  <CardContent className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase font-extrabold text-slate-700 tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-primary" /> Key Courses & Fee Structure
                      </h4>
                      <span className="text-xs text-slate-400">
                        {college.courses.length} courses listed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {college.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span
                                className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                                  course.stream === 'Engineering'
                                    ? 'bg-blue-50 text-blue-700'
                                    : course.stream === 'Arts & Science'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : course.stream === 'Allied Health Science'
                                    ? 'bg-rose-50 text-rose-700'
                                    : 'bg-purple-50 text-purple-700'
                                }`}
                              >
                                {course.stream}
                              </span>
                              <span className="text-slate-500 font-medium">{course.duration}</span>
                            </div>

                            <h5 className="font-bold text-slate-900 text-sm leading-tight pt-1">
                              {course.name}
                            </h5>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-end justify-between">
                            <div>
                              <div className="text-xs text-slate-500">Tuition Fee:</div>
                              <div className="text-sm font-extrabold text-slate-900">
                                {course.tuitionFee}
                              </div>
                              {course.otherMandatory && (
                                <div className="text-[11px] text-slate-400">
                                  Other: {course.otherMandatory}
                                </div>
                              )}
                            </div>

                            <div className="text-[10px] text-slate-400 font-mono">
                              Verified: {course.verifiedDate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Links */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <button
                        onClick={() => setSelectedCollegeModal(college)}
                        className="text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        View Full College Profile & Admission Notes →
                      </button>

                      <Link
                        to={`/scholarships/apply?college=${encodeURIComponent(college.name)}`}
                        className="font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-lg border border-amber-200 transition-colors flex items-center gap-1"
                      >
                        Apply for GSG Scholarship with this College →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* College Profile & Admission Notes Modal */}
      {selectedCollegeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCollegeModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                  {selectedCollegeModal.type}
                </span>
                <span className="text-xs text-slate-600">📍 {selectedCollegeModal.district} District</span>
                {selectedCollegeModal.isPartner && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    ⭐ GSG Partner
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {selectedCollegeModal.name}
              </h3>
              <p className="text-xs text-slate-500">{selectedCollegeModal.location}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-primary flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> GSG Trust Admission Notes:
                </div>
                <p>
                  Direct admission assistance, fee concessions, and scholarship assessment up to ₹10,000 available for eligible government school students.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2">Available Courses & Fees:</h4>
                <div className="space-y-2">
                  {selectedCollegeModal.courses.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-slate-500">{c.stream} • {c.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-slate-900">{c.tuitionFee}</div>
                        <div className="text-[10px] text-slate-400">Verified: {c.verifiedDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={selectedCollegeModal.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  WhatsApp Admission Enquiry
                </a>

                <Link
                  to={`/scholarships/apply?college=${encodeURIComponent(selectedCollegeModal.name)}`}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                >
                  Apply for GSG Scholarship
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}