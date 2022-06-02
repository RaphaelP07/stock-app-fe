import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const CashAction = ({ action }) => {
  const navigate = useNavigate();
  const { baseURL, setToken } = useContext(GlobalContext);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    switch (e.target.id) {
      case "amount":
        setAmount(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/wallets/${localStorage.getItem('loggedID')}/cash-in/${amount}`)
      .then((res) => {
        console.log(res)
        navigate("/stock-app-fe/wallet");
      })
      .catch((error) => {
        if (error) {
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
            {action}
          </h1>
          <div className="input-label form">
            Amount
          </div>
          <input
            required
            className="input-form form"
            type="amount"
            id="amount"
            name="amount"
            value={amount}
            onChange={onChange}
          ></input>
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="form-btn">
            <button className='login-btn'>Cash-in</button>
            <Link to="/stock-app-fe/wallet">
              <button className='signup-btn'>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CashAction