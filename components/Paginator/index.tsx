'use client';

import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

import { generatePaginationLinks } from './generatePaginationLinks';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
};

function Paginator({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: PaginatorProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            as={Link}
            href={generateHref(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {generatePaginationLinks(
          currentPage,
          totalPages,
          maxVisiblePages,
          generateHref,
        )}
        <PaginationItem>
          <PaginationNext
            as={Link}
            href={generateHref(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginator;
