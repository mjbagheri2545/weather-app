import { useRef } from "react";
import Search from "./search";
import Location from "./location";
import ToggleDarkMode from "./toggleDarkMode";
import UserLocation from "./userLocation";
import "./style.css";

function Navbar() {
  const navigationNavRef = useRef();
  return (
    <nav ref={navigationNavRef} className="navigation-nav align-center">
      <Location />
      <Search />
      <ToggleDarkMode />
      <UserLocation />
    </nav>
  );
}

export default Navbar;
