import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import CareerGuidancePage from './pages/CareerGuidancePage';
import CollegesPage from './pages/CollegesPage';
import CoursesPage from './pages/CoursesPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import CounsellingPage from './pages/CounsellingPage';
import VolunteersPage from './pages/VolunteersPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import DistrictEducationPage from './pages/DistrictEducationPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import SchoolInitiativesPage from './pages/SchoolInitiativesPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Student Portal
import StudentDashboard from './pages/StudentDashboard';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Global Heartbeat Loading Provider for all main clicks
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/mission-vision" element={<AboutPage />} />
            <Route path="/about/leadership" element={<AboutPage />} />
            <Route path="/about/impact" element={<AboutPage />} />
            
            {/* Education Hub & District Portals */}
            <Route path="/education" element={<DistrictEducationPage />} />
            <Route path="/education/:districtId" element={<DistrictEducationPage />} />
            
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramsPage />} />
            <Route path="/career-guidance" element={<CareerGuidancePage />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/colleges/:slug" element={<CollegesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/scholarships/apply" element={<ScholarshipsPage />} />
            <Route path="/scholarships/track" element={<ScholarshipsPage />} />
            <Route path="/scholarships/:slug" element={<ScholarshipsPage />} />
            <Route path="/scholarships/apply/:slug" element={<ScholarshipsPage />} />
            <Route path="/counselling" element={<CounsellingPage />} />
            <Route path="/counselling/request" element={<CounsellingPage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/volunteers/apply" element={<VolunteersPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/news" element={<GalleryPage />} />
            <Route path="/news/:slug" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/school-initiatives" element={<SchoolInitiativesPage />} />
            <Route path="/application-status" element={<ApplicationStatusPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Portal */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        </div>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;