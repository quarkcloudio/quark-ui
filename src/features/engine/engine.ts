import { selectEngineApi, selectEngineComponent, setEngineApi, setEngineComponent } from './engineStore';

export function useEngine() {
  const dispatch = useAppDispatch();
  const engineApi = useAppSelector(selectEngineApi);
  const engineComponent = useAppSelector(selectEngineComponent);

  function dispatchEngineApi(api: string) {
    dispatch(setEngineApi(api));
  }

  function dispatchEngineComponent(data: Api.Engine.EngineComponent | null) {
    dispatch(setEngineComponent(data));
  }

  return {
    dispatchEngineApi,
    dispatchEngineComponent,
    engineApi,
    engineComponent
  };
}
