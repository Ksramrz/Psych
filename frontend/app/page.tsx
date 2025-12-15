import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const highlights = [
  {
    title: 'AI case assistant',
    copy: 'Guided intakes, risk flags, and evidence-based suggestions to move quickly but safely.',
  },
  {
    title: 'Notes in minutes',
    copy: 'Dictate or paste notes and receive clean, professional outputs ready for your system.',
  },
  {
    title: 'Ethics & supervision',
    copy: 'Built-in ethical checklists and supervisor-style reflections to reduce risk.',
  },
];

const steps = [
  'Create a case or upload notes',
  'Let the AI summarize, flag concerns, and draft next steps',
  'Export, share with your team, or continue refining in-app',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
        <header className="flex flex-col gap-6 text-center md:gap-8">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 ring-1 ring-white/15">
            Built for psychologists · AI powered · Secure by design
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            ClinicSense helps your team think, document, and act faster.
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-200">
            Reduce admin fatigue, catch risks early, and keep cases organized with an assistant
            that understands clinical nuance. Designed for private practices and community teams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" variant="primary">
                Get started
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                Sign in
              </Button>
            </Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="h-full bg-white/5 text-white ring-1 ring-white/10">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-200">{item.copy}</p>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <Card className="bg-white/5 text-white ring-1 ring-white/10">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Why teams switch to ClinicSense</h2>
              <ul className="space-y-3 text-slate-200">
                <li>• Faster clinical documentation without losing your voice</li>
                <li>• Built-in ethical guardrails and risk alerts</li>
                <li>• Collaborative workflows for supervisors and team leads</li>
                <li>• Ready for scheduling, CRM, and integrations</li>
              </ul>
            </div>
          </Card>

          <Card className="bg-white/5 text-white ring-1 ring-white/10">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">How it works</h2>
              <ol className="space-y-3 text-slate-200">
                {steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        </section>

        <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 px-6 py-10 text-center text-white ring-1 ring-white/10">
          <h3 className="text-2xl font-semibold">Ready to try it?</h3>
          <p className="mt-3 text-slate-100">
            Create a free account, explore the dashboard, and see how quickly you can turn raw notes into polished outputs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" variant="primary">
                Start free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                View product
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

