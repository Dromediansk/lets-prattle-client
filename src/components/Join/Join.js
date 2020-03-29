import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [credentials, setCredentials] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      room: ""
    }
  );

  const handleInputChange = event => {
    const name = event.target.name;
    const newValue = event.target.value;
    setCredentials({ [name]: newValue });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            name="name"
            placeholder="Name"
            className="joinInput"
            type="text"
            value={credentials.name}
            onChange={e => handleInputChange(e)}
          />
        </div>
        <div>
          <input
            name="room"
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            value={credentials.room}
            onChange={e => handleInputChange(e)}
          />
        </div>
        <Link
          onClick={e =>
            (!credentials.name || !credentials.room) && e.preventDefault()
          }
          to={`/chat?name=${credentials.name}&room=${credentials.room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
