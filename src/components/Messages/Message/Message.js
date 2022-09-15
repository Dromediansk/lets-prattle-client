import React, { useState, useEffect } from "react";
import ReactEmoji from "react-emoji";
import Linkify from "react-linkify";
import { USER_BOT } from "../../../utils/variables";

import "./Message.css";

const Message = ({ message: { user, text, time }, name }) => {
  const [sentByCurrentUser, setSentByCurrentUser] = useState(false);

  console.log("user", user);
  console.log("name", name);

  useEffect(() => {
    if (user === name) {
      setSentByCurrentUser(true);
    }
  }, [user, name]);

  const botImage = (
    <img className="botAvatar" src="./botAvatar.svg" alt="bot" />
  );

  return (
    <>
      {sentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <span className="sentText pr-10">{name}</span>
          <span className="sentText pr-10 smallFont">{time}</span>
          <div className="messageBox backgroundBlue">
            <span className="messageText colorWhite">
              <Linkify>{ReactEmoji.emojify(text)}</Linkify>
            </span>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <span className="messageText colorDark">
              <Linkify>{ReactEmoji.emojify(text)}</Linkify>
            </span>
          </div>
          <span className="sentText pl-10">
            {user === USER_BOT ? botImage : user}
          </span>
          <span className="sentText pl-10 smallFont">{time}</span>
        </div>
      )}
    </>
  );
};

export default Message;
