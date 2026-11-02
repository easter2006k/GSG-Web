import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Heart, Sparkles, Map } from 'lucide-react';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10">
      {/* Main footer */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md">
                <img
                  src="/images/logo.png"
                  alt="GSG Trust - Get Set Go"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed">
              GSG Trust is a registered youth NGO (since 2013) operating across Tamil Nadu,
              dedicated to education awareness, higher secondary career roadmaps, merit scholarships,
              girl student safety, and community upliftment.
            </p>

            {/* Donation and Volunteer metrics badge */}
            <div className="flex gap-4 pt-2">
              <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center shadow-sm">
                <div className="text-lg font-bold text-amber-400">₹7,48,980+</div>
                <div className="text-xs text-slate-400">Scholarship Aid</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center shadow-sm">
                <div className="text-lg font-bold text-emerald-400">500+</div>
                <div className="text-xs text-slate-400">Active Volunteers</div>
              </div>
            </div>
          </div>

          {/* Education Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-bold text-base text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Education Hub</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/education" className="hover:text-amber-400 transition-colors font-semibold text-amber-300">
                  District Education Portals →
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-amber-400 transition-colors">
                  Educational Programs
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition-colors">
                  Degree Courses Directory
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-amber-400 transition-colors">
                  Scholarships &amp; 7.5% Quota Aid
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">
                  Field Photo Gallery (45+ Schools)
                </Link>
              </li>
              <li>
                <Link to="/career-guidance" className="hover:text-amber-400 transition-colors">
                  Career Guidance &amp; Aptitude
                </Link>
              </li>
            </ul>
          </div>

          {/* Specifically Districts */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-base text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d28a00]" />
              <span>Districts</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/education/coimbatore" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Coimbatore</span>
                  <span className="text-[11px] text-slate-400">HQ Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/education/tiruppur" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Tiruppur</span>
                  <span className="text-[11px] text-slate-400">Textile Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/education/kanchipuram" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Kanchipuram</span>
                  <span className="text-[11px] text-slate-400">North Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/education/nilgiris" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Nilgiris</span>
                  <span className="text-[11px] text-slate-400">Hill Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/education/valparai" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Valparai</span>
                  <span className="text-[11px] text-slate-400">Estate Hub</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/volunteers" className="hover:text-amber-400 transition-colors text-xs text-emerald-400">
                  + Join as District Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Hotline & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-base text-white border-b border-white/10 pb-2">
              Hot Line &amp; Office
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  Student Hotline
                </span>
                <a
                  href="tel:+919789340230"
                  className="text-lg font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-2 mt-0.5"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  +91-97893 40230
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>gsgtrustcbe@gmail.com</span>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-2">Follow Us -</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100088058286399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/gsg_getsetgo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-xs text-slate-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} GSG Trust (Get Set Go). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              About Us
            </Link>
            <Link to="/education" className="hover:text-amber-400 transition-colors">
              Education
            </Link>
            <Link to="/programs" className="hover:text-amber-400 transition-colors">
              Programs
            </Link>
            <Link to="/courses" className="hover:text-amber-400 transition-colors">
              Courses
            </Link>
            <Link to="/scholarships" className="hover:text-amber-400 transition-colors">
              Scholarships
            </Link>
            <Link to="/gallery" className="hover:text-amber-400 transition-colors">
              Gallery
            </Link>
            <Link to="/contact" className="hover:text-amber-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}