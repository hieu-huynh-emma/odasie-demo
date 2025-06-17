import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, Tour } from '@/types';

export async function getTours(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | Tour[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/tours?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch tours');
    }

    return res.json();
  } catch (error: any) {
    return {
      data: null,
      error: {
        status: 500,
        name: '',
        message: error.message,
        details: {},
      },
    };
  }
}

export async function getTour(
  slug: string,
  lang: string,
): Promise<APIResponse<null | Tour>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/tours/${slug}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch tour');
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
