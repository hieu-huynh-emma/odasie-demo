import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, CustomerReview } from '@/types';

export async function getCustomerReviews(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | CustomerReview[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/customer-reviews?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch customer reviews');
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

// TODO: work with BE to refactor the same query structure
export async function getRatingStats(criteria: string) {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/customer-reviews/stats?${criteria}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch customer reviews');
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
