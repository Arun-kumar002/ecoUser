import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../auth/schema";
import * as endPoints from "../../apis/user";

const Adduser = () => {
  let navigate = useNavigate();
  let initialState = {
    username: "",
    email: "",
    password: "",
    mobile: "",
    accept: "",
  };
  let registerSubmit = async (value, action) => {
    try {
      console.log(value);
      let { email, password, mobile, username, accept } = value;
      let payload = { email, password, mobile, userName: username, accept };
      let user = await axios.post(endPoints.addUser, payload);
      console.log(user);

      if (user.data.message === "successfull") {
        navigate("/admin/dashboard");
        toast.success("successfully registerd ");
      } else {
        for (let i in user.data.message) {
          toast.info(user.data.message[i]);
        }
      }
    } catch (error) {
      toast(error);
    }
  };
  let state = useFormik({
    initialValues: initialState,
    validationSchema: registerSchema,
    onSubmit: registerSubmit,
  });
  //!events

  return (
    <div className="loginSection">
      <form onSubmit={state.handleSubmit}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="">username</label>
          <input
            type="text"
            name=""
            id="username"
            value={state.values.username}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.username}</span>
        </div>
        <div className="form-group">
          <label htmlFor="">mobile</label>
          <input
            type="text"
            name=""
            id="mobile"
            value={state.values.mobile}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.mobile}</span>
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name=""
            id="email"
            value={state.values.email}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="">password</label>
          <input
            type="password"
            name=""
            id="password"
            value={state.values.password}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.password}</span>
        </div>
        <div className="form-group1">
          <label htmlFor="">allow the user for change password</label>
          <input
            type="checkbox"
            name=""
            id="accept"
            value={state.values.accept}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
        </div>
        <div className="form-group">
          <button>Register</button>
        </div>
        <div>{/* <Link to={"/"}>Login here</Link> */}</div>
      </form>
    </div>
  );
};

export default Adduser;
