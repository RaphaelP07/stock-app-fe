import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import axios from "axios";

const Nav = () => {
  const { baseURL, token, setToken } = useContext(GlobalContext);
  const navigate = useNavigate()

  const logout = () => {
    axios({
        method: "delete",
        url: `${baseURL}/logout`,
        headers: token
      })

    navigate("/login")
    localStorage.removeItem("stockAppLoggedID");
    localStorage.removeItem("stockAppLoggedUser");
    localStorage.removeItem("stockAppHeaders");
    setToken('')
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <div className="logo"></div>
      </div>
      <div className="nav-mid"></div>
      <div className="nav-right">
        <ul className='nav-ul'>
          <li>About</li>
          <li>
            {window.location.pathname === "/login" &&
              <Link to="/signup">
                <button className='auth-btn'>Sign Up</button>
              </Link>
            }
            {window.location.pathname === "/signup" &&
              <Link to="/login">
                <button className='auth-btn'>Login</button>
              </Link>
            }
            {token === '' ? '' :
              <button className='auth-btn logout-btn' onClick={() => logout()}>Logout</button>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav