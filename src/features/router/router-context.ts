import { createContext } from 'react';

import type { RouterContextType } from './router';

export const RouterContext = createContext<RouterContextType | null>(null);
