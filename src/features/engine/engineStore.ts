import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  engineApi: '',
  engineComponent: {}
};

export const engineSlice = createSlice({
  initialState,
  name: 'engine',
  reducers: {
    resetEngine: () => initialState,
    setEngineApi: (state, { payload }: PayloadAction<string>) => {
      state.engineApi = payload;
    },
    setEngineComponent: (state, { payload }: PayloadAction<Api.Engine.EngineComponent | null>) => {
      state.engineComponent = {
        ...state.engineComponent,
        ...payload
      };
    }
  },
  selectors: {
    selectEngineApi: engine => engine.engineApi,
    selectEngineComponent: engine => engine.engineComponent
  }
});

export const { resetEngine, setEngineApi, setEngineComponent } = engineSlice.actions;
export const { selectEngineApi, selectEngineComponent } = engineSlice.selectors;
