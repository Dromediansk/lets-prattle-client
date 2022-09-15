import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import TypingIcon from "../../icons/edit.gif";

import "./Chat.css";
import { USER_ALREADY_TAKEN } from "../../utils/errors";

const endpoint = process.env.REACT_APP_SERVER_HOST;
let socket;

export const Chat = () => {
  const location = useLocation();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [typing, setTyping] = useState(false);
  const [notifyTyping, setNotifyTyping] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(endpoint);
    socket.emit("join", { name, room }, (error) => {
      if (error === USER_ALREADY_TAKEN) {
        alert("Such user name already exists in this room!");
        window.location.replace("/");
        return;
      }
    });

    setRoom(room);
    setName(name);
  }, [endpoint, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.on("notifyTyping", (data) => {
      setNotifyTyping(`${data.user}`);
    });
    socket.on("notifyStopTyping", () => {
      setNotifyTyping("");
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      setTyping(false);
      clearTimeout(timeout);
      socket.emit("stopTyping", { room }, "");
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  let timeout;

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const stopTyping = () => {
    setTyping(false);
    socket.emit("stopTyping", { room }, "");
  };

  const handleKeyDownNotEnter = () => {
    clearTimeout(timeout);
    timeout = setTimeout(stopTyping, 3000);
  };

  const handleKeyDown = (event) => {
    setTyping(true);

    if (event.key === "Enter") {
      sendMessage(event);
    } else if (event.key === "Backspace" || event.key === "Escape") {
      return;
    } else if (!typing) {
      throttle(
        socket.emit("typing", { name, room, message: "is typing..." }),
        3000
      );
      timeout = setTimeout(stopTyping, 3000);
    } else {
      throttle(handleKeyDownNotEnter, 3000);
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} notifyTyping={notifyTyping} />
        {notifyTyping && (
          <div className="typingNotification">
            <span>{notifyTyping}</span>
            <img src={TypingIcon} alt="typing" />
          </div>
        )}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          onKeyDown={handleKeyDown}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};
