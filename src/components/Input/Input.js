import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage, onKeyDown }) => {
  const mobile = window.innerWidth <= 600;

  return (
    <form action="" className="form">
      <input
        autoFocus
        type="text"
        placeholder="Type a message.."
        className="input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={!mobile ? onKeyDown : () => {}}
        onKeyDown={!mobile ? () => {} : onKeyDown}
      />
      <button
        className="primary-button sendButton"
        onClick={(e) => sendMessage(e)}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
