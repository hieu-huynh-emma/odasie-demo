import { appConfig } from '@/configs';
import { APIResponse, Navigation } from '@/types';

export async function getNavigation(
  slug: string,
  lang: string,
): Promise<APIResponse<null | Navigation>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/navigations/${slug}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch navigation.');
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
