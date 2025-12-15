import { useUser } from '@clerk/nextjs';
import { Breadcrumbs } from './Breadcrumbs';
import { Input } from '@/components/ui/Input';

export function Header() {
  const { user } = useUser();

  return (
    <header className="flex flex-col gap-4 border-b border-border bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumbs />
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-sm text-slate-600">{user?.emailAddresses[0]?.emailAddress}</span>
          <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
            {user?.firstName?.[0] || 'U'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Input placeholder="Search cases, notes, ethics..." className="w-full sm:w-96" />
      </div>
    </header>
  );
}



