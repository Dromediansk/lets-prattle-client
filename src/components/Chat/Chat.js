import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [typing, setTyping] = useState(false);
  const [notifyTyping, setNotifyTyping] = useState("");

  const endpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(endpoint);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });
  }, [history, endpoint, location.search]);

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
      setNotifyTyping(`${data.user} ${data.message}`);
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

  const timeoutFunction = () => {
    setTyping(false);
    socket.emit("stopTyping", { room }, "");
  };

  const handleKeyPressNotEnter = () => {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 10000);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    } else {
      if (!typing) {
        setTyping(true);
        throttle(
          socket.emit("typing", { name, room, message: "is typing..." }),
          9000
        );
        timeout = setTimeout(timeoutFunction, 10000);
      } else {
        throttle(handleKeyPressNotEnter, 10000);
      }
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} notifyTyping={notifyTyping} />
        {notifyTyping && (
          <div className="typingNotification">{notifyTyping}</div>
        )}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
