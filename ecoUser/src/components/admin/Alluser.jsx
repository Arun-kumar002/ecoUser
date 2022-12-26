import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  MdDelete,
  MdOutlineEditNote,
  MdOutlineChatBubble,
} from "react-icons/md";
import Paginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import * as endPoints from "../../apis/user";
import { SocketContext } from "../../context/socket";
import { currentChat } from "../../redux/slice";
const Alluser = () => {
  const dispatch = useDispatch();
  const chat = useContext(SocketContext);
  const navigate = useNavigate();
  const [data, setDate] = useState([]);
  const [pagecount, setPagecount] = useState(0);
  const [reload, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsdelete] = useState(false);
  const [deleteid, setDeleteid] = useState("");

  const limit = 5;
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
    _id: "",
  });

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        `${endPoints.getAllUsers}?limit=${limit}&skip=0&getCount=true`
      );
      console.log(res);
      setPagecount(Math.ceil(res.data.users.count / 5));
      setDate(res.data.users.users);
    };
    fetchdata();
  }, [reload]);

  const handlePageClick = async (page) => {
    console.log("clicked", page.selected);
    const res = await axios.get(
      `${endPoints.getAllUsers}?limit=${limit}&skip=${page.selected}&getCount=false`
    );
    setDate(res.data.users.users);
  };

  const checkDelete = (id) => {
    setDeleteid(id);
    setIsdelete(!isDelete);
  };

  const handleDelete = async () => {
    await axios.delete(`${endPoints.deleteUser}/${deleteid}`);
    setReload(!reload);
    setIsdelete(!isDelete);
    toast.success("user deleted successfully");
  };

  const handleEdit = async (id) => {
    let { data } = await axios.get(`${endPoints.getUser}/${id}`);
    setState({ ...data.user, id });
    setIsEdit(!isEdit);
  };
  const handleChat = async (user) => {
    chat.setUserState(user);
    dispatch(currentChat(user));
    navigate("/user/chat");
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        userName: state.userName,
        mobile: state.mobile,
        email: state.email,
        password: state.password,
        role: "user",
      };
      await axios.put(`${endPoints.updateUser}/${state._id}`, payload);
      setReload(!reload);
      setIsEdit(!isEdit);
      toast.success("user update successfull");

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="alldataSection">
        <table cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <td>username</td>
              <td>email</td>
              <td>mobile</td>
              <td>options</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.userName}</td>
                  <td>{value.email}</td>
                  <td>{value.mobile}</td>
                  <td id="edit-delete">
                    <MdDelete
                      onClick={() => checkDelete(value._id)}
                      id="btn-del"
                    />
                    <MdOutlineEditNote
                      onClick={() => handleEdit(value._id)}
                      id="btn-edit"
                    />
                    <MdOutlineChatBubble
                      id="btn-chat"
                      onClick={() => handleChat(value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={".."}
          pageCount={pagecount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center mt-4"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
      <div
        className="loginSection"
        id="popupSection"
        style={{ display: isEdit === true ? "block" : "none" }}
      >
        <form onSubmit={handleSubmit}>
          <h1
            style={{
              position: "relative",
            }}
          >
            Update User{" "}
            <span id="x-mark" onClick={() => setIsEdit(!isEdit)}>
              X
            </span>
          </h1>
          <div className="form-group">
            <label htmlFor="">username</label>
            <input
              type="text"
              name="userName"
              id="username"
              value={state.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">mobile</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={state.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button>update</button>
          </div>
        </form>
      </div>

      <div id="deletePopup" style={{ display: isDelete ? "block" : "none" }}>
        <div>
          <h1>oops...! once you delete cannot retrive it ...</h1>
          <span onClick={() => setIsdelete(!isDelete)}>X</span>
        </div>
        <button onClick={() => handleDelete()}>confirm</button>
      </div>
    </>
  );
};

export default Alluser;
