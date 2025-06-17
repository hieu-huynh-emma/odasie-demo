'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FieldError from './FieldError';

export function DatePicker({
  date,
  onSelect,
  label,
  placeholder,
  errors = [],
}: React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  date?: Date;
  label?: string;
  placeholder?: string;
  onSelect: (date: Date | undefined) => void;
  errors?: string[];
}) {
  return (
    <Popover>
      <div className="flex flex-col gap-y-2">
        <h4 className="text-sm font-bold">{label}</h4>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}>
            <CalendarIcon />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onSelect} />
      </PopoverContent>
      <FieldError errors={errors} className="mt-2" />
    </Popover>
  );
}
