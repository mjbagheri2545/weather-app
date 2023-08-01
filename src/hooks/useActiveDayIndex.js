import { useParams } from "react-router-dom";

function useActiveDayIndex() {
  const { index } = useParams();
  return parseInt(index);
}

export default useActiveDayIndex;
