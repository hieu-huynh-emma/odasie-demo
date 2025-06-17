import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, Experience } from '@/types';

export async function getExperiences(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | Experience[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/experiences?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch experiences');
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

export async function getExperience(
  slug: string,
  lang: string,
): Promise<APIResponse<null | Experience>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/experiences/${slug}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch experience');
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
