import React from "react";
import { newuserpasswordschema } from "../auth/schema";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

const Newuser = () => {
  let navigate = useNavigate();
  let initialState = {
    email: "",
    password: "",
    confirm: "",
  };
  let newUserSubmit = async (value, action) => {
    try {
      let payload = { ...value };
      let user = await axios.post(
        "http://localhost:5000/auth/user/setpassword",
        payload
      );
      if (user.data.message === "successfull") {
        toast.success("password is created please login");
        navigate("/");
      } else {
        toast.error(user.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  let state = useFormik({
    initialValues: initialState,
    validationSchema: newuserpasswordschema,
    onSubmit: newUserSubmit,
  });
  return (
    <div className="loginSection">
      <form onSubmit={state.handleSubmit}>
        <h1>Set Your Password</h1>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name=""
            id="email"
            value={state.values.email}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="">Enter your password</label>
          <input
            type="password"
            name=""
            id="password"
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.password}</span>
        </div>
        <div className="form-group">
          <label htmlFor="">Confirm your password</label>
          <input
            type="password"
            name=""
            id="password"
            onChange={state.handleChange}
            onBlur={state.handleBlur}
          />
          <span className="errors">{state.errors.confirm}</span>
        </div>
        <div className="form-group">
          <button>set password</button>
        </div>
        <div>
          <Link to={"/"}>already updates?</Link>
        </div>
      </form>
    </div>
  );
};

export default Newuser;
