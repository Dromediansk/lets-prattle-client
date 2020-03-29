import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form action="" className="form">
      <input
        type="text"
        placeholder="Type a message.."
        className="input"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === "Enter" && sendMessage(e)}
      />
      <button className="sendButton" onClick={e => sendMessage(e)}>
        Send
      </button>
    </form>
  );
};

export default Input;
