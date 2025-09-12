import { useRoute } from '@/features/router';

const EnginePage = () => {
  const {
    handle: { query }
  } = useRoute();

  return query ? <div>{JSON.stringify(query)}</div> : null;
};

export default EnginePage;
