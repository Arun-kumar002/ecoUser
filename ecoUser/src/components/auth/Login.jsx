import React, { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "./schema";
import { login } from "../../redux/slice";
import * as userendPoints from "../../apis/user";
import * as adminendPoints from "../../apis/admin";
import "./auth.css";
const Login = () => {
  const dispatch = useDispatch();
  let initialState = {
    email: "",
    password: "",
    admin: false,
  };
  let navigate = useNavigate();

  let loginSubmit = async (values, action) => {
    try {
      let { email, password, admin } = values;
      let payload = { email, password, admin };
      let user;
      if (admin === true) {
        user = await axios.post(adminendPoints.validateAdmin, payload);
        let message = user.data.message;
        window.localStorage.setItem("token", user.data.admin.token);
        dispatch(login(user.data.admin.admin));
        navigate("/admin/dashboard");
        toast.success(message);
      }
      if (admin === false) {
        user = await axios.post(userendPoints.validateUser, payload);
        let message = user.data.message;
        window.localStorage.setItem("token", user.data.user.token);
        dispatch(login(user.data.user.user));
        navigate("/home");
        toast.success(message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  let state = useFormik({
    initialValues: initialState,
    validationSchema: loginSchema,
    onSubmit: loginSubmit,
  });
  //!events

  return (
    <div className="loginSection">
      <form onSubmit={state.handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name=""
            id="email"
            value={state.values.email}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
            data-testid="email-input"
            placeholder="email"
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
            data-testid="password-input"
            placeholder="password"
          />
          <span className="errors">{state.errors.password}</span>
        </div>
        <div className="form-group1">
          <label htmlFor="">Login as a admin</label>
          <input
            type="checkbox"
            name=""
            id="admin"
            value={state.values.admin}
            onChange={state.handleChange}
            onBlur={state.handleBlur}
            data-testid="adminCheck-input"
          />
        </div>
        <div className="form-group">
          <button data-testid="login-btn">Login</button>
        </div>
        <div>
          <Link to={"/newuser"}>you r a new user?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
