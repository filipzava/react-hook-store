import React, { createContext, useReducer } from 'react';
import { assocPath } from 'ramda';
import { stringPathToArray } from '../utilities/stringPathToArray';
import { logger } from '../utilities/logger';

interface ReducerProps {
  verbose?: boolean;
}

export const reducer = ({ verbose }: ReducerProps) => (
  state: Record<string, unknown>,
  [path, value]: [string, unknown],
): any => {
  const nextState = assocPath(stringPathToArray(path), value, state);
  verbose && logger({ path, previousState: state, nextState, value });
  return nextState;
};

export const ReactHookStoreContext = createContext<any>({});

interface StoreProviderProps {
  children: JSX.Element | JSX.Element[];
  initialState: Record<string, unknown>;
  verbose?: boolean;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  initialState,
  verbose,
}) => {

  const [state, updateState] = useReducer(reducer({ verbose }), initialState);

  return (
    <ReactHookStoreContext.Provider value={{ state, updateState }}>
      {children}
    </ReactHookStoreContext.Provider>
  );
};
