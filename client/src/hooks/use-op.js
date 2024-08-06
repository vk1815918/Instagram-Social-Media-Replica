import { useState } from "react";

const useOptimistic = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateStateOptimistically = (optimisticUpdate, revertUpdate) => {
    setState(optimisticUpdate(state));
    return (error) => {
      if (error) {
        setState(revertUpdate(state));
      }
    };
  };

  return [state, updateStateOptimistically];
};

export default useOptimistic;
