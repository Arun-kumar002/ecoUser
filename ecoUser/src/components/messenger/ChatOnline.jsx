import React,{useState} from "react";
import "./messenger.css";
const ChatOnline = ({user}) => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src={user?.receiverProfile}
            alt=""
            className="chatOnlineImg"
          />
        <p className="chatOnlineName">{user?.receiverName}</p>
        <p className="chatOnlineName">{user?.receiverEmail}</p>
        </div>

      </div>
    </div>
  );
};

export default ChatOnline;
