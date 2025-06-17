import qs from 'qs';

import { appConfig } from '@/configs';
import { QueryCriteria } from '@/lib/query-mapper';
import { APIResponse, BlogArticle } from '@/types';

export async function getBlogArticles(
  criteria?: QueryCriteria,
): Promise<APIResponse<null | BlogArticle[]>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/blog-articles?${qs.stringify(criteria)}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blog articles');
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

export async function getBlogArticle(
  slug: string,
  lang: string,
): Promise<APIResponse<null | BlogArticle>> {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/blog-articles/${slug}?locale=${lang}`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blog article');
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
