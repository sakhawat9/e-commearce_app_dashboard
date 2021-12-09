import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import "./Topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconsContainer">
            <span className="topIconBadge">2</span>
            <NotificationsNone />
          </div>
          <div className="topbarIconsContainer">
            <span className="topIconBadge">2</span>
            <Language />
          </div>
          <div className="topbarIconsContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
