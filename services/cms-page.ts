import { appConfig } from '@/configs';
import { APIResponse, CMSPage } from '@/types';

export async function getCmsPage(
  page: string,
  lang: string,
): Promise<APIResponse<CMSPage | null>> {

  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/pages-cms/match-by-url?url=${page}&locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch cms page');
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
