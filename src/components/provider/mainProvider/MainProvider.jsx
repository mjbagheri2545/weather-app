import { useEffect, useReducer } from "react";
import {
  MainDispatchContext,
  MainStateContext,
} from "../../../contexts/MainContext";
import {
  changeTheme,
  initialState,
  mainReducer,
} from "../../../utils/mainReducer";

function MainProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        dispatch(changeTheme(colorScheme));
      });
  }, []);

  return (
    <MainStateContext.Provider value={state}>
      <MainDispatchContext.Provider value={dispatch}>
        {children}
      </MainDispatchContext.Provider>
    </MainStateContext.Provider>
  );
}

export default MainProvider;
