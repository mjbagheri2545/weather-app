import {
  LocationState,
  LocationDispatch,
} from "../contexts/LocationContext";
import useContextValue from "./useContextValue";

export function useLocationState() {
  return useContextValue(LocationState);
}

export function useLocationDispatch() {
  return useContextValue(LocationDispatch);
}
