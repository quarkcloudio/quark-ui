import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  contentXScrollable: boolean;
  fullContent: boolean;
  isMobile: boolean;
  mixSiderFixed: boolean;
  reloadFlag: boolean;
  siderCollapse: boolean;
  themeDrawerVisible: boolean;
}

const initialState: InitialStateType = {
  contentXScrollable: false,
  fullContent: false,
  /** Is mobile layout */
  isMobile: false,
  mixSiderFixed: false,
  reloadFlag: false,
  siderCollapse: false,
  themeDrawerVisible: false
};

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    closeThemeDrawer: state => {
      state.themeDrawerVisible = false;
    },
    openThemeDrawer: state => {
      state.themeDrawerVisible = true;
    },
    setContentXScrollable: (state, action: PayloadAction<boolean>) => {
      state.contentXScrollable = action.payload;
    },
    setIsMobile: (state, { payload }: { payload: boolean }) => {
      state.isMobile = payload;
    },
    setMixSiderFixed: (state, action: PayloadAction<boolean>) => {
      state.mixSiderFixed = action.payload;
    },
    setReloadFlag: (state, action: PayloadAction<boolean>) => {
      state.reloadFlag = action.payload;
    },
    setSiderCollapse: (state, { payload }: PayloadAction<boolean>) => {
      state.siderCollapse = payload;
    },
    toggleFullContent: state => {
      state.fullContent = !state.fullContent;
    },
    toggleMixSiderFixed: state => {
      state.mixSiderFixed = !state.mixSiderFixed;
    },
    toggleSiderCollapse: state => {
      state.siderCollapse = !state.siderCollapse;
    }
  },
  selectors: {
    getContentXScrollable: app => app.contentXScrollable,
    getFullContent: app => app.fullContent,
    getIsMobile: app => app.isMobile,
    getMixSiderFixed: app => app.mixSiderFixed,
    getReloadFlag: app => app.reloadFlag,
    getSiderCollapse: app => app.siderCollapse,
    getThemeDrawerVisible: app => app.themeDrawerVisible
  }
});
// Action creators are generated for each case reducer function.
export const {
  closeThemeDrawer,
  openThemeDrawer,
  setContentXScrollable,
  setIsMobile,
  setMixSiderFixed,
  setReloadFlag,
  setSiderCollapse,
  toggleFullContent,
  toggleMixSiderFixed,
  toggleSiderCollapse
} = appSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  getContentXScrollable,
  getFullContent,
  getIsMobile,
  getMixSiderFixed,
  getReloadFlag,
  getSiderCollapse,
  getThemeDrawerVisible
} = appSlice.selectors;
