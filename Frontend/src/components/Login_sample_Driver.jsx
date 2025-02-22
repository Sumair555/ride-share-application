import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "./Schemas";

function Login_sample_Driver() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error_, setError] = useState();

  const onSubmit = async (values, actions) => {
    console.log(values, actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    login(values);
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  //   console.log(errors);
  const login = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/driver/login", {
        email: values.email,
        password: values.password,
      });

      const accesstoken = response.data.accesstoken;

      // Store the access token in local storage
      localStorage.setItem("accessToken", accesstoken);
      localStorage.setItem("driver_id",response.data.id);
      console.log(accesstoken);
      // Redirect user to profile page
      navigate("/driver/dashboard");
    } catch (error) {
      setError(error);
      console.error("Login failed:", error);
    }
  };

  //   useEffect(() => {
  //     const hasReloaded = localStorage.getItem("login");
  //     localStorage.removeItem("profile");
  //     if (!hasReloaded) {
  //       // Reload the page only once
  //       localStorage.setItem("login", "true");
  //       window.location.reload();
  //     }
  //   }, []);

  //   console.log(formik);

  return (
    <>
      <div className="text-skin-base-2">
        <h1 className="text-black text-3xl font-bold text-center tracking-wide">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill my-3 h-10 rounded-lg border-[1px] p-2 text-center outline-none  ${
              errors.email && touched.email
                ? "border-red-800"
                : touched.email
                ? "border-green-500"
                : "border-black"
            }`}
            placeholder="email"
          />
          {errors.email && touched.email && (
            <p className="text-red-600 ">{errors.email}</p>
          )}

          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill my-3 h-10 rounded-lg border-[1px] p-2 text-center outline-none  ${
              errors.password && touched.password
                ? "border-red-800"
                : touched.password
                ? "border-green-500"
                : "border-black"
            }`}
            placeholder="password"
          />
          {errors.password && touched.password ? (
            <p className="text-red-600  mb-2">{errors.password}</p>
          ) : (
            <p className="text-red-600  mb-2"></p>
          )}
          {error_ && (
            <p className="text-red-500  mb-2">
              Enter the correct Email and Password
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`m-auto w-2/3 inline-block  py-2 mt-2 bg-[#eab308] rounded-lg hover:bg-skin-button-accent-hover *:${
              isSubmitting && "opacity-[0.35]"
            }`}
          >
            Proceed
          </button>
        </form>
      </div>
    </>
  );
}

export default Login_sample_Driver;
