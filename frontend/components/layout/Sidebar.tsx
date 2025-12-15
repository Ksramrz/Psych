import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/cases', label: 'Cases', icon: '📋' },
  { href: '/notes', label: 'Notes', icon: '📝' },
  { href: '/ethics', label: 'Ethics', icon: '⚖️' },
  { href: '/supervisor', label: 'Supervisor', icon: '🎓' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-border bg-white dark:bg-slate-900">
      <div className="px-6 py-5 border-b border-border">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          ClinicSense
        </Link>
        <p className="text-xs text-slate-500 mt-1">AI assistant for psychologists</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-muted'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

