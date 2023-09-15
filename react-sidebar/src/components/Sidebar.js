import React, {useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";

function Sidebar () {
  const [sidebar, setSidebar] = useState(false)

  const showSideBar = () => setSidebar(!sidebar);
  
  return (
    <>
    <IconContext.Provider value={{ color: "undefined"}}>
        <div className="sidebar">
          <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSideBar} />
          </Link>
        </div>
        <sidebar className={sidebar ? "side-menu active" : "side-menu"}>
          <ul className="side-menu-items" onClick={showSideBar}>
              <li className="side-toggle">
                  <Link to="#" className="side-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
              </li>
              {SidebarData.map((item, index)=> {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </sidebar>
    </IconContext.Provider>
    </>
  )
}

export default Sidebar