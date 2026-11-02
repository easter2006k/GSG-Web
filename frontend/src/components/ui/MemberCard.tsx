/**
 * MemberCard — Editorial team member card inspired by executive portrait references.
 * Features grayscale portraits with golden-yellow background panels (#FFDF36),
 * smooth hover color reveals, and clean responsive alignment.
 */
import React from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';

export interface MemberSocials {
  email?: string;
  instagram?: string;
  linkedin?: string;
}

export interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  badge?: string;
  socials?: MemberSocials;
  /** Tailwind text-color class applied to the role line, e.g. 'text-[#19396B]' */
  roleColor?: string;
  /** Tailwind hover:border-color class for card hover accent */
  hoverAccent?: string;
}

export function MemberCard({
  name,
  role,
  image,
  badge,
  socials,
  roleColor = 'text-[#19396B]',
  hoverAccent = 'hover:border-[#19396B]/50',
}: MemberCardProps) {
  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-200/90 shadow-sm
        hover:shadow-2xl ${hoverAccent} hover:-translate-y-2
        transition-all duration-300 flex flex-col overflow-hidden text-center items-center`}
    >
      {/* ── Editorial Portrait Visual Area with Golden-Yellow Panel ── */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-100/80 to-slate-200/90 flex items-end justify-center pt-8">
        {/* Golden-Yellow Horizontal / Arched Background Panel (#FFDF36) */}
        <div className="absolute bottom-0 inset-x-5 h-44 sm:h-48 rounded-t-3xl bg-gradient-to-t from-[#FFDF36] to-[#FFE866] shadow-inner group-hover:from-[#FFE866] group-hover:to-[#FFDF36] transition-all duration-500 ease-out" />

        {/* Optional Role Badge (Centered) */}
        {badge && (
          <div className="absolute top-4 inset-x-0 mx-auto w-fit z-20">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#19396B] text-white shadow-md border border-white/20">
              {badge}
            </span>
          </div>
        )}

        {/* Overlapping Grayscale Portrait */}
        <div className="relative z-10 w-full h-full flex items-end justify-center">
          <img
            src={image}
            alt={`Portrait of ${name}, ${role}`}
            loading="lazy"
            className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98] drop-shadow-md group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100 transition-all duration-500 ease-out"
            onError={(e: any) => {
              e.target.src = '/images/team/placeholder.jpg';
            }}
          />
        </div>

        {/* Bottom subtle fusion gradient */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/15 to-transparent pointer-events-none z-15" />
      </div>

      {/* ── Content Info Area (Center Aligned) ── */}
      <div className="p-6 flex flex-col items-center text-center gap-3 flex-1 justify-between bg-white w-full">
        <div className="w-full flex flex-col items-center text-center">
          <h4 className="font-black text-[#172033] text-lg sm:text-xl leading-tight group-hover:text-[#19396B] transition-colors text-center">
            {name}
          </h4>
          <p className={`text-xs sm:text-sm font-bold mt-1 text-center ${roleColor}`}>
            {role}
          </p>
        </div>

        {/* Social links (Centered) */}
        {socials && (socials.email || socials.instagram || socials.linkedin) && (
          <div className="flex items-center justify-center gap-2 mt-auto pt-4 border-t border-slate-100 w-full">
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label={`Send email to ${name}`}
                title={socials.email}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}'s Instagram`}
                title="Instagram"
                className="p-1.5 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${name} on LinkedIn`}
                title="LinkedIn"
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Compact vertical centered card used by Advisory & Trainers sub-sections */
export function CompactMemberCard({
  name,
  role,
  image,
  roleColor = 'text-[#19396B]',
  hoverAccent = 'hover:border-[#FFDF36]',
}: MemberCardProps) {
  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6
        flex flex-col items-center text-center justify-between gap-4 ${hoverAccent} hover:shadow-xl hover:-translate-y-1.5
        transition-all duration-300`}
    >
      <div className="relative shrink-0">
        <div className="absolute -inset-1 rounded-full bg-[#FFDF36] opacity-75 blur-2xs group-hover:opacity-100 transition-opacity" />
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-slate-950 border-2 border-[#FFDF36] shadow-md">
          <img
            src={image}
            alt={`Portrait of ${name}, ${role}`}
            loading="lazy"
            className="w-full h-full object-cover filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            onError={(e: any) => {
              e.target.src = '/images/team/placeholder.jpg';
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center text-center space-y-1 flex-1 justify-between">
        <div>
          <p className="font-black text-[#172033] text-base leading-snug group-hover:text-[#19396B] transition-colors text-center">
            {name}
          </p>
          <p className={`text-xs font-bold mt-1 text-center ${roleColor}`}>
            {role}
          </p>
        </div>
        <span className="text-[11px] font-extrabold text-amber-700 group-hover:text-[#19396B] pt-3 transition-colors">
          Click for profile →
        </span>
      </div>
    </div>
  );
}

export default MemberCard;
