import { useRoute } from '@/features/router';

interface QueryParams {
  api?: string;
}

const EnginePage = () => {
  const {
    handle: { query }
  } = useRoute() as { handle: { query: QueryParams } };

  return <Engine api={query?.api} />;
};

export default EnginePage;
