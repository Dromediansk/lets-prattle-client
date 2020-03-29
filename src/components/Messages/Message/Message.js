import React, { useState, useEffect } from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";

const Message = ({ message: { user, text }, name }) => {
  const [sentByCurrentUser, setSentByCurrentUser] = useState(false);

  const trimmedName = name.trim().toLowerCase();

  useEffect(() => {
    if (user === trimmedName) {
      setSentByCurrentUser(true);
    }
  }, [user, trimmedName]);

  return (
    <>
      {sentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10">{user}</p>
        </div>
      )}
    </>
  );
};

export default Message;
