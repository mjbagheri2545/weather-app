import { MainDispatchContext, MainStateContext } from "../contexts/MainContext";
import useContextValue from "./useContextValue";

export function useMainState() {
  return useContextValue(MainStateContext);
}
export function useMainDispatch() {
  return useContextValue(MainDispatchContext);
}
