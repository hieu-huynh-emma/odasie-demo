'use client';

import { trackCallWebsite, trackClickContact } from '@/lib/tracking';
import Link from 'next/link';

export default function ContactLink({
  type,
  href,
  label,
  className,
  textClassName,
}: {
  type: 'phone' | 'email';
  href: string;
  label: string;
  className?: string;
  textClassName?: string;
}) {
  function handleClick() {
    trackClickContact(type);
    if (type === 'phone') {
      trackCallWebsite();
    }
  }

  return (
    <Link href={href} title={label} className={className}>
      <span className={textClassName} onClick={handleClick}>
        {label}
      </span>
    </Link>
  );
}
