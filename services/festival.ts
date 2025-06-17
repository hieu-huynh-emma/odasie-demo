import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, Festival } from '@/types';

export async function getFestivals(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | Festival[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/festivals?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch festivals');
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

export async function getFestival(
  slug: string,
  lang: string,
): Promise<APIResponse<null | Festival>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/festivals/${slug}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch festival');
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
