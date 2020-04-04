import React, { useRef, useEffect } from "react";
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
      {messages.map((msg, index) => (
        <div key={index}>
          <Message message={msg} name={name} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
