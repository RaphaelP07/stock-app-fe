import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Nav from "./Nav";
import axios from "axios";

const Portfolio = ({ setSymbol, setLocation }) => {
  const { baseURL, token } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/wallets/${localStorage.getItem('loggedID')}/portfolio`,
      headers: token,
    }).then((res) => {
      setPortfolio(res.data[0]);
    });
  }, [])

  const goToStock = (symbol) => {
    setSymbol(symbol)
    setLocation(window.location.pathname)
    navigate('/stocks/stock')
  }

  const backToWallet = () => {
    navigate('/wallet')
  }

  return (
    <div>
      <Nav/>
      <div className="container">
        <table className='wallet-container'>
          <thead>
            <tr className='top-row'>
              <th>SYMBOL</th>
              <th>SHARES</th>
            </tr>
          </thead>
          <tbody>
            {portfolio === null ? 
            <tr>
              <th colSpan={2}>
                No stocks to show 
              </th>
            </tr> : 
            portfolio.map(stock => 
              <tr className='row' onClick={() => goToStock(stock.symbol)} key={portfolio.indexOf(stock)}>
                <th className='light'>
                  {stock.symbol}
                </th>
                <th className='light'>
                  {stock.shares} 
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

export default Portfolio