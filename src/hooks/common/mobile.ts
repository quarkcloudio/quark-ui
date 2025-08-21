import { getIsMobile } from '@/layouts/appStore';

export function useMobile() {
  const isMobile = useAppSelector(getIsMobile);

  return isMobile;
}
