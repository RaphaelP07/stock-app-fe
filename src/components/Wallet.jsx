import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import Nav from "./Nav";

const Wallet = ({ setAction }) => {
  const [balance, setBalance] = useState(0)
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("headers") === null) {
      navigate("/stock-app-fe/login")
    } else

    axios({
      method: "get",
      url: `${baseURL}/wallets/${localStorage.getItem('loggedID')}`,
      headers: {
        Authorization: localStorage.getItem("headers")
      }
    }).then((res) => {
      setBalance(res.data.balance)
    });
  }, [])

  return (
    <div className='container'>
      <Nav />
      <div className="wallet-container">
        <div className="balance-container">
          <p>WALLET BALANCE:</p>
          <div className="balance">
            {balance === null ? 'loading...' : `$${Number.parseFloat(balance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </div>
        </div>
        <div className="actions-container">
          <Link to="/stock-app-fe/wallet/cash-in" className='action link first' onClick={() => setAction('CASH-IN')}>
            <div>CASH IN</div>
          </Link>
          <Link to="/stock-app-fe/wallet/cash-out" className='action link' onClick={() => setAction('CASH-OUT')}>
            <div>CASH OUT</div>
          </Link>
          <Link to="/stock-app-fe/wallet/history" className='action link'>
            <div>HISTORY</div>
          </Link>
          <Link to="/stock-app-fe/wallet/portfolio" className='action link'>
            <div>PORTFOLIO</div>
          </Link>
          <Link to="/stock-app-fe/stocks" className='action link last'>
            <div>STOCKS</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wallet