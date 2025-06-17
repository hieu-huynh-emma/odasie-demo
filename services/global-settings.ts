import { appConfig } from '@/configs';
import { APIResponse, GlobalSettings } from '@/types';

export async function getGlobalSettings(
  lang: string,
): Promise<APIResponse<null | GlobalSettings>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/global-setting?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch global settings');
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
