import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Nav from "./Nav";
import axios from "axios";

const Stocks = ({ setSymbol, setLocation }) => {
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [stocks, setStocks] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/stocks/top_ten`,
      headers: token,
    }).then((res) => {
      setStocks(res.data);
    });
  }, [])

  const goToStock = (symbol) => {
    setSymbol(symbol)
    setLocation(window.location.pathname)
    navigate('/stock-app-fe/stocks/stock')
  }

  const backToWallet = () => {
    navigate('/stock-app-fe/wallet')
  }

  return (
    <div>
      <Nav/>
      <div className="container">
        <table className='wallet-container'>
          <thead>
            <tr className='top-row'>
              <th>SYMBOL</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
          {stocks === null ? 
          <tr>
            <th colSpan={2}>Loading stocks</th>
          </tr> :
          stocks.map(stock => 
            <tr className='row' onClick={() => goToStock(stock.symbol)} key={stocks.indexOf(stock)} >
              <th className='light'>
                {stock.symbol}
              </th>
              <th className='light'>
                ${Number.parseFloat(stock.latestPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </th>
            </tr>
            )}
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

export default Stocks