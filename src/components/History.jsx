import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Nav from "./Nav";
import axios from "axios";

const History = ({ setTransactionId, setLocation }) => {
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [history, setHistory] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/wallets/${localStorage.getItem('stockAppLoggedID')}/transactions`,
      headers: token,
    }).then((res) => {
      setHistory(res.data);
    });
  }, [])
  
  const backToWallet = () => {
    navigate('/wallet')
  }

  const goToTransaction = (id) => {
    navigate(`/wallet/transaction`)
    setTransactionId(id)
    setLocation(window.location.pathname)
  }

  return (
    <div>
      <Nav/>
      <div className="container">
        <table className='wallet-container'>
          <thead>
            <tr className='top-row'>
              <th>TRANSACTION</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {history === [] ? 
            <tr>
              <th colSpan={2}>
                No transactions to show 
              </th>
            </tr> : 
            history.map(transaction => 
              <tr className='row' onClick={() => goToTransaction(transaction.id)} key={history.indexOf(transaction)} >
                <th className='light'>
                  {transaction.action == 'buy' ? `Bought ${transaction.shares} shares of ${transaction.symbol}` : 
                    transaction.action == 'sell' ? `Sold ${transaction.shares} shares of ${transaction.symbol}` :
                    transaction.action == 'cash-in' ? 'Cash-in' : 'Cash-out'}
                </th>
                <th className={transaction.action == 'buy' || transaction.action == 'cash-out' ? 'negative light' : 'positive light'}>
                  {transaction.action == 'buy' || transaction.action == 'cash-out' ? '-' : '+'} ${Number.parseFloat(transaction.amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </th>
              </tr>
              )
            }
            <tr className='row'>
              <th className='back' colSpan='2' onClick={() => backToWallet()}>
                BACK TO WALLET
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History