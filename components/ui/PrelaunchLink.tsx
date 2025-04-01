import Link from 'next/link';
import { handleAppLink } from '@/lib/prelaunch';

interface PrelaunchLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function PrelaunchLink({ href, children, ...props }: PrelaunchLinkProps) {
  // For internal Next.js routes, use Link
  if (!href.includes('app.speakerdrive.com')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // For app links, use anchor with prelaunch handler
  return (
    <a 
      href={href}
      onClick={(e) => handleAppLink(e, href)}
      {...props}
    >
      {children}
    </a>
  );
}