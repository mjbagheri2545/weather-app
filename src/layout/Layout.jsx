import { useRef } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import ToTop from "./toTop";
import Azan from "./azan";
import { useMainState } from "../hooks/useMain";
import "./style.css";

function Layout({ children }) {
  const { theme, isPrayerTimesAllowed } = useMainState();
  const appRef = useRef();


  function handleToTop() {
    appRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div ref={appRef} className={`app transition ${theme}-theme`}>
      <Navbar />
      <Sidebar />
      <ToTop handleToTop={handleToTop} />
      {isPrayerTimesAllowed ? <Azan /> : null}
      {children}
    </div>
  );
}

export default Layout;
