import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  GraduationCap,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Education', href: '/education' },
  { name: 'Volunteers', href: '/volunteers' },
  { name: 'Scholarships', href: '/scholarships' },
  { name: 'Contact Us', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isEducationActive =
    location.pathname.startsWith('/education') ||
    location.pathname.startsWith('/programs') ||
    location.pathname.startsWith('/courses') ||
    location.pathname.startsWith('/gallery');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Contact strip */}
      <div className="bg-[#071c35] text-white text-xs sm:text-sm py-2">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919789340230" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+91 97893 40230</span>
            </a>
            <a href="https://wa.me/919789340230" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Coimbatore – 641027</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/gsg_getsetgo/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=100088058286399" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="GSG Trust - Get Set Go"
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.name === 'Education'
                  ? isEducationActive
                  : item.name === 'Scholarships'
                  ? location.pathname.startsWith('/scholarships')
                  : item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-[#7f1026] bg-[#7f1026]/10 font-bold"
                      : "text-gray-700 hover:text-[#7f1026] hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/student/dashboard">
              <Button variant="outline" size="sm" className="border-slate-300 font-semibold">
                Student Portal
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button size="sm" className="bg-[#071c35] hover:bg-[#0d2e6e] text-white font-semibold">
                Staff Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 max-h-[85vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.name === 'Education'
                  ? isEducationActive
                  : item.name === 'Scholarships'
                  ? location.pathname.startsWith('/scholarships')
                  : item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-[#7f1026] bg-[#7f1026]/10 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Portals CTA */}
            <div className="flex gap-2 pt-3 border-t border-slate-100 mt-2">
              <Link to="/student/dashboard" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-semibold">
                  Student Portal
                </Button>
              </Link>
              <Link to="/admin/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#071c35] text-white text-xs font-semibold">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}