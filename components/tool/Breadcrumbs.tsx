import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb { name: string; href: string; }
interface Props { crumbs: Crumb[]; }

export function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A5A6E]">
      <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          {i === crumbs.length - 1 ? (
            <span className="text-[#A3A3B3] font-medium">{crumb.name}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-sky-400 transition-colors">{crumb.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
