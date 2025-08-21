import ErrorBoundary from '@/components/ErrorBoundary';
import { useRoute, useRouter } from '@/features/router';

const ErrorPage = () => {
  const { reload } = useRouter();

  const { error } = useRoute();

  return (
    <ErrorBoundary
      error={error}
      resetErrorBoundary={reload}
    />
  );
};

export default ErrorPage;
