import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse } from '@/types';
import { ItineraryFormSubmitRequestBody } from '@/types/itinerary-form';

export async function submitFormResponse(
  body: ItineraryFormSubmitRequestBody,
  criteria?: QueryCriteria,
): Promise<APIResponse<null | any>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/form-responses?${qs.stringify(criteria)}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${appConfig.apiToken}`,
        },
      },
    );

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
