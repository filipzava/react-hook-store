import { useContext } from 'react';
import { stringPathToArray } from './../utilities/stringPathToArray';
import { ReactHookStoreContext } from './../provider/index';
import { pathOr } from 'ramda';

export function useGlobalState<T>(path: string, defaultValue: T): T {
  const { state } = useContext(ReactHookStoreContext);
  return pathOr(defaultValue, stringPathToArray(path), state);
}

export function useUpdateGlobalState(): (path: string, value: unknown) => void {
  const { updateState } = useContext(ReactHookStoreContext);
  return (path, value) => updateState([path, value]);
}
