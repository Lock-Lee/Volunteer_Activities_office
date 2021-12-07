import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import logo from "../assets/icons/logo.png";

import accessMenu from "./Menu";
import { Link } from "react-router-dom";

const TheSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  const { PERMISSIONS } = props;
  const [navigations, setNavigation] = useState([]);

  useEffect(() => {
    setNavigation(accessMenu({ PERMISSIONS }));
  }, [PERMISSIONS]);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <Link key="HOME" to={`/`} title="HOME">
        {/* <img src={logo} className="d-block bottom-shadow max-logo"  alt="logo"  /> */}
      </Link>
      <CSidebarNav>
        <CCreateElement
          items={navigations}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
