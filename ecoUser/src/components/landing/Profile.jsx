import React, { useState } from "react";
import { BsHeart, BsTelephone } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import "./home.css";
import { MdOutlineChatBubble } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { currentChat } from "../../redux/slice";
import { useDispatch,useSelector } from "react-redux";

const Profile = ({ data }) => {
  let user=useSelector((state)=>state.reducer)
  let navigate = useNavigate();
  let dispatch=useDispatch()
  let [like, setLike] = useState(false);
  let handleChat = (datas) => {
    dispatch(currentChat(datas))
    navigate("/user/chat");
  };

  if(data._id!==user.senderId){

  return (
    <>
      <div className="profile">
        <div className="profile__image">
          <img src={data?.profile} alt="profile" />
        </div>
        <div className="profile__details">
          <div className="profileDetails">
            <p>{data?.userName}</p>
          </div>
          <div  className="profileDetails">
            
            <p  className="profileIcons"> <CgMail></CgMail><span>{data?.email}</span></p>
          </div>
          <div className="profileDetails">
           
            <p className="profileIcons"> <BsTelephone></BsTelephone> <span>+91 {data?.mobile ? data.mobile : "8610159926"}</span></p>
          </div>
          <div className="profileDetails">
            
            <p className="profileIcons"><TbWorld></TbWorld><span>{data?.website ? data.website : `https://www.${data.userName}.com/`}</span></p>
          </div>
        </div>
        <div className="profile__curd">
          <BsHeart
            className={like ? "like" : ""}
            onClick={() => setLike(!like)}
          ></BsHeart>
          <AiOutlineEdit></AiOutlineEdit>
          <RiDeleteBin6Line></RiDeleteBin6Line>
          <MdOutlineChatBubble id="btn-chat" onClick={() => handleChat(data)} />
        </div>
      </div>
    </>
  );
}

};

export default Profile;
