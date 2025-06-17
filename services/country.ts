import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, Country } from '@/types';

export async function getCountries(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | Country[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/countries?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch countries');
    }

    return res.json();
  } catch (e: any) {
    return {
      data: null,
      error: {
        status: 500,
        name: '',
        message: e.message,
        details: {},
      },
    };
  }
}

export async function getCountry(
  code: string,
  lang: string,
): Promise<APIResponse<null | Country>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/countries/${code}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch country');
    }

    return res.json();
  } catch (e: any) {
    return {
      data: null,
      error: {
        status: 500,
        name: '',
        message: e.message,
        details: {},
      },
    };
  }
}
