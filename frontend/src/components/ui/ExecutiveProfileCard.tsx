import React from 'react';
import { Mail, Instagram, Linkedin, User } from 'lucide-react';

export interface ExecutiveProfileCardProps {
  name?: string;
  designation?: string;
  image?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  className?: string;
}

export function ExecutiveProfileCard({
  name = 'Easter Raj',
  designation = 'Secretary - GSG Trust',
  image = '/images/team/easter.jpg?v=3',
  email = 'easter.gsggroups@gmail.com',
  instagram = 'https://www.instagram.com/easter2006k?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
  linkedin = 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bw7X7NW9yQ4uEBCCkxef7Ag%3D%3D',
  className = '',
}: ExecutiveProfileCardProps) {
  return (
    <article
      aria-label={`Profile card for ${name}, ${designation}`}
      className={`w-full bg-white border-2 border-[#DFE6F0] rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(16,27,45,0.06)] hover:shadow-[0_20px_50px_rgba(16,27,45,0.09)] transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Left Section — Profile Photograph */}
        <div className="w-full md:w-auto flex justify-center shrink-0">
          <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[24px] sm:rounded-[32px] overflow-hidden bg-slate-100 border border-slate-200/60 shadow-[0_6px_18px_rgba(0,0,0,0.06)] shrink-0 group">
            <img
              src={image}
              alt={`Portrait of ${name}, ${designation}`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
        <div
          role="separator"
          aria-orientation="vertical"
          className="hidden md:block w-[2px] h-48 sm:h-56 lg:h-64 bg-[#E2E8F0] mx-6 sm:mx-8 lg:mx-10 self-center shrink-0"
        />
        <div
          role="separator"
          aria-orientation="horizontal"
          className="block md:hidden w-full h-[2px] bg-[#E2E8F0] my-2"
        />

        {/* Right Section — Profile Information */}
        <div className="flex-1 w-full flex flex-col justify-center text-center md:text-left">
          {/* Name */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101B2D] leading-tight tracking-tight">
            {name}
          </h2>

          {/* Horizontal Blue Accent Line directly below the name */}
          <div
            aria-hidden="true"
            className="w-20 sm:w-24 lg:w-28 h-2 sm:h-2.5 bg-[#1763F6] rounded-full mt-2.5 sm:mt-3 mx-auto md:mx-0 shrink-0"
          />

          {/* Designation Row with User outline icon */}
          <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 mt-4 sm:mt-5 text-[#526177]">
            <User
              className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] shrink-0 text-[#526177]"
              aria-hidden="true"
            />
            <span className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-[#526177]">
              {designation}
            </span>
          </div>

          {/* Social Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mt-5 sm:mt-6">
            {/* Email Button */}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label={`Send email to ${name} (${email})`}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#FFF8F8] border-2 border-[#FFADB7] text-[#D9233F] font-bold text-sm sm:text-base shadow-2xs hover:shadow-sm hover:bg-[#FFEAEA] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9233F] focus-visible:ring-offset-2"
              >
                <Mail
                  className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] shrink-0 text-[#D9233F]"
                  aria-hidden="true"
                />
                <span>Email</span>
              </a>
            )}

            {/* Instagram Button */}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}'s Instagram profile`}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#FFF8FC] border-2 border-[#F5A9D0] text-[#D41468] font-bold text-sm sm:text-base shadow-2xs hover:shadow-sm hover:bg-[#FFEAF4] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D41468] focus-visible:ring-offset-2"
              >
                <Instagram
                  className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] shrink-0 text-[#D41468]"
                  aria-hidden="true"
                />
                <span>Instagram</span>
              </a>
            )}

            {/* LinkedIn Button */}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${name} on LinkedIn`}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#F5F9FF] border-2 border-[#A8CBFF] text-[#1763D8] font-bold text-sm sm:text-base shadow-2xs hover:shadow-sm hover:bg-[#E8F1FF] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1763D8] focus-visible:ring-offset-2"
              >
                <Linkedin
                  className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] shrink-0 text-[#1763D8]"
                  aria-hidden="true"
                />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ExecutiveProfileCard;
