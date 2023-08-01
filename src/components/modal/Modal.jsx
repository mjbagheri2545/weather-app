import "./style.css";
function Modal({ className, isActive, children }) {
  return (
    <div
      className={`modal-container transition rounded-outer ${className} ${
        isActive ? "active" : ""
      }`}
    >
      <div className="top-divider"></div>
      {children}
    </div>
  );
}

export default Modal;
