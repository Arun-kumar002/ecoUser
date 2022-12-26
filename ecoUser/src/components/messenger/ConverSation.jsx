import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import * as endPoints from "../../apis/user";
import "./messenger.css";

const ConverSation = ({ user }) => {
  return (
    <div className="conversation">
      <img
        alt=""
        className="conversationImg"
        src={user?.receiverProfile}
      />
      <span className="conversationName">{user?.receiverName}</span>
    </div>
  );
};

export default ConverSation;
