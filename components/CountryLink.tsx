'use client';

import Link from 'next/link';
import {
  formatCountryWithGrammar,
  getCountryArticle,
  getCountryPreposition,
} from '@/utils/countryGrammar';

interface CountryLinkProps {
  countryName: string;
  countrySlug: string;
  type: 'discover' | 'tours';
  lang: string;
  className?: string;
}

/**
 * A component that displays a link to a country page with proper grammar for French
 */
export default function CountryLink({
  countryName,
  countrySlug,
  type,
  lang,
  className = '',
}: CountryLinkProps) {
  // Use the utility function to format the text with proper grammar
  const formattedText = formatCountryWithGrammar(countryName, type, lang);

  // Determine the correct URL based on the link type
  const href =
    type === 'discover'
      ? `/${lang}/destination/${countrySlug}`
      : `/${lang}/destination/${countrySlug}/tours`;

  return (
    <Link href={href} className={className}>
      {formattedText}
    </Link>
  );
}

/**
 * Example of using individual grammar functions
 */
export function CustomCountryDisplay({
  countryName,
  lang,
  context,
}: {
  countryName: string;
  lang: string;
  context: string;
}) {
  // For custom formatting, you can use the individual helper functions
  const article = getCountryArticle(countryName, lang);
  const preposition = getCountryPreposition(countryName, lang);

  if (context === 'title' && lang === 'fr') {
    return (
      <h1>
        {article} {countryName}
      </h1>
    );
  }

  if (context === 'destinations' && lang === 'fr') {
    return (
      <p>
        Destinations {preposition} {countryName}
      </p>
    );
  }

  // Default case for non-French or unknown context
  return <span>{countryName}</span>;
}
