import { DaysDataState, DaysDataDispatch } from "../contexts/DaysDataContext";
import useContextValue from "./useContextValue";

export function useDaysDataState() {
  return useContextValue(DaysDataState);
}

export function useDaysDataDispatch() {
  return useContextValue(DaysDataDispatch);
}
