import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import * as chatEndPoints from "../../apis/chat";
import { IoMdSend, IoIosMic } from "react-icons/io";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import ConverSation from "./ConverSation";
import { notification } from "../../redux/slice";
import "./messenger.css";
import uuid from "react-uuid";

const Chat = () => {
  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition();
  const dispatch = useDispatch();
  const senderAndReceiver = useSelector((state) => state.reducer);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessages, setNewMessages] = useState("");
  const [arrival, setArrival] = useState(null);
  const [getMsg, setGetMsg] = useState(false);
  const [newConversation, setNewConversation] = useState([]);
  const [notify, setNotify] = useState([]);
  const scrollRef = useRef();
  const socketRef = useRef();
  //!new conversation

  useEffect(() => {
    let newConverSation = async () => {
      let conversation = {
        senderId: senderAndReceiver.senderId,
        receiverId: senderAndReceiver.receiverId,
      };

      let res = await axios.post(chatEndPoints.newConverstion, conversation);
      setNewConversation(res.data.savedConversation);
    };
    newConverSation();

    socketRef.current = io(chatEndPoints.webserver);

    socketRef.current.on("getMessage", (data) => {
      if (data.receiverId == senderAndReceiver.senderId) {
        setArrival({
          sender: data.senderId,
          messages: data.messages,
          createdAt: Date.now(),
        });
        dispatch(notification(data.senderName));
      }
    });
  }, []);
  //!after arrival
  useEffect(() => {
    arrival &&
      newConversation?.members?.includes(arrival.sender) &&
      setMessages((prev) => [...prev, arrival]);
  }, [arrival, currentChat]);
  //!it emit user socket ids
  useEffect(() => {
    socketRef.current.emit("addUser", senderAndReceiver.receiverId);
    socketRef.current.on("getUsers", (users) => {});
  }, [senderAndReceiver]);
  //!getConversation
  useEffect(() => {
    try {
      const getConverSation = async () => {
        const res = await axios.get(
          chatEndPoints.getConversation + senderAndReceiver.senderId
        );
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
      const res = await axios.get(
        `${chatEndPoints.getMessage}${newConversation?._id}`
      );
      setMessages(res.data.messages);
    };
    getMessages();
  }, [currentChat, getMsg]);
  //!addNewMessages

  let handleSubmit = async (e) => {
    e.preventDefault();
    socketRef.current.emit("sendMessage", {
      senderId: senderAndReceiver.senderId,
      conversationId: newConversation?._id,
      receiverId: senderAndReceiver.receiverId,
      messages: newMessages,
      senderName: senderAndReceiver.senderName,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: senderAndReceiver.senderId,
        messages: newMessages,
        createdAt: Date.now(),
      },
    ]);

    setNewMessages("");
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speechToText = async () => {
    console.log("listening", listening);
    if (!browserSupportsSpeechRecognition) {
      toast.info("Browser doesn't support speech recognition");
      return;
    }
    if (transcript) {
      await setNewMessages(transcript);
    }
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div onClick={() => setCurrentChat(newConversation)}>
              <ConverSation user={senderAndReceiver} />
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => {
                    return (
                      <>
                        <div ref={scrollRef}>
                          <Message
                            own={m?.sender == senderAndReceiver.senderId}
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
                    cols="20"
                    rows="5"
                    className="chatMessageInput"
                    value={newMessages}
                    onChange={(e) => setNewMessages(e.target.value)}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    <IoMdSend />
                  </button>
                  <button
                    className="chatSubmitButton"
                    onClick={SpeechRecognition.startListening}
                    onMouseLeave={() => speechToText()}
                  >
                    <IoIosMic  />
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
            <ChatOnline user={senderAndReceiver} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
