// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { SignupSchema } from "./Schemas";

// function Signup_sample_Driver() {
//   const navigate = useNavigate();

//   const onSubmit = async (values, actions) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     actions.resetForm();
//     signup(values);
//   };

//   const {
//     values,
//     errors,
//     touched,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//   } = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       license: "",
//       model: "",
//       phone: "",
//     },
//     validationSchema: SignupSchema,
//     onSubmit,
//   });

//   const signup = async (values) => {
//     try {
//       const response = await axios.post("http://localhost:3000/driver/signup", {
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         license: values.license,
//         model: values.model,
//         phone: values.phone,
//       });

//       const accessToken = response.data.accesstoken;

//       // Store the access token in local storage
//       localStorage.setItem("accessToken", accessToken);

//       // Redirect user to home page
//       navigate("/dashboard", { replace: true });
//     } catch (error) {
//       alert("Signup failed:", error);
//     }
//   };

//   return (
//     <div className="text-skin-base-2 ">
//       <h1 className="text-skin-heading-1 text-3xl pb-2 font-bold text-center tracking-wide">
//         Sign Up
//       </h1>
//       <form onSubmit={signup} className="flex flex-col  ">
//         {" "}
//         {/* Add space-y-2 class */}
//         <div className="m-1">
//           <input
//             type="text"
//             id="name"
//             value={values.name}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none `}
//             placeholder="Name"
//           />
//         </div>
//         <div className="m-1">
//           <input
//             type="email"
//             id="email"
//             value={values.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none
//             `}
//             placeholder="Email"
//           />
//         </div>
//         <div className="m-1">
//           <input
//             type="password"
//             id="password"
//             value={values.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-[293px]  placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
//             placeholder="Password"
//           />
//         </div>
//         <div className="m-1">
//           <input
//             type="text"
//             id="license"
//             value={values.license}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none
//             `}
//             placeholder="license"
//           />
//         </div>
//         <div className="m-1">
//           <input
//             type="text"
//             id="model"
//             value={values.model}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none
//             `}
//             placeholder="Model"
//           />
//         </div>
//         <div className="m-1">
//           <input
//             type="text"
//             id="phone"
//             value={values.phone}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none
//             `}
//             placeholder="Phone"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-2/3 m-auto inline-block px-5 py-2 bg-[#eab308] rounded-lg hover:bg-skin-button-accent-hover ${
//             isSubmitting && "opacity-[0.35]"
//           }`}
//         >
//           Proceed
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup_sample_Driver;

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
        // Make API request
        const response = await axios.post(
          "http://localhost:3000/driver/signup",
          values
        );

        // Handle success
        const accesstoken = response.data.accesstoken;
        localStorage.setItem("driver_id", response.data.id);
        localStorage.setItem("accessToken", accesstoken);

        // Navigate to dashboard
        navigate("/driver/dashboard");
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
      <h1 className="text-black text-3xl pb-2 font-bold text-center tracking-wide">
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
            className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
            placeholder="Name"
          />
          {/* {formik.touched.name && formik.errors.name && (
            <span className="text-red-500">{formik.errors.name}</span>
          )} */}
        </div>
        <div className="m-1">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
            placeholder="Email"
          />
          {/* {formik.touched.email && formik.errors.email && (
            <span className="text-red-500">{formik.errors.email}</span>
          )} */}
        </div>
        <div className="m-1">
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-[293px] placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
            placeholder="Password"
          />
          {/* {formik.touched.password && formik.errors.password && (
            <span className="text-red-500">{formik.errors.password}</span>
          )} */}
        </div>
        <div className="m-1">
          <input
            type="text"
            id="license"
            name="license"
            value={formik.values.license}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
            placeholder="License"
          />
          {/* {formik.touched.license && formik.errors.license && (
            <span className="text-red-500">{formik.errors.license}</span>
          )} */}
        </div>
        <div className="m-1">
          <input
            type="text"
            id="model"
            name="model"
            value={formik.values.model}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
            placeholder="Car Model"
          />
          {/* {formik.touched.model && formik.errors.model && (
            <span className="text-red-500">{formik.errors.model}</span>
          )} */}
        </div>
        <div className="m-1">
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full placeholder:text-[#fff18a] bg-skin-fill h-10 rounded-lg border-[1px] p-2 text-center outline-none`}
            placeholder="Phone"
          />
          {/* {formik.touched.phone && formik.errors.phone && (
            <span className="text-red-500">{formik.errors.phone}</span>
          )} */}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-2/3 m-auto inline-block px-5 py-2 bg-[#eab308] rounded-lg hover:bg-skin-button-accent-hover ${
            formik.isSubmitting && "opacity-[0.35]"
          }`}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

export default Signup_sample_Driver;
