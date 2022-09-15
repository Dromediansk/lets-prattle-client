import React from "react";
import ReactEmoji from "react-emoji";
import Linkify from "react-linkify";

import "./Message.css";

const botImage = <img className="botAvatar" src="./botAvatar.svg" alt="bot" />;

export const BotMessage = ({ message: { text, time } }) => {
  return (
    <div className="messageContainer justifyStart">
      <div className="messageBox">
        <span className="messageText colorDark">
          <i>
            <Linkify>{ReactEmoji.emojify(text)}</Linkify>
          </i>
        </span>
      </div>
      <span className="sentText pl-10">{botImage}</span>
      <span className="sentText pl-10 smallFont">{time}</span>
    </div>
  );
};
