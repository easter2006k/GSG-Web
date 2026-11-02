import React from 'react';

const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div>
    <section className="hero-gradient py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </section>
  </div>
);

export default function ScholarshipsPage() {
  return <PlaceholderPage title="Scholarships" description="Scholarship directory and applications coming soon" />;
}

export function CounsellingPage() {
  return <PlaceholderPage title="Individual Counselling" description="Request personal counselling support" />;
}

export function VolunteersPage() {
  return <PlaceholderPage title="Volunteers" description="Join our volunteer community" />;
}

export function NewsPage() {
  return <PlaceholderPage title="News & Updates" description="Latest news and announcements" />;
}

export function TestimonialsPage() {
  return <PlaceholderPage title="Student Stories" description="Success stories from our students" />;
}

export function ContactPage() {
  return <PlaceholderPage title="Contact Us" description="Get in touch with GSG Trust" />;
}

export function FaqPage() {
  return <PlaceholderPage title="FAQ" description="Frequently asked questions" />;
}

export function ApplicationStatusPage() {
  return <PlaceholderPage title="Application Status" description="Track your application status" />;
}

export function SchoolInitiativesPage() {
  return <PlaceholderPage title="School Initiatives" description="School-based programs and activities" />;
}

export function LoginPage() {
  return <PlaceholderPage title="Student Login" description="Login to your student portal" />;
}

export function RegisterPage() {
  return <PlaceholderPage title="Student Register" description="Create your student account" />;
}

export function StudentDashboard() {
  return <PlaceholderPage title="Student Dashboard" description="Your personal learning dashboard" />;
}