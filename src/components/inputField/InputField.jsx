import { useId, useLayoutEffect, useRef } from "react";
import "./style.css";

function InputField({
  type,
  name,
  value,
  isFucos,
  handleOnChange,
  placeholder,
  handleOnKeyDown,
  isMarginBottom,
}) {
  const id = useId();
  const inputRef = useRef();
  useLayoutEffect(() => {
    isFucos ? inputRef.current.focus() : null;
  }, []);
  return (
    <div
      className={`input-field-container ${
        isMarginBottom ? "margin-bottom" : ""
      }`}
    >
      <label
        className="input-label text-color-primary"
        htmlFor={`${id}-${name}`}
      >
        {name}
      </label>
      <input
        className="input-field rounded-inner text-color-primary transition"
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        ref={inputRef}
        type={type}
        value={value}
        name={name}
        id={`${id}-${name}`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
