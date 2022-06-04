import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Nav from "./Nav";
import axios from "axios";

const Transaction = ({ transactionId, setSymbol }) => {
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/wallets/${localStorage.getItem('loggedID')}/transactions/${transactionId}`,
      headers: token,
    }).then((res) => {
      setTransaction(res.data);
    });
  }, [])

  const goToStock = (symbol) => {
    setSymbol(symbol)
    navigate('/stock-app-fe/stocks/stock')
  }

  const backToHistory = () => {
    navigate('/stock-app-fe/wallet/history')
  }

  return (
    <div>
      <Nav/>
      <div className="container">
        <table className='wallet-container'>
          <tbody>
          {transaction === null ? '' :
            transaction.action === 'cash-in' || transaction.action === 'cash-out' ? 
            <>
            <tr className='row' >
              <th className='light'>
                TYPE
              </th>
              <th className='light'>
                {transaction.action}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                AMOUNT
              </th>
              <th className='light'>
                ${Number.parseFloat(transaction.amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                DATETIME
              </th>
              <th className='light'>
                {transaction.created_at.slice(0, 10)},{" "}
                {transaction.created_at.slice(11, 16)}
              </th>
            </tr>
          </> :
          <>
            <tr className='row' >
              <th className='light'>
                TYPE
              </th>
              <th className='light'>
                {transaction.action}
              </th>
            </tr>
            <tr className='row' onClick={() => goToStock(transaction.symbol)}>
              <th className='light'>
                SYMBOL
              </th>
              <th className='light'>
                {transaction.symbol}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                COMPANY
              </th>
              <th className='light'>
                {transaction.company}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                PRICE BOUGHT
              </th>
              <th className='light'>
              ${Number.parseFloat(transaction.price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                SHARES
              </th>
              <th className='light'>
                {transaction.shares}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                AMOUNT
              </th>
              <th className='light'>
                ${Number.parseFloat(transaction.amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </th>
            </tr>
            <tr className='row' >
              <th className='light'>
                DATETIME
              </th>
              <th className='light'>
                {transaction.created_at.slice(0, 10)},{" "}
                {transaction.created_at.slice(11, 16)}
              </th>
            </tr>
          </>
          }
            <tr className='row'>
              <th className='back' colSpan='2' onClick={() => backToHistory()}>
                BACK TO HISTORY
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transaction