'use client';

import { TourItinerary } from '@/types';
import { clamp } from '@/utils';
import React, { useContext, useState } from 'react';

type TourItineraryContextType = {
  activeDay: number;
  setPrevDay: () => void;
  setNextDay: () => void;
  setCurrentDay: (activeDay: number) => void;
  itinerary: TourItinerary[];
  tourDayDetails: TourItinerary;
};

const TourItineraryContext =
  React.createContext<null | TourItineraryContextType>(null);

type TourItineraryProviderProps = React.PropsWithChildren<{
  itinerary: TourItinerary[];
}>;

function TourItineraryProvider({
  children,
  itinerary,
}: TourItineraryProviderProps) {
  const [activeDay, setActiveDay] = useState<number>(0);
  const setPrevDay = () => {
    setActiveDay(preVal => Math.max(0, preVal - 1));
  };

  const setNextDay = () => {
    setActiveDay(preVal => Math.min(preVal + 1, itinerary.length));
  };

  const setCurrentDay = (val: number) => {
    setActiveDay(clamp(val, 0, itinerary.length));
  };

  const value = {
    activeDay,
    setPrevDay,
    setNextDay,
    setCurrentDay,
    itinerary,
    tourDayDetails: itinerary.filter((_, index) => index === activeDay)[0],
  };

  return (
    <TourItineraryContext.Provider value={value}>
      {children}
    </TourItineraryContext.Provider>
  );
}

export const useTourItinerary = () => {
  const ctx = useContext(TourItineraryContext);

  if (!ctx) {
    throw new Error('TourItineraryContext not found');
  }

  return ctx;
};

export default TourItineraryProvider;
