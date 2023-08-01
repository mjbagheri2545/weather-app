import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import { useMainState } from "../../hooks/useMain";
function Toast() {
  const { theme } = useMainState();
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
}

export default Toast;
