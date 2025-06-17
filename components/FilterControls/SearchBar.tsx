'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';

type Props = {
  name: string;
  placeholder: string;
};

export default function SearchBar({ name, placeholder }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="grid h-full w-full items-center gap-1.5">
      <Input
        className="h-[38px] rounded-xs bg-white"
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={searchParams.get(name) || ''}
        onChange={e => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(name, e.target.value);
          router.push(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
}
