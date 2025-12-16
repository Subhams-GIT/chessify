import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export default async function useDevice() {
  const headersList = await headers();
  const ua = userAgent({ headers: headersList });
  const isMobile = ua.device.type === 'mobile';

  return isMobile
}
