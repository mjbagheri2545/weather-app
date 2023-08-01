import "./style.css";

function PrimaryButton({
  onClick,
  className = "",
  children,
  loading,
  buttonType,
}) {
  return (
    <button
      onClick={onClick}
      className={`primary-button transition text-center flex-center text-color-primary cursor-pointer rounded-outer ${className}`}
      disabled={loading}
      type={buttonType}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
