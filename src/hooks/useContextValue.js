import { useContext } from "react";

function useContextValue(context) {
  const contextValue = useContext(context);
  if (!context) {
    throw new Error("you shuld use this hook with it's Provider");
  }
  return contextValue;
}

export default useContextValue;
