import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import LogotypeLink from "../partials/components/LogotypeLink";

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const validate = (values) => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = "Email is required";
      //Regex är AI genererad, danke ChatGPT <3
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: async (values) => {
      const succeeded = await signIn(values.email, values.password);
      if (succeeded) navigate("/projects");
      else console.log("Failed!");
    },
  });

  return (
    <div className="auth-container">
      <section className="auth-card">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={formik.values.email.trim()}
              onChange={formik.handleChange}
              placeholder="Your email address"
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={formik.values.password.trim()}
              onChange={formik.handleChange}
              placeholder="Enter your password"
            />
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signUpLink">
            Sign up
          </Link>
        </p>
      </section>
      <LogotypeLink />
    </div>
  );
}

export default SignIn;
