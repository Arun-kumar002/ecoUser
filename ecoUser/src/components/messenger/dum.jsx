// import React, { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { SocketContext } from "../../context/socket";
// import "./messenger.css";
// import ConverSation from "./ConverSation";
// import Message from "./Message";
// import ChatOnline from "./ChatOnline";
// import { AdminContext } from "../../context/AdminContext.jsx";
// import {
//   getConversation,
//   getMessage,
//   newMessage,
//   newConverstion,
// } from "../../apis/chat";
// import { io } from "socket.io-client";
// const Chat = () => {
//   const user = useContext(SocketContext);
//   let LoginContext = useContext(AdminContext);

//   if (LoginContext.state._id == undefined) {
//     LoginContext.state = JSON.parse(window.localStorage.getItem("user"));
//     console.log(LoginContext);
//   }
//   if (user.state._id == undefined) {
//     user.state = JSON.parse(window.localStorage.getItem("receiver"));
//   }

//   let [conversation, setConversation] = useState([]);
//   let [messages, setMessages] = useState([]);
//   let [currentChat, setCurrentChat] = useState(null);
//   let [newMessages, setNewMessages] = useState("");
//   let [arrival, setArrival] = useState(null);
//   let [getMsg, setGetMsg] = useState(false);
//   let [newConversation, setNewConversation] = useState([]);
//   let scrollRef = useRef();
//   let socketRef = useRef();
//   let [online, setOnline] = useState([]);

//   useEffect(() => {
//     let newConverSation = async () => {
//       let conversation = {
//         senderId: LoginContext.state._id,
//         receiverId: user?.state._id,
//       };
//       let res = await axios.post(newConverstion, conversation);
//       console.log(res.data);
//       setNewConversation(res.data);
//     };
//     newConverSation();
//     socketRef.current = io("ws://localhost:5003");
//   }, []);

//   useEffect(() => {
//     arrival &&
//       currentChat?.members[0].includes(arrival.sender) &&
//       setMessages((prev) => [...prev, arrival]);
//   }, [arrival, currentChat]);

//   useEffect(() => {
//     socketRef.current.emit("addUser", user.state._id);
//     socketRef.current.on("getUsers", (users) => {
//       console.log("im userssss", users);
//       setOnline(users);
//     });
//   }, [LoginContext]);

//   useEffect(() => {
//     try {
//       const getConverSation = async () => {
//         const res = await axios.get(getConversation + LoginContext.state._id);
//         console.log(res);
//         setConversation(res.data);
//       };
//       getConverSation();
//     } catch (error) {
//       console.log("[Chat]:getConverSation", error);
//     }
//   }, [newConversation]);

//   useEffect(() => {
//     const getMessages = async () => {
      
//       const res = await axios.get(`${getMessage}${newConversation?.result._id}`);
//       console.log('get Message',res);
//       setMessages(res.data);
//     };
//     getMessages();
//   }, [currentChat,getMsg]);

//   useEffect(() => {
//     console.log("im get msg useEffect");
//     socketRef.current.on("getMessage", (data) => {
//       console.log("messageeArrived", data);
//       // if (data != undefined) {
//         setMessages([
//           ...messages,
//           {
//             sender: data.senderId,
//             messages: data.messages,
//             createdAt: Date.now(),
//           },
//         ]);
//       }
//     );
//   }, [getMsg]);

//   let handleSubmit = async (e) => {
//     e.preventDefault();
//    console.log(currentChat);
//     // const receiverId = currentChat.members.find(
//     //   (mem) => mem !== LoginContext.state._id
//     // );
    
//     socketRef.current.emit("sendMessage", {
//       senderId: LoginContext.state._id,
//       conversationId: newConversation.result._id,
//       receiverId:user.state._id,
//       messages: newMessages,
//     });
//     console.log("new conversation", newConversation.result._id);
  

//     setMessages([
//       ...messages,
//       {
//         conversationId: newConversation.result._id,
//         sender: LoginContext.state._id,
//         messages: newMessages,
//         createdAt: Date.now(),
//       },
//     ]);
//     setNewMessages("");
//     // setGetMsg(!getMsg);
//   };

//   useEffect(() => {
//     scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input
//               type="text"
//               name=""
//               id="chatMenuInput"
//               placeholder="search here "
//             />
//             {/* {conversation?.map((conversation) => {
//               return (
//                 <>
//                   <div onClick={() => setCurrentChat(conversation)}>
//                     <ConverSation
//                       conversation={conversation}
//                       currentUser={LoginContext}
//                       msgUser={user}
//                     />
//                   </div>
//                 </>
//               );
//             })} */}
//             <div onClick={() => setCurrentChat(conversation)}>
//             <ConverSation user={user}/>

//             </div>
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages?.map((m) => {
//                     return (
//                       <>
//                         <div ref={scrollRef}>
//                           <Message
//                             own={m?.sender == LoginContext?.state._id}
//                             message={m}
//                           />
//                         </div>
//                       </>
//                     );
//                   })}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     name=""
//                     id=""
//                     cols="30"
//                     rows="10"
//                     className="chatMessageInput"
//                     value={newMessages}
//                     onChange={(e) => setNewMessages(e.target.value)}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">open a coverasation</span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={online}
//               currentId={LoginContext.state._id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;
