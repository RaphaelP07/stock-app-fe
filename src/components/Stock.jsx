import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Nav from "./Nav";
import axios from "axios";

const Stock = ({ symbol, setAction, setStockInfo }) => {
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [stock, setStock] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/stocks/info/${symbol}`,
      headers: token,
    }).then((res) => {
      setStock(res.data);
      setStockInfo(res.data)
    });
  }, [])

  const backToWallet = () => {
    navigate('/stock-app-fe/wallet')
  }

  return (
    <div>
      <Nav/>
      <div className="container">
        <div className="wallet-container">
          <table className='balance-container'>
            <tbody>
              <tr className='row'>
                <th className='back stock-cell' colSpan='2' onClick={() => backToWallet()}>
                  BACK TO WALLET
                </th>
              </tr>
            {stock === null ? '' :
            <>
              <tr className='row' >
                <th className='light'>
                  SYMBOL
                </th>
                <th className='light stock-cell'>
                  {stock.symbol}
                </th>
              </tr>
              <tr className='row' >
                <th className='light'>
                  COMPANY
                </th>
                <th className='light stock-cell'>
                  {stock.companyName}
                </th>
              </tr>
              <tr className='row' >
                <th className='light'>
                  PRICE
                </th>
                <th className='light stock-cell'>
                  ${Number.parseFloat(stock.latestPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </th>
              </tr>
            </>
            }
            </tbody>
          </table>
          <div className='actions-container'>
            <Link to="/stock-app-fe/stocks/stock/buy" className='action link first buy-sell' onClick={() => setAction('BUY')}>
              <div>BUY</div>
            </Link>
            <Link to="/stock-app-fe/stocks/stock/sell" className='action link last buy-sell' onClick={() => setAction('SELL')}>
              <div>SELL</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock