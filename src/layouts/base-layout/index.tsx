import { MenuProvider } from '@/features/menu';

import BaseLayout from './BaseLayout';

const index = () => {
  return (
    <MenuProvider>
      <BaseLayout />
    </MenuProvider>
  );
};

export default index;
