import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Let's prattle</h1>
      <h2>
        Realtime Chat Application
        {" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h2>
    </div>
    {users && (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <img alt="Online Icon" src={onlineIcon} />
                <span>{name}</span>
              </div>
            ))}
          </h2>
        </div>
      </div>
    )}
  </div>
);

export default TextContainer;
