type CountryGender = 'masculine' | 'feminine' | 'plural';

interface CountryInfo {
  gender: CountryGender;
  overrideArticle?: string;
  overridePreposition?: string;
}

//TODO: add more countries - Now only for Odasie supported countries
const COUNTRY_GENDER_MAP: Record<string, CountryInfo> = {
  'thaïlande': { gender: 'feminine' },
  'sri lanka': { gender: 'masculine' },
  'laos': { gender: 'masculine' },
  'vietnam': { gender: 'masculine' },
  'cambodge': { gender: 'masculine' },
  'philippines': { gender: 'plural' },
};

export function formatCountryWithGrammar(
  countryName: string,
  context: 'discover' | 'tours',
  lang: string,
): string {
  // Only apply French grammar rules for French language
  if (lang !== 'fr') {
    return context === 'discover'
      ? `Discover ${countryName}`
      : `Tours in ${countryName}`;
  }

  const normalizedName = countryName.toLowerCase().trim();
  const countryInfo = COUNTRY_GENDER_MAP[normalizedName] || {
    gender: 'masculine',
  };

  if (context === 'discover') {
    switch (countryInfo.gender) {
      case 'feminine':
        return `Découvrir La ${countryName}`;
      case 'plural':
        return `Découvrir Les ${countryName}`;
      default:
        return `Découvrir Le ${countryName}`;
    }
  } else {
    // Handle "Circuits" context
    if (countryInfo.overridePreposition) {
      return `Circuits ${countryInfo.overridePreposition} ${countryName}`;
    }

    switch (countryInfo.gender) {
      case 'feminine':
        return `Circuits en ${countryName}`;
      case 'plural':
        return `Circuits aux ${countryName}`;
      default:
        return `Circuits au ${countryName}`;
    }
  }
}

export function getCountryArticle(countryName: string, lang: string): string {
  if (lang !== 'fr') return '';

  const normalizedName = countryName.toLowerCase().trim();
  const countryInfo = COUNTRY_GENDER_MAP[normalizedName] || {
    gender: 'masculine',
  };

  if (countryInfo.overrideArticle) return countryInfo.overrideArticle;

  switch (countryInfo.gender) {
    case 'feminine':
      return 'La';
    case 'plural':
      return 'Les';
    default:
      return 'Le';
  }
}

export function getCountryPreposition(
  countryName: string,
  lang: string,
): string {
  if (lang !== 'fr') return 'in';

  const normalizedName = countryName.toLowerCase().trim();
  const countryInfo = COUNTRY_GENDER_MAP[normalizedName] || {
    gender: 'masculine',
  };

  if (countryInfo.overridePreposition) return countryInfo.overridePreposition;

  switch (countryInfo.gender) {
    case 'feminine':
      return 'en';
    case 'plural':
      return 'aux';
    default:
      return 'au';
  }
}
