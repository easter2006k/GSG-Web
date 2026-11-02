import React from 'react';
const PlaceholderPage = ({ title }) => (
  <div>
    <section className="hero-gradient py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-lg">This page is coming soon.</p>
      </div>
    </section>
  </div>
);
export default function Page() {
  return <PlaceholderPage title="Page Coming Soon" />;
}
