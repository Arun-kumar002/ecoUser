import {createSlice} from '@reduxjs/toolkit'

const InitialState={
    receiverId:'',
    receiverName:'',
    receiverEmail:'',
    receiverProfile:'',
    senderId:'',
    senderName:'',
    senderEmail:'',
    senderProfile:'',
    notification:[],
    notificationEnable:false
}

const MessengerReducer=createSlice({
    name:'MessengerReducer',
    initialState:InitialState,
    reducers:{
        login:(state,action)=>{
          state.senderId=action.payload._id
          state.senderName=action.payload.userName
          state.senderEmail=action.payload.email
          state.senderProfile=action.payload.profile
        },
        currentChat:(state,action)=>{
          state.receiverId=action.payload._id
          state.receiverName=action.payload.userName
          state.receiverEmail=action.payload.email
          state.receiverProfile=action.payload.profile
        },
        notification:(state,action)=>{
          !state.notification.includes(action.payload)&&state.notification.push(action.payload)
        },
        clearNotification:(state,action)=>{
          state.notification=[]
        }
     
    }
})

export let {currentChat,login,notification,clearNotification}=MessengerReducer.actions
export default MessengerReducer