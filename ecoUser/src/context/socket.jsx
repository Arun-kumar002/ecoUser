import { createContext ,useState} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();


export const socket = io("ws://localhost:5005", {
  transports: ["websocket"],
});
const SocketProvider = ({children}) => {
 let [userState,setUserState]=useState([])
 
  return <SocketContext.Provider value={{state:userState,setUserState:setUserState}}>{children}</SocketContext.Provider>;
};
export default SocketProvider