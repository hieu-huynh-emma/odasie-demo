import { appConfig } from '@/configs';
import { APIResponse, CMSBlock, CMSPage } from '@/types';

export async function getCmsPage(
  page: string,
  lang: string,
): Promise<APIResponse<CMSPage | null>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/pages-cms/match-by-url?url=${page}&locale=${lang}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch cms page');
    }

    const body = await res.json();
    console.log("%c 2 --> Line: 19||cms-page.ts\n body: ","color:#0f0;", body);

    body.data.heroBlock = body.data.blocks.shift()
    body.data.blocks = body.data.blocks.map(
      (block: CMSBlock) => ({
        id: block.id,
        __component: block.__component,
      }));

    return body;
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
