import Days from "../days";
import FullStates from "./fullStates";
import States from "../states";
import './style.css';

function MainContent({ isFullStateCard, dayCardPath }) {
  return (
    <div className="main-content">
      <Days dayCardPath={dayCardPath}>
        {isFullStateCard ? <FullStates /> : null}
      </Days>
      <States />
    </div>
  );
}

export default MainContent;
