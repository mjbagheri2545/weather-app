import {
  faCalendarDay,
  faHouse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

const sidebarItems = [
  {
    path: "/",
    icon: faHouse,
    title: "home",
    id: nanoid(10),
  },
  {
    path: "/calendar",
    icon: faCalendarDay,
    title: "calendar",
    id: nanoid(10),
  },
  {
    path: "/setting",
    icon: faGear,
    title: "setting",
    id: nanoid(10),
  },
];

export default sidebarItems;
