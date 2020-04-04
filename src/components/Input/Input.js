import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage, handleKeyDown }) => {
  const mobile = window.innerWidth <= 600;

  return (
    <form action="" className="form">
      <input
        type="text"
        placeholder="Type a message.."
        className="input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={!mobile ? handleKeyDown : () => {}}
        onKeyDown={!mobile ? () => {} : handleKeyDown}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
};

export default Input;
