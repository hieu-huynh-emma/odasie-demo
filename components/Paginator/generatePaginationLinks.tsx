import Link from 'next/link';
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

export const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
  generateHref: (page: number) => string,
) => {
  const items = [];

  items.push(
    <PaginationItem key="PaginationItem-page-start">
      <PaginationLink
        as={Link}
        href={generateHref(1)}
        isActive={currentPage === 1}>
        1
      </PaginationLink>
    </PaginationItem>,
  );

  let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

  if (endPage - startPage < maxVisiblePages - 3) {
    startPage = Math.max(2, totalPages - maxVisiblePages + 2);
  }

  if (startPage > 2) {
    items.push(
      <PaginationItem key="PaginationItem-ellipsis-start">
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    items.push(
      <PaginationItem key={`PaginationItem-page-${i}`}>
        <PaginationLink
          as={Link}
          href={generateHref(i)}
          isActive={currentPage === i}>
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (endPage < totalPages - 1) {
    items.push(
      <PaginationItem key="PaginationItem-ellipsis-end">
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  if (totalPages > 1) {
    items.push(
      <PaginationItem key="PaginationItem-page-last">
        <PaginationLink
          as={Link}
          href={generateHref(totalPages)}
          isActive={currentPage === totalPages}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return items;
};
