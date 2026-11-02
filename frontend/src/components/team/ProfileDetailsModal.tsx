import React, { useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Instagram,
  Linkedin,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Sparkles,
  Award,
} from 'lucide-react';
import { TeamMember } from '@/data/leadershipData';

interface ProfileDetailsModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDetailsModal({
  member,
  isOpen,
  onClose,
}: ProfileDetailsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key & manage focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const photo = member.photoUrl || member.image || '/images/team/placeholder.jpg';
  const name = member.fullName || member.name || 'Team Member';
  const role = member.designation || member.role || 'GSG Trust Member';
  const socials = member.socialLinks || member.socials || {};

  const departmentLabel = {
    EXECUTIVE_LEADERSHIP: 'Executive Leadership',
    BOARD_OF_TRUSTEES: 'Board of Trustees & Executive Team',
    ADVISORY_COMMITTEE: 'Advisory Committee',
    TRAINERS_AND_FACULTY: 'Trainers & Faculty',
  }[member.department] || 'Leadership & Governance';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-member-name"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#071328]/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto transition-transform duration-200"
      >
        {/* Header Ribbon / Banner */}
        <div className="bg-[#19396B] text-white px-6 py-4 flex items-center justify-between border-b border-[#23488f]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF36] animate-pulse" />
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#FFDF36]">
              {departmentLabel}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close profile details"
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFDF36] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Top Profile Intro with Editorial Grayscale Portrait & Gold Accent */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative group shrink-0">
              {/* Subtle gold backdrop halo */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#FFDF36] to-amber-200 rounded-3xl blur-xs opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-900 border-2 border-[#FFDF36] shadow-lg shrink-0 aspect-square">
                <img
                  src={photo}
                  alt={`Portrait of ${name}, ${role}`}
                  className="w-full h-full object-cover object-top grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  onError={(e: any) => {
                    e.target.src = '/images/team/placeholder.jpg';
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3
                  id="modal-member-name"
                  className="text-2xl sm:text-3xl font-black text-[#172033] leading-tight"
                >
                  {name}
                </h3>
                {member.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#FFDF36] text-[#172033] shadow-xs">
                    {member.badge}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base font-bold text-[#19396B]">
                {role}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified GSG Trust Leadership Record</span>
              </div>
            </div>
          </div>

          {/* Biography */}
          {member.biography && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#19396B]" />
                Biography &amp; Profile
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {member.biography}
              </p>
            </div>
          )}

          {/* Responsibilities */}
          {member.responsibilities && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#19396B]" />
                Key Responsibilities
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                {member.responsibilities}
              </p>
            </div>
          )}

          {/* Expertise Tags */}
          {member.expertise && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Areas of Expertise &amp; Impact
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {member.expertise.split(',').map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-[#172033] border border-slate-200"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verified Social & Contact Links */}
          {socials && (socials.email || socials.instagram || socials.linkedin) && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Contact Channels
              </h4>
              <div className="flex flex-wrap gap-3">
                {socials.email && (
                  <a
                    href={`mailto:${socials.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Direct</span>
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram Profile</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>GSG Trust Official Governance Registry</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsModal;

