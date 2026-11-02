import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  ShieldCheck,
  Award,
  BookOpen,
  Mail,
  Instagram,
  Linkedin,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  allTeamMembers,
  TeamMember,
  TeamDepartment,
} from '@/data/leadershipData';
import { teamApi } from '@/lib/api';
import { ProfileDetailsModal } from './ProfileDetailsModal';

export interface LeadershipDirectoryProps {
  className?: string;
  heading?: string;
  subtitle?: string;
}

export function LeadershipDirectory({
  className = '',
  heading = 'Meet Our Board & Trustees',
  subtitle = "Dedicated founders, educators, and youth leaders driving GSG Trust's mission since 2013.",
}: LeadershipDirectoryProps) {
  const [members, setMembers] = useState<TeamMember[]>(allTeamMembers);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedModalMember, setSelectedModalMember] = useState<TeamMember | null>(null);

  // Fetch live published team members from backend API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const data = await teamApi.getAllPublished();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          const normalized: TeamMember[] = data.map((m: any) => ({
            ...m,
            name: m.fullName || m.name,
            role: m.designation || m.role,
            image: m.photoUrl || m.image,
            socials: m.socialLinks || m.socials || {},
          }));
          setMembers(normalized);
        }
      } catch (err) {
        // Fallback silently to static verified records
        console.info('[LeadershipDirectory] Using verified local records fallback.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and search logic
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Status check: only PUBLISHED
      if (member.status && member.status !== 'PUBLISHED') return false;

      // Department filter
      if (selectedDept !== 'ALL' && member.department !== selectedDept) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (member.fullName || member.name || '').toLowerCase().includes(query);
        const roleMatch = (member.designation || member.role || '').toLowerCase().includes(query);
        const bioMatch = (member.biography || '').toLowerCase().includes(query);
        const expertiseMatch = (member.expertise || '').toLowerCase().includes(query);
        const respMatch = (member.responsibilities || '').toLowerCase().includes(query);

        return nameMatch || roleMatch || bioMatch || expertiseMatch || respMatch;
      }

      return true;
    });
  }, [members, selectedDept, searchQuery]);

  // Counts by department
  const totalPublishedCount = useMemo(() => {
    return members.filter((m) => !m.status || m.status === 'PUBLISHED').length;
  }, [members]);

  const departmentCounts = useMemo(() => {
    const published = members.filter((m) => !m.status || m.status === 'PUBLISHED');
    return {
      ALL: published.length,
      EXECUTIVE_LEADERSHIP: published.filter((m) => m.department === 'EXECUTIVE_LEADERSHIP').length,
      BOARD_OF_TRUSTEES: published.filter((m) => m.department === 'BOARD_OF_TRUSTEES').length,
      ADVISORY_COMMITTEE: published.filter((m) => m.department === 'ADVISORY_COMMITTEE').length,
      TRAINERS_AND_FACULTY: published.filter((m) => m.department === 'TRAINERS_AND_FACULTY').length,
    };
  }, [members]);

  // Distinct groups when viewing "ALL" without active search
  const isDefaultView = selectedDept === 'ALL' && !searchQuery.trim();

  const executiveLeaders = useMemo(() => {
    return filteredMembers.filter((m) => m.department === 'EXECUTIVE_LEADERSHIP');
  }, [filteredMembers]);

  const boardTrustees = useMemo(() => {
    return filteredMembers.filter((m) => m.department === 'BOARD_OF_TRUSTEES');
  }, [filteredMembers]);

  const advisoryList = useMemo(() => {
    return filteredMembers.filter((m) => m.department === 'ADVISORY_COMMITTEE');
  }, [filteredMembers]);

  const trainersList = useMemo(() => {
    return filteredMembers.filter((m) => m.department === 'TRAINERS_AND_FACULTY');
  }, [filteredMembers]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDept('ALL');
  };

  return (
    <section
      id="leadership-directory"
      className={`py-20 bg-[#F4F7FC] border-y border-slate-200 transition-colors ${className}`}
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ── 1. SECTION HEADER ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-[#19396B] text-xs font-extrabold uppercase tracking-widest border border-blue-200/80">
            <ShieldCheck className="w-4 h-4 text-[#19396B]" />
            <span>LEADERSHIP &amp; GOVERNANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172033] tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#172033] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{totalPublishedCount} Verified Leaders &amp; Faculty</span>
          </div>
        </div>

        {/* ── 2. SEARCH AND FILTERS BAR ───────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team by name, title, expertise, or keywords..."
                aria-label="Search team members"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#19396B] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result count & Clear button */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 shrink-0">
              <span>
                Showing <strong className="text-slate-900">{filteredMembers.length}</strong> of {totalPublishedCount} members
              </span>
              {(searchQuery || selectedDept !== 'ALL') && (
                <button
                  onClick={clearFilters}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#19396B] font-bold transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {[
              { id: 'ALL', label: 'All Members', count: departmentCounts.ALL },
              { id: 'EXECUTIVE_LEADERSHIP', label: 'Executive Leadership', count: departmentCounts.EXECUTIVE_LEADERSHIP },
              { id: 'BOARD_OF_TRUSTEES', label: 'Board of Trustees & Exec', count: departmentCounts.BOARD_OF_TRUSTEES },
              { id: 'ADVISORY_COMMITTEE', label: 'Advisory Committee', count: departmentCounts.ADVISORY_COMMITTEE },
              { id: 'TRAINERS_AND_FACULTY', label: 'Trainers & Faculty', count: departmentCounts.TRAINERS_AND_FACULTY },
            ].map((tab) => {
              const isActive = selectedDept === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDept(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#19396B] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-[#FFDF36] text-[#172033]' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── EMPTY STATE ─────────────────────────────────────────────────── */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">No team members found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                No published team records match your search query "{searchQuery}". Try searching by another keyword or reset the filters.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-[#19396B] text-white font-bold text-xs hover:bg-[#112752] transition-colors cursor-pointer shadow-sm"
            >
              Show All Team Members
            </button>
          </div>
        )}

        {/* ── 3. EXECUTIVE LEADERSHIP (Founder Banner with Gold Backdrop) ── */}
        {isDefaultView ? (
          <>
            {executiveLeaders.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-[#172033] border-l-4 border-[#19396B] pl-3">
                    Executive Leadership
                  </h3>
                </div>

                {executiveLeaders.map((founder, idx) => (
                  <div
                    key={founder.id || idx}
                    className="group rounded-3xl p-6 sm:p-8 bg-[#19396B] text-white shadow-xl border border-[#FFDF36]/40 hover:shadow-2xl transition-all relative overflow-hidden"
                  >
                    {/* Subtle decorative gold ambient glow */}
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#FFDF36]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
                      {/* Editorial Grayscale Portrait with Gold Backdrop Frame */}
                      <div className="relative shrink-0">
                        {/* Golden backdrop panel */}
                        <div className="absolute -inset-1.5 bg-[#FFDF36] rounded-2xl opacity-90 blur-2xs group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-950 border-2 border-[#FFDF36] shadow-xl aspect-square">
                          <img
                            src={founder.photoUrl || founder.image}
                            alt={`Portrait of ${founder.fullName || founder.name}, Founder-Chairman`}
                            loading="lazy"
                            className="w-full h-full object-cover object-top filter grayscale contrast-[1.10] brightness-[0.98] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                            onError={(e: any) => {
                              e.target.src = '/images/team/placeholder.jpg';
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                          <h4 className="font-black text-2xl sm:text-3xl text-white leading-tight">
                            {founder.fullName || founder.name}
                          </h4>
                          {founder.badge && (
                            <span className="px-3.5 py-1 rounded-full bg-[#FFDF36] text-[#172033] text-xs font-black shadow-sm tracking-wide">
                              {founder.badge}
                            </span>
                          )}
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-amber-200">
                          • {founder.designation || founder.role}
                        </div>

                        {founder.biography && (
                          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-3xl">
                            {founder.biography}
                          </p>
                        )}

                        {/* Interactive Buttons */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                          <button
                            onClick={() => setSelectedModalMember(founder)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FFDF36] text-[#172033] hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
                          >
                            <span>View Full Profile</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          {(founder.socialLinks?.email || founder.socials?.email) && (
                            <a
                              href={`mailto:${founder.socialLinks?.email || founder.socials?.email}`}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#FFDF36]" />
                              <span>Email Desk</span>
                            </a>
                          )}

                          {(founder.socialLinks?.linkedin || founder.socials?.linkedin) && (
                            <a
                              href={founder.socialLinks?.linkedin || founder.socials?.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                            >
                              <Linkedin className="w-3.5 h-3.5 text-blue-300" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── 4. BOARD OF TRUSTEES (Editorial Grayscale + Center Aligned) ── */}
            {boardTrustees.length > 0 && (
              <div className="space-y-8 pt-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#19396B] text-[11px] font-extrabold uppercase tracking-wider border border-blue-200/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#19396B]" />
                    <span>Executive Governance Hierarchy</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                    Board of Trustees &amp; Executive Team
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                    Seniority: Trustee • President • Treasurer • Secretaries • CSR Head • CSR Coordinator • Admin Accounts
                  </p>
                </div>

                {/* 3-Column Desktop Grid with Centered Symmetrical Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                  {boardTrustees.map((member, index) => {
                    const photo = member.photoUrl || member.image;
                    const name = member.fullName || member.name;
                    const role = member.designation || member.role;
                    const socials = member.socialLinks || member.socials;
                    const isLastOrphanOnDesktop = boardTrustees.length % 3 === 1 && index === boardTrustees.length - 1;

                    return (
                      <div
                        key={member.id || index}
                        className={`group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#19396B]/50 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden text-center items-center ${
                          isLastOrphanOnDesktop ? 'lg:col-start-2' : ''
                        }`}
                      >
                        {/* ── EDITORIAL PORTRAIT VISUAL AREA ──────────────── */}
                        <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-100/80 to-slate-200/90 flex items-end justify-center pt-8">
                          {/* Consistent Golden-Yellow Horizontal / Arched Background Panel */}
                          <div className="absolute bottom-0 inset-x-5 h-44 sm:h-48 rounded-t-3xl bg-gradient-to-t from-[#FFDF36] to-[#FFE866] shadow-inner group-hover:from-[#FFE866] group-hover:to-[#FFDF36] transition-all duration-500 ease-out" />

                          {/* Role Badge (Centered on portrait) */}
                          {member.badge && (
                            <div className="absolute top-4 inset-x-0 mx-auto w-fit z-20">
                              <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#19396B] text-white shadow-md border border-white/20">
                                {member.badge}
                              </span>
                            </div>
                          )}

                          {/* Overlapping Grayscale Portrait Image */}
                          <div className="relative z-10 w-full h-full flex items-end justify-center">
                            <img
                              src={photo}
                              alt={`Portrait of ${name}, ${role}`}
                              loading="lazy"
                              className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98] drop-shadow-md group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100 transition-all duration-500 ease-out"
                              onError={(e: any) => {
                                e.target.src = '/images/team/placeholder.jpg';
                              }}
                            />
                          </div>

                          {/* Subtle Bottom Vignette */}
                          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/15 to-transparent pointer-events-none z-15" />
                        </div>

                        {/* ── CARD INFORMATION AREA (CENTER ALIGNED) ───────── */}
                        <div className="p-6 flex flex-col items-center text-center gap-3 flex-1 justify-between bg-white w-full">
                          <div className="w-full flex flex-col items-center text-center">
                            <h4 className="font-black text-[#172033] text-lg sm:text-xl leading-tight group-hover:text-[#19396B] transition-colors text-center">
                              {name}
                            </h4>
                            <p className="text-xs sm:text-sm font-bold text-[#19396B] mt-1 text-center">
                              {role}
                            </p>
                            {member.expertise && (
                              <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed text-center max-w-xs mx-auto">
                                {member.expertise}
                              </p>
                            )}
                          </div>

                          {/* Footer Action & Social Links (Center Aligned) */}
                          <div className="pt-4 border-t border-slate-100 w-full flex flex-col items-center justify-center gap-3">
                            <button
                              onClick={() => setSelectedModalMember(member)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-[#19396B] hover:bg-[#19396B] hover:text-white transition-all cursor-pointer shadow-2xs group-hover:bg-[#19396B] group-hover:text-white"
                            >
                              <span>View Full Profile</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            {socials && (socials.email || socials.instagram || socials.linkedin) && (
                              <div className="flex items-center justify-center gap-2">
                                {socials.email && (
                                  <a
                                    href={`mailto:${socials.email}`}
                                    title={`Email: ${socials.email}`}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                {socials.instagram && (
                                  <a
                                    href={socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Instagram"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                                  >
                                    <Instagram className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                {socials.linkedin && (
                                  <a
                                    href={socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="LinkedIn"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <Linkedin className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── 5. ADVISORY COMMITTEE (Center Aligned Editorial Cards) ── */}
            {advisoryList.length > 0 && (
              <div className="space-y-8 pt-10 border-t border-slate-200">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 text-[11px] font-extrabold uppercase tracking-wider border border-amber-200/60 mx-auto">
                    <span>Advisory Board</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                    Advisory Committee
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] font-bold">
                    {advisoryList.length} Esteemed Advisors
                  </p>
                </div>

                {/* Symmetrical Centered Flex Layout — Incomplete rows center naturally */}
                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                  {advisoryList.map((advisor, index) => {
                    const photo = advisor.photoUrl || advisor.image;
                    const name = advisor.fullName || advisor.name;
                    const role = advisor.designation || advisor.role;

                    return (
                      <div
                        key={advisor.id || index}
                        onClick={() => setSelectedModalMember(advisor)}
                        className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-[275px] group bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col items-center text-center justify-between gap-4 shadow-xs hover:shadow-xl hover:border-[#FFDF36] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                      >
                        {/* Centered Circular Grayscale Portrait with Gold Halo Ring */}
                        <div className="relative shrink-0 mx-auto">
                          <div className="absolute -inset-1 rounded-full bg-[#FFDF36] opacity-75 blur-2xs group-hover:opacity-100 transition-opacity" />
                          <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-950 border-2 border-[#FFDF36] shadow-md mx-auto">
                            <img
                              src={photo}
                              alt={`Portrait of ${name}, ${role}`}
                              loading="lazy"
                              className="w-full h-full object-cover filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                              onError={(e: any) => {
                                e.target.src = '/images/team/placeholder.jpg';
                              }}
                            />
                          </div>
                        </div>

                        {/* Centered Information */}
                        <div className="w-full flex flex-col items-center text-center space-y-1 flex-1 justify-between">
                          <div className="w-full text-center">
                            <h4 className="font-black text-[#172033] text-base leading-snug group-hover:text-[#19396B] transition-colors text-center">
                              {name}
                            </h4>
                            <p className="text-xs font-bold text-[#19396B] mt-1 text-center">
                              {role}
                            </p>
                          </div>
                          <span className="inline-flex items-center justify-center gap-1 text-[11px] font-extrabold text-amber-700 group-hover:text-[#19396B] pt-3 transition-colors mx-auto">
                            <span>Click for profile</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── 6. TRAINERS & FACULTY (Center Aligned Editorial Cards) ── */}
            {trainersList.length > 0 && (
              <div className="space-y-8 pt-10 border-t border-slate-200">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200/60 mx-auto">
                    <span>Faculty &amp; Trainers</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                    Trainers &amp; Faculty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] font-bold">
                    {trainersList.length} Dedicated Instructors
                  </p>
                </div>

                {/* Symmetrical Centered Flex Layout */}
                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                  {trainersList.map((trainer, index) => {
                    const photo = trainer.photoUrl || trainer.image;
                    const name = trainer.fullName || trainer.name;
                    const role = trainer.designation || trainer.role;

                    return (
                      <div
                        key={trainer.id || index}
                        onClick={() => setSelectedModalMember(trainer)}
                        className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-[275px] group bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col items-center text-center justify-between gap-4 shadow-xs hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                      >
                        {/* Centered Circular Grayscale Portrait with Gold Ring */}
                        <div className="relative shrink-0 mx-auto">
                          <div className="absolute -inset-1 rounded-full bg-[#FFDF36] opacity-75 blur-2xs group-hover:opacity-100 transition-opacity" />
                          <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-950 border-2 border-[#FFDF36] shadow-md mx-auto">
                            <img
                              src={photo}
                              alt={`Portrait of ${name}, ${role}`}
                              loading="lazy"
                              className="w-full h-full object-cover filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                              onError={(e: any) => {
                                e.target.src = '/images/team/placeholder.jpg';
                              }}
                            />
                          </div>
                        </div>

                        {/* Centered Information */}
                        <div className="w-full flex flex-col items-center text-center space-y-1 flex-1 justify-between">
                          <div className="w-full text-center">
                            <h4 className="font-bold text-[#172033] text-base leading-snug group-hover:text-emerald-700 transition-colors text-center">
                              {name}
                            </h4>
                            <p className="text-xs font-bold text-emerald-700 mt-1 text-center">
                              {role}
                            </p>
                          </div>
                          <span className="inline-flex items-center justify-center gap-1 text-[11px] font-extrabold text-emerald-700 group-hover:text-emerald-900 pt-3 transition-colors mx-auto">
                            <span>Click for details</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* ── FILTERED OR SEARCH RESULTS VIEW (CENTER ALIGNED) ─────────── */
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto border-b border-slate-200 pb-3">
              <h3 className="text-lg font-black text-[#172033]">
                {selectedDept === 'ALL'
                  ? `Search Results (${filteredMembers.length})`
                  : `${filteredMembers.length} Members in Selected Department`}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {filteredMembers.map((member, index) => {
                const photo = member.photoUrl || member.image;
                const name = member.fullName || member.name;
                const role = member.designation || member.role;
                const socials = member.socialLinks || member.socials;

                const deptBadge = {
                  EXECUTIVE_LEADERSHIP: 'bg-amber-100 text-amber-900 border-amber-300',
                  BOARD_OF_TRUSTEES: 'bg-blue-100 text-blue-900 border-blue-300',
                  ADVISORY_COMMITTEE: 'bg-purple-100 text-purple-900 border-purple-300',
                  TRAINERS_AND_FACULTY: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                }[member.department] || 'bg-slate-100 text-slate-800 border-slate-200';

                return (
                  <div
                    key={member.id || index}
                    className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#19396B]/50 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden text-center items-center"
                  >
                    {/* Visual Area with Gold Backdrop */}
                    <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-100/80 to-slate-200/90 flex items-end justify-center pt-8">
                      <div className="absolute bottom-0 inset-x-5 h-44 sm:h-48 rounded-t-3xl bg-gradient-to-t from-[#FFDF36] to-[#FFE866] shadow-inner group-hover:from-[#FFE866] group-hover:to-[#FFDF36] transition-all duration-500 ease-out" />

                      <div className="absolute top-4 inset-x-0 mx-auto w-fit z-20">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-xs ${deptBadge}`}>
                          {member.department.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="relative z-10 w-full h-full flex items-end justify-center">
                        <img
                          src={photo}
                          alt={`Portrait of ${name}, ${role}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98] drop-shadow-md group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100 transition-all duration-500 ease-out"
                          onError={(e: any) => {
                            e.target.src = '/images/team/placeholder.jpg';
                          }}
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/15 to-transparent pointer-events-none z-15" />
                    </div>

                    <div className="p-6 flex flex-col items-center text-center gap-3 flex-1 justify-between bg-white w-full">
                      <div className="w-full flex flex-col items-center text-center">
                        <h4 className="font-black text-[#172033] text-lg sm:text-xl leading-tight group-hover:text-[#19396B] transition-colors text-center">
                          {name}
                        </h4>
                        <p className="text-xs sm:text-sm font-bold text-[#19396B] mt-1 text-center">
                          {role}
                        </p>
                        {member.expertise && (
                          <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed text-center max-w-xs mx-auto">
                            {member.expertise}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 w-full flex flex-col items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedModalMember(member)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-[#19396B] hover:bg-[#19396B] hover:text-white transition-all cursor-pointer shadow-2xs group-hover:bg-[#19396B] group-hover:text-white"
                        >
                          <span>View Full Profile</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {socials && (socials.email || socials.instagram || socials.linkedin) && (
                          <div className="flex items-center justify-center gap-2">
                            {socials.email && (
                              <a
                                href={`mailto:${socials.email}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {socials.instagram && (
                              <a
                                href={socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                              >
                                <Instagram className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {socials.linkedin && (
                              <a
                                href={socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── 7. ACCESSIBLE PROFILE DETAILS MODAL ──────────────────────────── */}
      <ProfileDetailsModal
        member={selectedModalMember}
        isOpen={Boolean(selectedModalMember)}
        onClose={() => setSelectedModalMember(null)}
      />
    </section>
  );
}

export default LeadershipDirectory;

