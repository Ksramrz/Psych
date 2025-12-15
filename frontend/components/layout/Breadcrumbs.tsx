import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname?.split('/').filter(Boolean) || [];

  const crumbs = segments.map((segment, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = segment.replace(/-/g, ' ');
    return { href, label };
  });

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500">
      <Link href="/dashboard" className="hover:text-primary">
        Home
      </Link>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href} className="flex items-center space-x-2">
          <span>/</span>
          {idx === crumbs.length - 1 ? (
            <span className="text-foreground font-medium capitalize">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-primary capitalize">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}



