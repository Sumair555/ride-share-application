import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "./Schemas/Driver_schema";

function Signup_sample_Driver() {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      license: "",
      model: "",
      phone: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/driver/signup",
          values
        );

        const accesstoken = response.data.accesstoken;
        localStorage.setItem("driver_id", response.data.id);
        localStorage.setItem("accessToken", accesstoken);

        navigate("/driver/dashboard");
      } catch (error) {
        console.error("Signup failed:", error);
        alert("Signup failed. Please try again.");
      } finally {
        actions.resetForm();
      }
    },
  });

  return (
    <div className="signup-form-container">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="signup-input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`signup-input ${
              formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-sky-200 focus:ring-sky-400"
            }`}
            placeholder="Full Name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="form-error">{formik.errors.name}</p>
          )}
        </div>

        <div className="signup-input-wrapper">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`signup-input ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-sky-200 focus:ring-sky-400"
            }`}
            placeholder="Email Address"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="form-error">{formik.errors.email}</p>
          )}
        </div>

        <div className="signup-input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`signup-input ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-sky-200 focus:ring-sky-400"
            }`}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="form-error">{formik.errors.password}</p>
          )}
        </div>

        <div className="signup-input-wrapper">
          <input
            type="text"
            id="license"
            name="license"
            value={formik.values.license}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`signup-input ${
              formik.touched.license && formik.errors.license
                ? "border-red-500 focus:ring-red-500"
                : "border-sky-200 focus:ring-sky-400"
            }`}
            placeholder="License Number"
          />
          {formik.touched.license && formik.errors.license && (
            <p className="form-error">{formik.errors.license}</p>
          )}
        </div>

        <div className="signup-input-wrapper">
          <input
            type="text"
            id="model"
            name="model"
            value={formik.values.model}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`signup-input ${
              formik.touched.model && formik.errors.model
                ? "border-red-500 focus:ring-red-500"
                : "border-sky-200 focus:ring-sky-400"
            }`}
            placeholder="Vehicle Model"
          />
          {formik.touched.model && formik.errors.model && (
            <p className="form-error">{formik.errors.model}</p>
          )}
        </div>

        <div className="signup-input-wrapper">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`signup-input ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-sky-200 focus:ring-sky-400"
            }`}
            placeholder="Phone Number"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="form-error">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`signup-button ${formik.isSubmitting ? "opacity-50" : ""}`}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup_sample_Driver;
