import MobileDetect from 'mobile-detect';
import { headers } from 'next/headers';

export async function detectMobileFromHeaders() {
  const ua = (await headers()).get('user-agent') || '';
  const md = new MobileDetect(ua);
  return !!md.mobile();
}
