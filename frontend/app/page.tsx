'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useEffect, useState } from 'react';

const features = [
  {
    title: 'AI Case Analysis',
    description: 'Get instant insights, risk assessments, and evidence-based recommendations for every case.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Smart Note Summarization',
    description: 'Transform raw session notes into professional, structured documentation in seconds.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Ethics & Compliance',
    description: 'Built-in ethical checklists and compliance verification to protect your practice.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Supervisor Reflection',
    description: 'AI-powered supervision support to deepen clinical understanding and reduce risk.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-indigo-500 to-blue-500',
  },
];

const testimonials = [
  {
    quote: 'ClinicSense has transformed how I document cases. What used to take hours now takes minutes, and the AI insights help me catch risks I might have missed.',
    author: 'Dr. Sarah Chen',
    role: 'Licensed Psychologist',
  },
  {
    quote: 'The ethics checker alone is worth it. It gives me confidence that I\'m covering all bases and staying compliant with regulations.',
    author: 'Michael Rodriguez',
    role: 'Clinical Social Worker',
  },
  {
    quote: 'Finally, a tool built specifically for psychologists. The case analysis feature helps me think through complex cases more systematically.',
    author: 'Dr. Emily Watson',
    role: 'Private Practice Owner',
  },
];

const benefits = [
  'Save 5+ hours per week on documentation',
  'Catch clinical risks before they escalate',
  'Maintain ethical compliance automatically',
  'Improve case outcomes with AI insights',
  'Collaborate seamlessly with supervisors',
  'Export to any EHR or documentation system',
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            ClinicSense
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up">
              <Button size="sm" variant="primary">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className={`mx-auto max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200 animate-fade-in">
            <span className="text-lg">✨</span>
            <span>Trusted by psychologists nationwide</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl animate-slide-up">
            Save Hours on Case Documentation.{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Focus on What Matters.
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 md:text-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            ClinicSense turns your case notes into structured, compliant documentation with AI-powered analysis, ethics checks, and supervisor support—all in one platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/sign-up">
              <Button size="lg" variant="primary" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Try it Free Now
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">What Psychologists Are Saying</h2>
          <p className="text-gray-600">Join clinicians who are saving time and improving outcomes</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="bg-white text-gray-900 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col gap-4">
                <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Everything You Need in One Platform</h2>
          <p className="text-gray-600">Built specifically for psychologists and mental health professionals</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-white text-gray-900 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col gap-4">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="animate-slide-in-right">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Choose ClinicSense?</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-sm">
                    ✓
                  </span>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-white text-gray-900 shadow-lg ring-1 ring-gray-200 animate-slide-up">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold text-gray-900">How It Works</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-sm ring-2 ring-blue-100">
                    1
                  </span>
                  <span>Create a case or upload your session notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-sm ring-2 ring-blue-100">
                    2
                  </span>
                  <span>AI analyzes, summarizes, and flags important concerns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-sm ring-2 ring-blue-100">
                    3
                  </span>
                  <span>Review, refine, and export to your EHR system</span>
                </li>
              </ol>
            </div>
          </Card>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
            <span>🚀</span>
            <span>Coming Soon</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">The Complete Product Vision</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're building the most comprehensive AI-powered platform for psychologists. Here's what's coming next:
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Voice Input & Dictation',
              description: 'Real-time transcription and voice-to-text for hands-free documentation during sessions.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              ),
              status: 'Q1 2025',
            },
            {
              title: 'AI Treatment Plans',
              description: 'Generate evidence-based treatment plans with SMART goals and intervention strategies.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              ),
              status: 'Q1 2025',
            },
            {
              title: 'EHR Integration',
              description: 'Seamless integration with SimplePractice, TherapyNotes, and other major EHR systems.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              ),
              status: 'Q2 2025',
            },
            {
              title: 'Client Management',
              description: 'Comprehensive client profiles with session history, progress tracking, and case linking.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              status: 'Q2 2025',
            },
            {
              title: 'Team Collaboration',
              description: 'Share cases, collaborate with supervisors, and manage team permissions seamlessly.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              status: 'Q2 2025',
            },
            {
              title: 'Analytics & Insights',
              description: 'Track client progress, identify patterns, and gain insights into your practice performance.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              status: 'Q2 2025',
            },
            {
              title: 'Scheduling System',
              description: 'Built-in calendar, appointment booking, automated reminders, and CRM integration.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              status: 'Q3 2025',
            },
            {
              title: 'Templates Library',
              description: 'Pre-built templates for assessments, interventions, and common case types.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
              ),
              status: 'Q3 2025',
            },
            {
              title: 'Mobile PWA',
              description: 'Full-featured mobile app for iOS and Android with offline capabilities.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ),
              status: 'Q3 2025',
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="bg-white text-gray-900 shadow-md ring-1 ring-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-blue-500 animate-scale-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm`}>
                    {feature.icon}
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Want to be notified when these features launch?
          </p>
          <Link href="/sign-up">
            <Button variant="primary" className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Still have questions?</h2>
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:support@clinicsense.ai" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              support@clinicsense.ai
            </a>
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 px-8 py-16 text-center shadow-2xl animate-gradient">
          <h2 className="mb-4 text-4xl font-bold text-white">Buy Back Your Time. Reclaim Your Sanity.</h2>
          <p className="mb-8 text-xl text-blue-50">
            ClinicSense helps psychologists finish documentation faster, feel less drained, and finally get their evenings back.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="primary" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Try it Free Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ClinicSense
              </h3>
              <p className="text-sm text-gray-600">
                AI-powered documentation and case analysis for psychologists.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/sign-up" className="hover:text-blue-600 transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="hover:text-blue-600 transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="mailto:support@clinicsense.ai" className="hover:text-blue-600 transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Contact</h4>
              <p className="text-sm text-gray-600">
                <a href="mailto:support@clinicsense.ai" className="hover:text-blue-600 transition-colors">
                  support@clinicsense.ai
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} ClinicSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
