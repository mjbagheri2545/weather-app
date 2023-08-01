import { useId } from "react";
import "./style.css";
function ToggleButton({ className, children, handleOnChange, checked }) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`toggle-button-container align-center ${className}`}
    >
      <input
        className="toggle-button cursor-pointer"
        onChange={handleOnChange}
        type="checkbox"
        id={id}
        checked={checked}
      />
      {children}
    </label>
  );
}

export default ToggleButton;
