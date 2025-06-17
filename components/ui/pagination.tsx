'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);

Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));

PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));

PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
  as?: React.ElementType;
} & React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  as: Component = 'a',
  href,
  ...props
}: PaginationLinkProps) => {
  return (
    <Component
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled}
      disabled={disabled}
      href={href}
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'md',
        }),
        'min-w-10 rounded-[8px] px-3.5 py-2 text-gray-800',
        isActive ? 'pointer-events-none' : 'border-none shadow-none',
        disabled ? 'pointer-events-none' : '',
        className,
      )}
      {...props}
    />
  );
};

PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const { t } = useTranslation(['common']);
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1', className)}
      {...props}>
      <ChevronLeft className="h-5 w-5" />
      <span>{t('common.previous')}</span>
    </PaginationLink>
  );
};

PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const { t } = useTranslation(['common']);
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1', className)}
      {...props}>
      <span>{t('common.next')}</span>
      <ChevronRight className="h-5 w-5" />
    </PaginationLink>
  );
};

PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const { t } = useTranslation(['common']);
  return (
    <PaginationLink
      aria-label="More pages"
      aria-hidden
      disabled
      className={cn('flex h-10 w-10 items-center justify-center', className)}
      {...props}>
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{t('common.more_page')}</span>
    </PaginationLink>
  );
};

PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
