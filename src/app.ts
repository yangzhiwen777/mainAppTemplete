import { useState } from 'react';
export function useQiankunStateForSlave() {
  const [personState, setPersonState] = useState({ name: '老杨', age: 20 });

  return {
    personState,
    setPersonState,
  };
}
