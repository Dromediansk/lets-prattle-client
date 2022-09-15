import React from "react";

import "./InfoBar.css";

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <span className="statusOnline"></span>
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a className="primary-button leaveRoomLink" href="/">
          <span>Leave room</span>
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
