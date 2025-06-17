'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FieldError from './FieldError';

export function DateRangePicker({
  className,
  range,
  onSelect,
  errors = [],
}: React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  className?: string;
  range?: DateRange;
  onSelect: (range?: DateRange) => void;
  errors?: string[];
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !range && 'text-muted-foreground',
            )}>
            <CalendarIcon />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, 'LLL dd, y')} -{' '}
                  {format(range.to, 'LLL dd, y')}
                </>
              ) : (
                format(range.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <FieldError errors={errors} className="mt-2" />
    </div>
  );
}
