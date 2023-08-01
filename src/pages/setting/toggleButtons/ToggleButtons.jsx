import { useState } from "react";
import ToggleButton from "../../../components/toggleButton";
import { useMainDispatch, useMainState } from "../../../hooks/useMain";
import {
  changeIsPrayerTimesAllowed,
  changeTheme,
} from "../../../utils/mainReducer";

function ToggleButtons() {
  const { theme, isPrayerTimesAllowed } = useMainState();
  const dispatch = useMainDispatch();
  const [userDefaultTheme, setUserDefaultTheme] = useState(
    localStorage.getItem("theme")
  );
  function handleOnChangeTheme() {
    const defaultTheme = localStorage.getItem("theme");
    const newDefaultTheme = defaultTheme === "dark" ? "light" : "dark";
    setUserDefaultTheme(newDefaultTheme);
    localStorage.setItem("theme", newDefaultTheme);
    defaultTheme === theme ? dispatch(changeTheme(newDefaultTheme)) : null;
  }
  function handleOnChangeIsPrayerTimesAllowed() {
    dispatch(changeIsPrayerTimesAllowed());
  }
  function isToggleButtonChangeThemeChecked() {
    const userTheme = localStorage.getItem("theme");
    if (!userTheme) {
      return theme === "dark" ? true : false;
    }
    return userTheme === "dark" ? true : false;
  }

  return (
    <div className="toggle-buttons-container">
      <div className="field">
        <span>default theme: {userDefaultTheme || theme}</span>
        <ToggleButton
          handleOnChange={handleOnChangeTheme}
          checked={isToggleButtonChangeThemeChecked()}
        />
      </div>
      <div className="divider"></div>
      <div className="field">
        <span>
          prayer times are playable:{" "}
          {isPrayerTimesAllowed ? "can playable" : "can not playable"}
        </span>
        <ToggleButton
          handleOnChange={handleOnChangeIsPrayerTimesAllowed}
          checked={isPrayerTimesAllowed}
        />
      </div>
    </div>
  );
}

export default ToggleButtons;
