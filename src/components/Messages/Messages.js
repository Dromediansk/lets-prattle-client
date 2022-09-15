import React, { useRef, useEffect } from "react";
import { USER_BOT } from "../../utils/variables";
import { BotMessage } from "./Message/BotMessage";
import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name, notifyTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [notifyTyping, messages]);

  return (
    <div className="messages">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            {message.user === USER_BOT ? (
              <BotMessage message={message} />
            ) : (
              <Message message={message} name={name} />
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
