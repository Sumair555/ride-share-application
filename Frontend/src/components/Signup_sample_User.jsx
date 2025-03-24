import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "./Schemas";

function SignupSampleUser() {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, actions) => {
      try {
        // Make API request
        const response = await axios.post(
          "http://localhost:3000/user/signup",
          values
        );

        // Handle success
        const accesstoken = response.data.accesstoken;
        const id = response.data.id;
        console.log(accesstoken, id);
        localStorage.setItem("accessToken", accesstoken);
        localStorage.setItem("id", id);

        // Navigate to user dashboard
        navigate("/user/dashboard");
      } catch (error) {
        // Handle error
        console.error("Signup failed:", error);
        alert("Signup failed. Please try again.");
      } finally {
        // Reset form after submission attempt
        actions.resetForm();
      }
    },
  });

  // Rendering form
  return (
    <div className="text-skin-base-2">
      <h1 className=" text-3xl pb-2 font-bold text-center tracking-wide text-black ">
        Sign Up
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="m-1">
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none ${
              formik.touched.name && formik.errors.name
                ? "border-red-800"
                : "border-black"
            }`}
            placeholder="Name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-600">{formik.errors.name}</p>
          )}
        </div>
        <div className="m-1">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none ${
              formik.touched.email && formik.errors.email
                ? "border-red-800"
                : "border-black"
            }`}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div className="m-1">
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none ${
              formik.touched.password && formik.errors.password
                ? "border-red-800"
                : "border-black"
            }`}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600">{formik.errors.password}</p>
          )}
        </div>
        <div className="m-1">
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-800"
                : "border-black"
            }`}
            placeholder="Phone"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-600">{formik.errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-2/3 m-auto inline-block px-5 py-2 bg-[#eab308] rounded-lg hover:bg-skin-button-accent-hover ${
            formik.isSubmitting && "opacity-35"
          }`}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

export default SignupSampleUser;
