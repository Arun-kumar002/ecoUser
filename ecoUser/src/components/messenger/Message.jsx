import React from "react";
import {format} from 'timeago.js'
import { useSelector } from "react-redux";
import "./messenger.css";
import uuid from 'react-uuid';
const Message = ({message,own}) => {
  const user=useSelector((state)=>state.reducer)
  return (
    <div className={own ? "message own":"message "}>
      <div className="messageTop" key={uuid()}>
        <img
          src={own?user.senderProfile:user.receiverProfile}
          className="messageImg"
        />
        <p className="messageText">{message?.messages} </p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
};

export default Message;
