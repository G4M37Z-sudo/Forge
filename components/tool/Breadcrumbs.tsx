import Link from 'next/link';

interface Crumb { name: string; href: string; }
interface Props { crumbs: Crumb[]; }

export function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-tertiary">
      <Link href="/" className="hover:text-purple-bright transition-colors duration-200">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          <svg className="w-3 h-3 text-border-hover" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
          </svg>
          {i === crumbs.length - 1 ? (
            <span className="text-text-secondary font-medium">{crumb.name}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-purple-bright transition-colors duration-200">{crumb.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
