import { faArrowRightLong} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";
import './style.css';

function FullStates() {
  return (
    <Link to="/calendar" className="full-states-day-card transition rounded-inner" >
        <p className="text-capitalize fs-1">check full states</p>
        <span className="icon-container flex-center">
            <FontAwesomeIcon icon={faArrowRightLong} />
        </span>
    </Link>
  )
}

export default FullStates