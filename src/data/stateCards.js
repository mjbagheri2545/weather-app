import { nanoid } from "nanoid";

const stateCards = [
  {
    id: nanoid(10),
    name: "feelLike",
    unit: "0C",
    unitClassNames: "feel-like-unit fs-3",
    icon: "feel-like",
    title: "feel like",
  },
  {
    id: nanoid(10),
    name: "cloudcover",
    unit: "%",
    unitClassNames: "fs-4",
    icon: "cloudy",
    title: "cloud cover",
  },
  {
    id: nanoid(10),
    name: "precipitation",
    unit: "mm",
    unitClassNames: "precipitation-unit fs-4",
    icon: "precipitation",
    title: "precipitation",
  },
  {
    id: nanoid(10),
    name: "humidity",
    unit: "%",
    unitClassNames: "fs-4",
    icon: "humidity",
    title: "humidity",
  },
  {
    id: nanoid(10),
    name: "ultraviolet",
    unit: null,
    unitClassNames: "fs-4",
    icon: "ultraviolet",
    title: "ultraviolet",
  },
  {
    id: nanoid(10),
    name: "windSpeed",
    unit: "km/h",
    unitClassNames: "wind-speed-unit fs-3",
    icon: "wind",
    title: "wind speed",
  },
];

export default stateCards;
