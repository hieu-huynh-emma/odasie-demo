import qs from 'qs';
import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, TourGuide } from '@/types';

export async function getTourGuide(
  documentId: string,
  lang: string,
  criteria?: QueryCriteria,
): Promise<APIResponse<null | TourGuide>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/tour-guides/${documentId}?locale=${lang}&${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch tour guide');
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
