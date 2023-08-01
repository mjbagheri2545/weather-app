import DefaultLocation from "./defaultLocation";
import ToggleButtons from "./toggleButtons";
import DynamicBg from "../../components/dynamicBg";
import "./style.css";

function Setting() {
  return (
    <>
      <div className="setting">
        <DynamicBg />
        <DefaultLocation />
        <div className="divider"></div>
        <ToggleButtons />
      </div>
    </>
  );
}

export default Setting;
