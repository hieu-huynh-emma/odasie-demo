import React from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { OdasieAgencyAndPrincipalsSectionType } from '@/types'; // Adjust path to your types
import OdasieAgencySection from '../OdasieAgencySection';
import OurPrincipalsSection from '../OurPrincipalsSection';
import { TFunction } from 'i18next';

export default function OdasieAgencyAndPrincipalsSection({
  section,
  lang,
  t,
}: {
  section: OdasieAgencyAndPrincipalsSectionType;
  lang: string;
  t: TFunction<string[], string>;
}) {
  const { bgLogo, agencySection, principalsSection } = section;

  return (
    // Use a relative container to position the background logo
    <div>
      {/* Background Logo - Positioned absolutely behind content */}
      {bgLogo?.url && (
        <div className="pointer-events-none absolute inset-0 z-0 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] flex max-w-[100vw] items-center justify-center overflow-hidden opacity-10">
          {/* Adjust opacity, objectFit, width/height/layout as needed */}
          <ImageWithFallback
            src={bgLogo.url.replace(/\s+/g, '')}
            alt="Background Logo"
            layout="fill" // Or responsive/fixed depending on desired behavior
            style={{ objectFit: 'contain' }} // Or 'cover'
            className="h-auto max-h-full w-auto max-w-full" // Example styling for contain
          />

          <ImageWithFallback
            src={bgLogo.url.replace(/\s+/g, '')}
            alt="Background Logo"
            width={500} // Example width
            height={500} // Example height
            style={{ objectFit: 'contain' }}
            className="opacity-10"
          />
        </div>
      )}

      {agencySection && (
        <OdasieAgencySection lang={lang} section={agencySection} />
      )}

      {principalsSection && (
        <OurPrincipalsSection lang={lang} section={principalsSection} t={t} />
      )}
    </div>
  );
}
