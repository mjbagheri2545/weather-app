import ToggleButton from "../../../components/toggleButton";
import Tooltip from "../../../components/tootltip";
import { useMainDispatch, useMainState } from "../../../hooks/useMain";
import { changeTheme } from "../../../utils/mainReducer";

function ToggleDarkMode() {
  const { theme } = useMainState();
  const dispatch = useMainDispatch();

  function handleOnClick() {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(changeTheme(newTheme));
  }
  return (
    <div className="toggle-dark-mode-container align-center">
      <ToggleButton
        handleOnChange={handleOnClick}
        className="input-container tooltip-container"
        checked={theme === "dark" ? true : false}
      >
        <img
          className={`toggle-img transition cursor-pointer ${
            theme === "dark" ? "active" : ""
          }`}
          src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/moon.png`}
          alt="moon"
        />
        <img
          className={`toggle-img transition cursor-pointer ${
            theme === "dark" ? "" : "active"
          }`}
          src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/sun.png`}
          alt="sun"
        />
        <Tooltip
          text={`switch to ${theme === "dark" ? "light theme" : "dark theme"}`}
          position="bottom"
        />
      </ToggleButton>
    </div>
  );
}

export default ToggleDarkMode;
