import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { SocketContext } from "../../context/socket";
import "./messenger.css";
import ConverSation from "./ConverSation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { AdminContext } from "../../context/AdminContext.jsx";
import {
  getConversation,
  getMessage,
  newMessage,
  newConverstion,
} from "../../apis/chat";
import { io } from "socket.io-client";
import { MdCardMembership } from "react-icons/md";
const Chat1 = () => {
  const user = useContext(SocketContext);
  let LoginContext = useContext(AdminContext);

  console.log("local", user, LoginContext);
  if (LoginContext.state._id == undefined) {
    LoginContext.state = JSON.parse(window.localStorage.getItem("user1"));
    console.log(LoginContext);
  }
  if (user.state._id == undefined) {
    user.state = JSON.parse(window.localStorage.getItem("receiver1"));
  }

  let [conversation, setConversation] = useState([]);
  let [messages, setMessages] = useState([]);
  let [currentChat, setCurrentChat] = useState(null);
  let [newMessages, setNewMessages] = useState("");
  let [arrival, setArrival] = useState(null);
  let [newConversation, setNewConversation] = useState([]);
  let scrollRef = useRef();
  let socketRef = useRef();
  let [online, setOnline] = useState([]);
  //!new conversation
  useEffect(() => {
    let newConverSation = async () => {
      let conversation = {
        senderId: LoginContext.state._id,
        receiverId: user?.state._id,
      };
      let res = await axios.post(newConverstion, conversation);
      setNewConversation(res.data.savedConversation);
    };
    newConverSation();

    socketRef.current = io("ws://localhost:5005");
    socketRef.current.on("getMessage", (data) => {
      console.log(
        "messageeArrived",
        data,
        "loginid",
        LoginContext.state._id,
        "true",
        data.senderId == LoginContext.state._id
      );
      if (
        data.senderId == LoginContext.state._id ||
        data.receiverId == user.state._id
      ) {
        setArrival({
          sender: data.senderId,
          messages: data.messages,
          createdAt: Date.now(),
        });
      }
      if (
        data.receiverId == LoginContext.state._id ||
        data.senderId == user.state._id
      ) {
        setArrival({
          sender: data.senderId,
          messages: data.messages,
          createdAt: Date.now(),
        });
      }
    });
  }, []);

  //!after arrival
  useEffect(() => {
    console.log("arrived", currentChat);
    if(arrival){
      // console.log('im',arrival.sender);
      let sender=arrival.sender
      console.log(currentChat);
      let current=currentChat?.members?.includes(sender)
      // console.log('current',current);
      if(current){
        setMessages((prev) => [...prev, arrival]);
       
      }
    }
    // arrival &&
    //   currentChat[0]?.members?.includes(arrival.sender) &&
    //   setMessages((prev) => [...prev, arrival]);
  }, [arrival, currentChat]);
  //!it emit user socket ids
  useEffect(() => {
    socketRef.current.emit("addUser", user.state._id);
    socketRef.current.on("getUsers", (users) => {});
  }, [LoginContext]);
  //!getConversation
  useEffect(() => {
    try {
      const getConverSation = async () => {
        const res = await axios.get(getConversation + LoginContext.state._id);
        setConversation(res.data.conversation);
      };
      getConverSation();
    } catch (error) {
      console.log("[Chat]:getConverSation", error);
    }
  }, [newConversation]);
  //!getMessages
  useEffect(() => {
    const getMessages = async () => {
      console.log(newConversation, "newConversation getMsg");
      const res = await axios.get(`${getMessage}${newConversation?._id}`);
      setMessages(res.data.messages);
    };
    getMessages();
  }, [currentChat]);
  //!addNewMessages
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("new conversation", newConversation);
    socketRef.current.emit("sendMessage", {
      senderId: LoginContext.state._id,
      conversationId: newConversation._id,
      receiverId: user.state._id,
      messages: newMessages,
    });
    setNewMessages("");
  };
  //!scroll view
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              name=""
              id="chatMenuInput"
              placeholder="search here "
            />
            {/* {conversation?.map((conversation) => {
              return (
                <>
                  <div onClick={() => setCurrentChat(conversation)}>
                    <ConverSation
                      conversation={conversation}
                      currentUser={LoginContext}
                      msgUser={user}
                    />
                  </div>
                </>
              );
            })} */}
            <div onClick={() => setCurrentChat(conversation[0])}>
              <ConverSation user={user} />
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m, i) => {
                    return (
                      <>
                        <div ref={scrollRef}>
                          <Message
                            own={m?.sender == LoginContext.state._id}
                            message={m}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="chatMessageInput"
                    value={newMessages}
                    onChange={(e) => setNewMessages(e.target.value)}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">open a coverasation</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={online}
              currentId={LoginContext.state._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat1;
