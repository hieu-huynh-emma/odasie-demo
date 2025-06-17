'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchInput({
  initialQuery = '',
}: {
  initialQuery?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <input
        type="text"
        placeholder="Search..."
        className="typo-base-regular max-h-[36px] w-full rounded-[8px] bg-white px-[14px] py-2 text-gray-500 placeholder-gray-500 lg:min-w-[320px]"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
}
