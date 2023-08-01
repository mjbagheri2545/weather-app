import "./style.css";
function Tooltip({ text, position = "top" }) {
    return (
        <span
            className={`tooltip rounded-inner text-color-primary text-center ${position}`}
        >
            {text}
        </span>
    );
}

export default Tooltip;
