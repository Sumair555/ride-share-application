import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login_sample_User() {
  const navigate = useNavigate();
  const [error_, setError_] = React.useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        console.log("Attempting login with:", { email: values.email });
        
        const res = await axios.post("http://localhost:3000/user/login", {
          email: values.email,
          password: values.password,
        });

        console.log("Login response:", res.data);

        if (!res.data || !res.data.accesstoken) {
          console.error("Invalid response format:", res.data);
          setError_("Login failed. Please try again.");
          return;
        }

        // Store token and ID
        localStorage.setItem("accessToken", res.data.accesstoken);
        localStorage.setItem("id", res.data.id);

        // Clear any existing error
        setError_(false);

        // Navigate to dashboard
        navigate("/user/dashboard");
      } catch (err) {
        console.error("Login error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        if (err.response?.status === 401) {
          setError_("Invalid email or password");
        } else if (err.response?.data?.message) {
          setError_(err.response.data.message);
        } else {
          setError_("Login failed. Please try again.");
        }
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input-primary pl-10 ${
              errors.email && touched.email
                ? "border-red-500 focus:ring-red-500"
                : touched.email
                ? "border-green-500 focus:ring-green-500"
                : ""
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && touched.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input-primary pl-10 ${
              errors.password && touched.password
                ? "border-red-500 focus:ring-red-500"
                : touched.password
                ? "border-green-500 focus:ring-green-500"
                : ""
            }`}
            placeholder="Enter your password"
          />
        </div>
        {errors.password && touched.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      {error_ && (
        <div className="text-sm text-red-600 text-center animate-fade-in">
          {typeof error_ === 'string' ? error_ : "Invalid email or password. Please try again."}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-skin-button-accent border-gray-300 rounded focus:ring-skin-button-accent"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-skin-base-2">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="text-skin-button-accent hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`button-primary w-full flex justify-center ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export default Login_sample_User;
