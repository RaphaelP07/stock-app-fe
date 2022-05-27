import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

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
      console.log("res", res)
      setBalance(res.data.balance)
    }).catch((err) => {
      console.log("err", err)
    });
  }, []);

  return (
    <div>Wallet balance: ${balance}</div>
  )
}

export default Wallet