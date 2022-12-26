import { createContext ,useState} from "react";

export const AdminContext = createContext();



const AdminProvider = ({children}) => {
 let [adminState,setAdminState]=useState([])
  return <AdminContext.Provider value={{state:adminState,setAdminState:setAdminState}}>{children}</AdminContext.Provider>;
};
export default AdminProvider