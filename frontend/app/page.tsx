'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useEffect, useState } from 'react';

const features = [
  {
    title: 'AI Case Analysis',
    description: 'Get instant insights, risk assessments, and evidence-based recommendations for every case.',
    icon: '🧠',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    image: '/images/feature-case-analysis.jpg', // Placeholder path
  },
  {
    title: 'Smart Note Summarization',
    description: 'Transform raw session notes into professional, structured documentation in seconds.',
    icon: '📝',
    gradient: 'from-purple-500 via-pink-500 to-purple-600',
    image: '/images/feature-notes.jpg',
  },
  {
    title: 'Ethics & Compliance',
    description: 'Built-in ethical checklists and compliance verification to protect your practice.',
    icon: '✅',
    gradient: 'from-green-500 via-emerald-500 to-green-600',
    image: '/images/feature-ethics.jpg',
  },
  {
    title: 'Supervisor Reflection',
    description: 'AI-powered supervision support to deepen clinical understanding and reduce risk.',
    icon: '🎓',
    gradient: 'from-indigo-500 via-blue-500 to-indigo-600',
    image: '/images/feature-supervisor.jpg',
  },
  {
    title: 'Voice Input & Dictation',
    description: 'Real-time transcription and voice-to-text for hands-free documentation during sessions.',
    icon: '🎤',
    gradient: 'from-orange-500 via-red-500 to-orange-600',
    image: '/images/feature-voice.jpg',
  },
  {
    title: 'AI Treatment Plans',
    description: 'Generate evidence-based treatment plans with SMART goals and intervention strategies.',
    icon: '📋',
    gradient: 'from-teal-500 via-cyan-500 to-teal-600',
    image: '/images/feature-treatment.jpg',
  },
  {
    title: 'EHR Integration',
    description: 'Seamless integration with SimplePractice, TherapyNotes, and other major EHR systems.',
    icon: '🔗',
    gradient: 'from-violet-500 via-purple-500 to-violet-600',
    image: '/images/feature-ehr.jpg',
  },
  {
    title: 'Client Management',
    description: 'Comprehensive client profiles with session history, progress tracking, and case linking.',
    icon: '👥',
    gradient: 'from-blue-500 via-indigo-500 to-blue-600',
    image: '/images/feature-clients.jpg',
  },
  {
    title: 'Team Collaboration',
    description: 'Share cases, collaborate with supervisors, and manage team permissions seamlessly.',
    icon: '🤝',
    gradient: 'from-pink-500 via-rose-500 to-pink-600',
    image: '/images/feature-collaboration.jpg',
  },
  {
    title: 'Analytics & Insights',
    description: 'Track client progress, identify patterns, and gain insights into your practice performance.',
    icon: '📊',
    gradient: 'from-amber-500 via-yellow-500 to-amber-600',
    image: '/images/feature-analytics.jpg',
  },
  {
    title: 'Scheduling System',
    description: 'Built-in calendar, appointment booking, automated reminders, and CRM integration.',
    icon: '📅',
    gradient: 'from-emerald-500 via-green-500 to-emerald-600',
    image: '/images/feature-scheduling.jpg',
  },
  {
    title: 'Templates Library',
    description: 'Pre-built templates for assessments, interventions, and common case types.',
    icon: '📚',
    gradient: 'from-slate-500 via-gray-500 to-slate-600',
    image: '/images/feature-templates.jpg',
  },
  {
    title: 'Mobile PWA',
    description: 'Full-featured mobile app for iOS and Android with offline capabilities.',
    icon: '📱',
    gradient: 'from-cyan-500 via-blue-500 to-cyan-600',
    image: '/images/feature-mobile.jpg',
  },
];

const testimonials = [
  {
    quote: 'ClinicSense has transformed how I document cases. What used to take hours now takes minutes, and the AI insights help me catch risks I might have missed.',
    author: 'Dr. Sarah Chen',
    role: 'Licensed Psychologist',
    image: '/images/testimonial-1.jpg',
  },
  {
    quote: 'The ethics checker alone is worth it. It gives me confidence that I\'m covering all bases and staying compliant with regulations.',
    author: 'Michael Rodriguez',
    role: 'Clinical Social Worker',
    image: '/images/testimonial-2.jpg',
  },
  {
    quote: 'Finally, a tool built specifically for psychologists. The case analysis feature helps me think through complex cases more systematically.',
    author: 'Dr. Emily Watson',
    role: 'Private Practice Owner',
    image: '/images/testimonial-3.jpg',
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float-reverse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/20 glass backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            ClinicSense
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Sign In
            </Link>
            <Button 
              size="sm" 
              variant="primary" 
              className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={handleSignUp}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200/50 animate-fade-in">
            <span className="text-lg">✨</span>
            <span>Trusted by psychologists nationwide</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl animate-slide-up">
            Save Hours on Case Documentation.{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Focus on What Matters.
            </span>
          </h1>
          
          <p className="mb-8 text-xl text-gray-600 md:text-2xl max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            ClinicSense turns your case notes into structured, compliant documentation with AI-powered analysis, ethics checks, and supervisor support—all in one platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              variant="primary" 
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 card-3d"
              onClick={handleSignUp}
            >
              Try it Free Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 glass transition-all duration-300"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative animate-float">
            <div className="relative mx-auto max-w-5xl h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl card-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 animate-shimmer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p className="text-gray-500 font-medium">Hero Dashboard Image</p>
                  <p className="text-sm text-gray-400 mt-2">Add your product screenshot here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">What Psychologists Are Saying</h2>
          <p className="text-gray-600">Join clinicians who are saving time and improving outcomes</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="glass bg-white/80 text-gray-900 shadow-xl ring-1 ring-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 card-3d animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-2xl">
                      👤
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Everything You Need in One Platform</h2>
          <p className="text-gray-600">Built specifically for psychologists and mental health professionals</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="glass bg-white/80 text-gray-900 shadow-xl ring-1 ring-white/50 hover:shadow-2xl transition-all duration-300 card-3d group overflow-hidden animate-scale-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex flex-col gap-4">
                {/* Feature Image Placeholder */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2">{feature.icon}</div>
                      <p className="text-xs text-gray-500">Feature Image</p>
                    </div>
                  </div>
                </div>
                
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section with Image */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="animate-slide-up">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Choose ClinicSense?</h2>
            <ul className="space-y-4">
              {[
                'Save 5+ hours per week on documentation',
                'Catch clinical risks before they escalate',
                'Maintain ethical compliance automatically',
                'Improve case outcomes with AI insights',
                'Collaborate seamlessly with supervisors',
                'Export to any EHR or documentation system',
              ].map((benefit, idx) => (
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
          
          {/* Benefits Image Placeholder */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl card-3d animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 animate-shimmer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-600 font-medium">Benefits Visualization</p>
                <p className="text-sm text-gray-400 mt-2">Add dashboard or analytics image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with Image */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-600">Get started in minutes</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: '1', title: 'Create or Upload', desc: 'Create a case or upload your session notes', image: '/images/step-1.jpg' },
            { step: '2', title: 'AI Analysis', desc: 'AI analyzes, summarizes, and flags important concerns', image: '/images/step-2.jpg' },
            { step: '3', title: 'Review & Export', desc: 'Review, refine, and export to your EHR system', image: '/images/step-3.jpg' },
          ].map((item, idx) => (
            <div key={idx} className="text-center animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="relative mx-auto mb-6 h-64 w-full rounded-xl overflow-hidden shadow-xl card-3d">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-cyan-400/30 to-purple-400/30 animate-shimmer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">Step {item.step}</div>
                    <p className="text-xs text-gray-500">Process Image</p>
                  </div>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-semibold text-white shadow-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 px-8 py-16 text-center shadow-2xl animate-gradient overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10 animate-shimmer" />
          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-bold text-white">Buy Back Your Time. Reclaim Your Sanity.</h2>
            <p className="mb-8 text-xl text-blue-50">
              ClinicSense helps psychologists finish documentation faster, feel less drained, and finally get their evenings back.
            </p>
            <Button 
              size="lg" 
              variant="primary" 
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 card-3d"
              onClick={handleSignUp}
            >
              Try it Free Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 glass backdrop-blur-md">
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
