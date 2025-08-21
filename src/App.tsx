import { RouterProvider } from '@/features/router';

import { LazyAnimate } from './features/animate';
import { AntdContextHolder, AntdProvider } from './features/antdConfig';
import { LangProvider } from './features/lang';
import { ThemeProvider } from './features/theme';

const App = () => (
  <ThemeProvider>
    <LangProvider>
      <AntdProvider>
        <AntdContextHolder>
          <LazyAnimate>
            <RouterProvider />
          </LazyAnimate>
        </AntdContextHolder>
      </AntdProvider>
    </LangProvider>
  </ThemeProvider>
);

export default App;
