import React, { useState, useEffect, useContext } from 'react'
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
            {balance === null ? 'loading...' : `$${Number.parseFloat(balance).toFixed(2)}`}
          </div>
        </div>
        <div className="actions-container">
          <div className='first action'>CASH IN</div>
          <div className='action'>CASH OUT</div>
          <div className='action'>HISTORY</div>
          <div className='action'>PORTFOLIO</div>
          <div className='last action'>STOCKS</div>
        </div>
      </div>
    </div>
  )
}

export default Wallet