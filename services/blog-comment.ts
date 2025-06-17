import { appConfig } from '@/configs';

export async function getBlogArticleComments(articleId: string) {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/blog-articles/${articleId}/comments`,
    );
    return res.json();
  } catch {
    return {
      data: null,
      error: true,
    };
  }
}

export async function postBlogArticleComment(articleId: string, body: any) {
  try {
    const res = await fetch(
      `${appConfig.apiUrl}/api/blog-articles/${articleId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    return res.json();
  } catch {
    return {
      data: null,
      error: true,
    };
  }
}
