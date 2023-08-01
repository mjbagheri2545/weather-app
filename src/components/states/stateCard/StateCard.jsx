import "./style.css";

function StateCard({ title, mode, icon, children: stateValue }) {
  return (
    <div className="state-card rounded-outer transition">
      <div className="content align-center">
        <div className="icon-container flex-center">
          <img
            src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/${icon}.png`}
            alt=""
          />
        </div>
        <div className="title-container">
          <span className="title fs-3 text-capitalize">{title}</span>
          <span className="mode text-capitalize">{mode}</span>
        </div>
      </div>
      <div className="state-value text-center fs-6">{stateValue}</div>
    </div>
  );
}

export default StateCard;
