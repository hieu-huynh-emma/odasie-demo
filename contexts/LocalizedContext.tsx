'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LocalizedContextType = {
  localizedSlugs?: {
    [key: string]: string;
  };
  setLocalizedSlugs: (slugs: { [key: string]: string }) => void;
};

const LocalizedContext = createContext<LocalizedContextType>({
  setLocalizedSlugs: () => {},
});

export function LocalizedProvider({ children }: { children: ReactNode }) {
  const [localizedSlugs, setLocalizedSlugs] = useState<
    | {
        [key: string]: string;
      }
    | undefined
  >();

  return (
    <LocalizedContext.Provider value={{ localizedSlugs, setLocalizedSlugs }}>
      {children}
    </LocalizedContext.Provider>
  );
}

export function useLocalized() {
  return useContext(LocalizedContext);
}
