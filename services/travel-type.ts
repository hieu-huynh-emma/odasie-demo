import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, TravelType } from '@/types';

export async function getTravelTypes(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | TravelType[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/travel-types?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch travel types');
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

export async function getTravelType(
  slug: string,
  lang: string,
): Promise<APIResponse<null | TravelType>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/travel-types/${slug}?locale=${lang}&populate=tours`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch travel type');
    }

    // FIXME: remove hardcoded tours
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
