import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext } from "react";
import axios from "axios";
import Nav from "./Nav";

const StockAction = ({ action, symbol, stockInfo }) => {
  const navigate = useNavigate();
  const { baseURL } = useContext(GlobalContext);
  const [shares, setShares] = useState("");
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    switch (e.target.id) {
      case "shares":
        setShares(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/wallets/${localStorage.getItem('loggedID')}/transactions/${action.toLowerCase()}/${symbol.toLowerCase()}/${shares}`)
      .then((res) => {
        navigate("/wallet");
      })
      .catch((error) => {
        if (error) {
          console.log(error)
          setFormError(true);
          setMessage(error.response.data)
        }
      });
  };

  return (
    <div className='container'>
      <Nav />
      <form onSubmit={onSubmit} noValidate>
        <div className='transaction-container'>
          <h1 className='form-title form'>
            {action} {symbol}
          </h1>
          <div className="input-label form">
            Price: ${Number.parseFloat(stockInfo.latestPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="flex">
            <div className="input-label form">
              Shares:
            </div>
            <input
              required
              className="input-form form"
              type="shares"
              id="shares"
              name="shares"
              value={shares}
              onChange={onChange}
            ></input>
          </div>
          <div>Total: ${Number.parseFloat(shares*stockInfo.latestPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="form-btn">
            <button className='login-btn'>{action}</button>
            <Link to="/stocks/stock">
              <button className='signup-btn'>CANCEL</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default StockAction