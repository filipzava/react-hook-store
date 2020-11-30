import React from 'react';
import { useGlobalState, useUpdateGlobalState } from '../../dist';

export const Root = () => {
  const greetings = useGlobalState('greetings', 'nazdar');
  const updateState = useUpdateGlobalState();
  return (
    <>
      <h2> {greetings} </h2>
      <button onClick={ () => updateState('greetings', 'ahoy')} > say hello </button> 
    </>
  );
};
