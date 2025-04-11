import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../contexts/AuthContext';
import LogotypeLink from '../partials/components/LogotypeLink';


function SignUp() {
  const {signUp} = useAuth();
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (values.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least two characters long'
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (values.lastName.trim().length < 2) {
      errors.lastName = 'First name must be at least two characters long'
    }

    //Regex är AI genererad. Danke ChatGPT <3
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!values.termsAndConditions) {
      errors.termsAndConditions = 'You must accept the Terms and Conditions';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAndConditions: false,
    },
    validate,
    validateOnChange: false,
    onSubmit: async (values) => {
      const succeeded = await signUp(values.firstName, values.lastName, values.email, values.password);
      console.log(succeeded);
      if (succeeded)
        navigate("/signin");
      else
        console.log('Failed!');
    }
  });

  return (
    <div className="auth-container">
      <section className="auth-card">
        <h1>Create Account</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' value={formik.values.firstName.trim()} onChange={formik.handleChange} placeholder='Enter your first name'/>
            {formik.errors.firstName ? (<div className='error'>{formik.errors.firstName}</div>) : null}
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id='lastName' value={formik.values.lastName.trim()} onChange={formik.handleChange} placeholder='Enter your last name' />
            {formik.errors.lastName ? (<div className='error'>{formik.errors.lastName}</div>) : null}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' value={formik.values.email.trim()} onChange={formik.handleChange} placeholder='Enter your email address'/>
            {formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
          </div>
          <div>
            <label htmlFor='password' id='password'>Password</label>
            <input type='text' id='password' value={formik.values.password.trim()} onChange={formik.handleChange} placeholder='Enter your password'/>
            {formik.errors.password ? (<div className='error'>{formik.errors.password}</div>) : null}
          </div>
          <div>
            <label htmlFor='confirmPassword' id='confirmPassword'>Password</label>
            <input type='text' id='confirmPassword' value={formik.values.confirmPassword.trim()} onChange={formik.handleChange} placeholder='Confirm your password'/>
            {formik.errors.confirmPassword ? (<div className='error'>{formik.errors.confirmPassword}</div>) : null}
          </div>
          <div className='checkbox'>
            <input type='checkbox' id='termsAndConditions' checked={formik.values.termsAndConditions} onChange={formik.handleChange} />
            <label htmlFor='termsAndConditions'>I Accept <span id="taCLabel">Terms and Conditions</span></label>
            {formik.errors.termsAndConditions ? (<div className='error'>{formik.errors.confirmPassword}</div>) : null}
          </div>
          <button type='submit'>
            Create Account
          </button>
        </form>
        <p>Already have an account? <Link to='/signin' className='signInLink'>Login</Link></p>
      </section>
      <LogotypeLink />
    </div>
  )
}

//Hans demokod
// import React from 'react'

// const SignUp = () => {
//   return (
//     <div>SignUp</div>
//   )
// }

export default SignUp