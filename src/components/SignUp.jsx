import React from 'react'
import { Link, useNavigate } from "react-router-dom";
// import { GlobalContext } from "../context/GlobalState";

const SignUp = () => {
  return (
    <div className='container'>
      <div className='form-container'>
        <h1 className='form-title form'>
          Sign up
        </h1>
        <div className="input-label form">
          Email
        </div>
        <input className="input-form form" type="text" />
        <div className="input-label form ">
          Password
        </div>
        <input className="input-form form" type="text" />
        <div className="input-label form ">
          Confirm Password
        </div>
        <input className="input-form form" type="text" />
        <div className="form-btn">
          <button className='signup-btn'>Sign up</button>
        </div>
        <p className='auth-link form'>
          <Link to="/stock-app-fe/login"> Already have an account? </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp