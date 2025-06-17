'use client';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Queries } from '.';
import { Input } from '@/components/ui/input';

interface Props {
  queries: Queries;
  setQueries: (queries: Queries) => void;
  placeholder: string;
}

export default function KeywordInput({
  queries,
  setQueries,
  placeholder,
}: Props) {
  const [keyword, setKeyword] = useState(queries.keyword);
  const debouncedKeyword = useDebounce(keyword, 500); // 500ms debounce delay

  useEffect(() => {
    setQueries({
      ...queries,
      keyword: debouncedKeyword,
    });
  }, [debouncedKeyword]);

  return (
    <Input
      value={keyword}
      placeholder={placeholder}
      variant="simple"
      className="border-none py-1 text-gray-700 placeholder:text-gray-400 focus:border-none focus:outline-none focus:ring-0"
      onChange={({ target: { value } }) => setKeyword(value)} // Update local state
    />
  );
}
