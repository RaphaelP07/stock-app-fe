import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import Nav from "./Nav";

const Wallet = () => {
  const [balance, setBalance] = useState(0)
  const { baseURL, token } = useContext(GlobalContext);

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/wallets/2`,
      headers: {
        Authorization: token.authorization
      }
    }).then((res) => {
      setBalance(res.data.balance)
    });
  }, []);

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
          <Link to="/stock-app-fe/wallet/cash-action" className='action link first'>
            <div>CASH IN</div>
          </Link>
          <Link to="/stock-app-fe/wallet/cash-action" className='action link'>
            <div>CASH OUT</div>
          </Link>
          <Link to="/stock-app-fe/wallet/history" className='action link'>
            <div>HISTORY</div>
          </Link>
          <Link to="/stock-app-fe/wallet/portfolio" className='action link'>
            <div>PORTFOLIO</div>
          </Link>
          <Link to="/stock-app-fe/wallet/stocks" className='action link last'>
            <div>STOCKS</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wallet