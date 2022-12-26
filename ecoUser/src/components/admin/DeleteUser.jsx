import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as endPoints from "../../apis/user";

const DeleteUser = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = { email };
      let deleted = await axios.post(
        "http://localhost:5000/auth/user/delete",
        payload
      );
      toast.success(deleted.data.message);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginSection">
      <form onSubmit={handleSubmit}>
        <h1>delete User</h1>
        <div className="form-group">
          <label htmlFor="">Enter the email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button>Delete User</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteUser;
