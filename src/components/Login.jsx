import React from 'react'
import { Link, useNavigate } from "react-router-dom";
// import { GlobalContext } from "../context/GlobalState";

const Login = () => {
  return (
    <div className='container'>
      <div className='form-container'>
        <h1 className='form-title form'>
          Login
        </h1>
        <div className="input-label form">
          Email
        </div>
        <input className="input-form form" type="text" />
        <div className="input-label form ">
          Password
        </div>
        <input className="input-form form" type="text" />
        <div className="form-btn">
          <button className='login-btn'>Login</button>
          <Link to="/stock-app-fe/signup">
            <button className='signup-btn'>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login