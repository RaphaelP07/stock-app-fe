import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import axios from "axios";

const Nav = () => {
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()

  const logout = () => {
    axios({
        method: "delete",
        url: `${baseURL}/logout`,
        headers: token  
      }).then((res) => {
        console.log(res, 'res')
      }).catch((err) => {
        console.log(err, 'err')
      })

    navigate("/stock-app-fe/login")
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <div className="logo">logo</div>
      </div>
      <div className="nav-mid"></div>
      <div className="nav-right">
        <ul className='nav-ul'>
          <li>About</li>
          <li>
            {window.location.pathname === "/stock-app-fe/login" &&
              <Link to="/stock-app-fe/signup">
                <button className='auth-btn'>Sign Up</button>
              </Link>
            }
            {window.location.pathname === "/stock-app-fe/signup" &&
              <Link to="/stock-app-fe/login">
                <button className='auth-btn'>Login</button>
              </Link>
            }
            {window.location.pathname === "/stock-app-fe/wallet" &&
              <button className='auth-btn logout-btn' onClick={() => logout()}>Logout</button>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav