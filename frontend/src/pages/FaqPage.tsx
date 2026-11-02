import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'How can we help you?',
    answer:
      'We help to create a student community of Government and Corporation school students and equip them with skills and knowledge. We provide free career counseling, higher education grants, college admission support, and delicate ability training to ensure equal opportunities for every student.',
  },
  {
    question: 'How can I get help?',
    answer:
      'Students and parents can reach out to GSG Trust directly through our website, contact our hotline at +91-97893 40230, or email info@gsgtrust.in. You can also apply online for scholarships, free counseling sessions, or skill enhancement programs.',
  },
  {
    question: 'Why We Help Students?',
    answer:
      'Making this the first objective of the Trust. We primarily focus on building a community with greater future equipping their skills and knowledge. We believe that empowering young minds from disadvantaged backgrounds creates a profound ripple effect across families and society.',
  },
  {
    question: 'Why do I connect with GSG Trust?',
    answer:
      'GSG Trust is a youthful NGO body, serving the society from the year 2013, we have more than 500 volunteers who are from destitute prudent foundations and committed themselves to serve the society. With 100+ institution collaborations and over 45,000 students trained, we are deeply committed to grassroots empowerment.',
  },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Help & Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Find answers to common questions about GSG Trust, our student community, grant programs, and volunteer initiatives.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                    isOpen
                      ? 'bg-white border-primary/40 shadow-lg'
                      : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-primary text-xs flex items-center justify-center font-extrabold shrink-0">
                        {index + 1}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed pl-16 border-t border-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Box */}
          <div className="mt-12 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Still Have Questions?</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              Our team is here to assist students, parents, and schools with admissions, guidance, and community support.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+919789340230">
                <Button className="bg-primary text-white hover:bg-blue-800 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91-97893 40230
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" className="border-slate-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
