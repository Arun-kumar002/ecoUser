import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup.string().email("please enter the valid email"),
  password: yup.string().required("please enter your password"),
});
export const registerSchema = yup.object().shape({
  username: yup.string().required("please enter the username"),
  email: yup.string().required("please enter the valid email"),
  mobile: yup.string().required("please enter your mobile no"),
  password: yup.string().min(5)
});
export const updateSchema = yup.object().shape({
  username: yup.string(),
  email: yup.string().required("please enter the valid email"),
  mobile: yup.string(),
  password: yup.string().min(5)
});
export const newuserpasswordschema = yup.object().shape({
  email: yup.string().required("please enter the valid email"),
  password: yup.string().min(5).required("please enter minimum 5 char"),
  confirm: yup.string().oneOf([yup.ref("password"), null], "password mismatch"),
});
