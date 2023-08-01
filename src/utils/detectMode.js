const modesRoof = {
  feelLike: 20,
  windSpeed: 10,
  precipitation: 5,
  humidity: 40,
  ultraviolet: 4,
  cloudcover: 50,
};

function detectMode(state, stateValue) {
  switch (state) {
    case "feelLike":
      return stateValue > modesRoof.feelLike ? "heavy" : "normal";
    case "windSpeed":
      return stateValue > modesRoof.windSpeed ? "heavy" : "normal";
    case "precipitation":
      return stateValue > modesRoof.precipitation ? "heavy" : "normal";
    case "humidity":
      return stateValue > modesRoof.humidity ? "heavy" : "normal";
    case "ultraviolet":
      return stateValue > modesRoof.ultraviolet ? "heavy" : "normal";
    default:
      return stateValue > modesRoof.cloudcover ? "heavy" : "normal";
  }
}

export default detectMode;
