import {
  getCountryArticle,
  getCountryPreposition,
} from '@/utils/countryGrammar';

export function tWithGrammar(
  t: any,
  key: string,
  options: Record<string, any> = {},
  lang: string,
): string {
  // Only process specific keys that need grammatical adjustments
  if (lang !== 'fr' || !options.countryName) {
    return t(key, options);
  }

  const countryName = options.countryName;

  if (key === 'common.discover_country') {
    // Add the correct article (La/Le/Les)
    const article = getCountryArticle(countryName, lang);
    return t(key, {
      ...options,
      article,
    });
  }

  if (key === 'common.tours_country') {
    // Add the correct preposition (en/au/aux)
    const preposition = getCountryPreposition(countryName, lang);
    return t(key, {
      ...options,
      preposition,
    });
  }

  return t(key, options);
}
