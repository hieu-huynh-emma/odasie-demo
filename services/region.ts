import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, Region } from '@/types';

export async function getRegions(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | Region[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/regions?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch regions');
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

export async function getRegion(
  code: string,
  lang: string,
): Promise<APIResponse<null | Region>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/regions/${code}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch region');
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
