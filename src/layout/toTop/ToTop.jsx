import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../../components/tootltip";
import PrimaryButton from "../../components/primaryButton";

function ToTop({handleToTop}) {
    return (
        <PrimaryButton onClick={handleToTop} className="to-top-button tooltip-container">
            <FontAwesomeIcon className="fs-4" icon={faCaretUp} />
            <Tooltip text="to top" />
        </PrimaryButton>
    );
}

export default ToTop;
