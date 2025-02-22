import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
  .required("Password is required"),
  license: Yup.string().required("License is required"),
  model: Yup.string().required("Model is required"),
  phone: Yup.string().required("Phone is required"),
});
