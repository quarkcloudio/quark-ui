import { useCallback } from 'react';

const globalEngine: Record<string, any> = {};

export const useEngine = () => {
  const setEngineApi = useCallback((value: any) => {
    globalEngine.engineApi = value;
  }, []);

  const getEngineApi = useCallback(() => {
    return globalEngine.engineApi;
  }, []);

  const setEngineComponent = useCallback((value: any) => {
    globalEngine.engineComponent = value;
  }, []);

  const getEngineComponent = useCallback(() => {
    return globalEngine.engineComponent;
  }, []);

  const setEngineFormApi = useCallback((value: any) => {
    globalEngine.engineFormApi = value;
  }, []);

  const getEngineFormApi = useCallback(() => {
    return globalEngine.engineFormApi;
  }, []);

  const setEngineFormRef = useCallback((value: any) => {
    globalEngine.engineFormRef = value;
  }, []);

  const getEngineFormRef = useCallback(() => {
    return globalEngine.engineFormRef;
  }, []);

  const setEngineImageCaptchaRef = useCallback((value: any) => {
    globalEngine.engineImageCaptchaRef = value;
  }, []);

  const getEngineImageCaptchaRef = useCallback(() => {
    return globalEngine.engineImageCaptchaRef;
  }, []);

  return {
    getEngineApi,
    getEngineComponent,
    getEngineFormApi,
    getEngineFormRef,
    getEngineImageCaptchaRef,
    globalEngine,
    setEngineApi,
    setEngineComponent,
    setEngineFormApi,
    setEngineFormRef,
    setEngineImageCaptchaRef
  };
};
