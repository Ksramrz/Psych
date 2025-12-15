import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const features = [
  {
    title: 'AI Case Analysis',
    description: 'Get instant insights, risk assessments, and evidence-based recommendations for every case.',
    icon: '🔍',
  },
  {
    title: 'Smart Note Summarization',
    description: 'Transform raw session notes into professional, structured documentation in seconds.',
    icon: '📝',
  },
  {
    title: 'Ethics & Compliance',
    description: 'Built-in ethical checklists and compliance verification to protect your practice.',
    icon: '✅',
  },
  {
    title: 'Supervisor Reflection',
    description: 'AI-powered supervision support to deepen clinical understanding and reduce risk.',
    icon: '🎓',
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-white">
            ClinicSense
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="text-sm text-slate-300 hover:text-white">
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
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 ring-1 ring-white/15">
            <span>✨</span>
            <span>Trusted by psychologists nationwide</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Save Hours on Case Documentation. Focus on What Matters.
          </h1>
          <p className="mb-8 text-xl text-slate-300 md:text-2xl">
            ClinicSense turns your case notes into structured, compliant documentation with AI-powered analysis, ethics checks, and supervisor support—all in one platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" variant="primary" className="text-lg px-8 py-6">
                Try it Free Now
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="border-white/40 text-lg px-8 py-6 text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">What Psychologists Are Saying</h2>
          <p className="text-slate-400">Join clinicians who are saving time and improving outcomes</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-white/5 text-white ring-1 ring-white/10">
              <div className="flex flex-col gap-4">
                <p className="text-slate-200 italic">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Everything You Need in One Platform</h2>
          <p className="text-slate-400">Built specifically for psychologists and mental health professionals</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-white/5 text-white ring-1 ring-white/10">
              <div className="flex flex-col gap-4">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-slate-300">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-white">Why Choose ClinicSense?</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-200">
                    ✓
                  </span>
                  <span className="text-lg text-slate-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-white/5 text-white ring-1 ring-white/10">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">How It Works</h3>
              <ol className="space-y-4 text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40">
                    1
                  </span>
                  <span>Create a case or upload your session notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40">
                    2
                  </span>
                  <span>AI analyzes, summarizes, and flags important concerns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40">
                    3
                  </span>
                  <span>Review, refine, and export to your EHR system</span>
                </li>
              </ol>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Still have questions?</h2>
          <p className="text-slate-400">
            Contact us at{' '}
            <a href="mailto:support@clinicsense.ai" className="text-cyan-400 hover:text-cyan-300">
              support@clinicsense.ai
            </a>
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 px-8 py-16 text-center ring-1 ring-white/10">
          <h2 className="mb-4 text-4xl font-bold text-white">Buy Back Your Time. Reclaim Your Sanity.</h2>
          <p className="mb-8 text-xl text-slate-200">
            ClinicSense helps psychologists finish documentation faster, feel less drained, and finally get their evenings back.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="primary" className="text-lg px-8 py-6">
              Try it Free Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">ClinicSense</h3>
              <p className="text-sm text-slate-400">
                AI-powered documentation and case analysis for psychologists.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/sign-up" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="mailto:support@clinicsense.ai" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
              <p className="text-sm text-slate-400">
                <a href="mailto:support@clinicsense.ai" className="hover:text-white">
                  support@clinicsense.ai
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} ClinicSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
