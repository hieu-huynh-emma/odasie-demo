import { appConfig } from '@/configs';
import { APIResponse } from '@/types';
import { ContactUsFormSubmitBody } from '@/types/contact';

export async function submitContactForm(
  body: ContactUsFormSubmitBody,
): Promise<APIResponse<null | any>> {
  try {
    const res = await fetch(`${appConfig.apiUrl}/api/contact-form-responses`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appConfig.apiToken}`,
      },
    });

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
