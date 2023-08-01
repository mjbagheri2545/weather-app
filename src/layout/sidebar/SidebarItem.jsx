import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"


function SidebarItem({to,isActive,icon,index,onActiveItem,title}) {
  return (
    <li onClick={()=> onActiveItem(index)} className={`sidebar-item flex-center transition cursor-pointer ${isActive ? "active-item" : ""}`} >
        <NavLink className="flex-center" to={to}>
          <FontAwesomeIcon className="fs-2" icon={icon} />
          <span className="transition" >{title}</span>
        </NavLink>
    </li>
  )
}

export default SidebarItem;