import { useResetAuth } from '@/features/auth';

const Component = () => {
  const resetAuth = useResetAuth();

  useMount(() => {
    resetAuth();
  });

  return null;
};

export default Component;
