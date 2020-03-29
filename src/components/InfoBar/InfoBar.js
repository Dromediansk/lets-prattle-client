import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img src={onlineIcon} alt="online icon" className="onlineIcon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a className="leaveRoomLink" href="/">
          <img src={closeIcon} alt="close icon" />
          <span>Leave room</span>
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
