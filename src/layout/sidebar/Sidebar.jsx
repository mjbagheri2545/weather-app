import { useState, useLayoutEffect, useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarItem from "./SidebarItem";
import sidebarItems from "../../data/sidebar";
import PrimaryButton from "../../components/primaryButton";
import { useLocation } from "react-router-dom";
import "./style.css";

function Sidebar() {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const bgPurpleRef = useRef();

  useLayoutEffect(() => {
    bgPurpleRef.current.style.top = `${activeIndex * (72.19 + 16) + 30}px`;
  }, [activeIndex]);

  useLayoutEffect(() => {
    pathname.includes("setting")
      ? setActiveIndex(2)
      : pathname.includes("calendar")
      ? setActiveIndex(1)
      : setActiveIndex(0);
  }, []);

  function handleActiveItem(index) {
    setActiveIndex(index);
  }
  function handleToggleSidebar() {
    setIsOpened((current) => !current);
  }

  return (
    <nav className={`sidebar-nav transition ${isOpened ? "opened" : ""}`}>
      <div className="brand-item align-center">
        <img
          src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/brand.png`}
          alt="brand"
        />
        <h5 className="text-capitalize text-color-primary">skyWise</h5>
      </div>
      <ul>
        <li ref={bgPurpleRef} className="bg-purple"></li>
        {sidebarItems.map((item, index) => {
          return (
            <SidebarItem
              key={item.id}
              to={item.path}
              isActive={activeIndex === index}
              icon={item.icon}
              index={index}
              onActiveItem={handleActiveItem}
              title={item.title}
            />
          );
        })}
      </ul>
      <div className="menu-button-container transition">
        <PrimaryButton onClick={handleToggleSidebar} className="menu-button">
          <FontAwesomeIcon
            className="text-color-primary transition"
            icon={faPlus}
            size="2x"
          />
        </PrimaryButton>
      </div>
    </nav>
  );
}

export default Sidebar;
