import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wallet from "./components/Wallet";
import CashAction from "./components/CashAction";
import History from "./components/History";
import Portfolio from "./components/Portfolio";
import Stocks from "./components/Stocks";
import Transaction from "./components/Transaction";
import Stock from "./components/Stock";
import StockAction from "./components/StockAction";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedID, setLoggedID] = useState("");
  const [transactionId, setTransactionId] = useState(0)
  const [symbol, setSymbol] = useState('')
  const [action, setAction] = useState('')
  const [stockInfo, setStockInfo] = useState('')
  const [location, setLocation] = useState('')

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path="/stock-app-fe/login"
            element={
              <Login
                loggedUser={loggedUser}
                setLoggedUser={(email) => setLoggedUser(email)}
                setLoggedID={(id) => setLoggedID(id)}
              />
            }
          />
          <Route 
            path="/stock-app-fe/wallet" 
            element={
              <Wallet
              setAction={(action) => setAction(action)}
              />
            }
          />
          <Route 
            path="/stock-app-fe/wallet/cash-in" 
            element={
              <CashAction
                action={action}
              />}
            />
          <Route 
            path="/stock-app-fe/wallet/cash-out" 
            element={
              <CashAction
                action={action}
              />}
            />
          <Route 
            path="/stock-app-fe/wallet/history" 
            element={
              <History
              setTransactionId={(id) => setTransactionId(id)}
              setLocation={(location) => setLocation(location)}
              />
            }/>
          <Route 
            path="/stock-app-fe/wallet/transaction" 
            element={
              <Transaction
                transactionId={transactionId}
                setSymbol={(symbol) => setSymbol(symbol)}
                setLocation={(location) => setLocation(location)}
              />
            }/>
          <Route 
            path="/stock-app-fe/stocks" 
            element={
              <Stocks
                setSymbol={(symbol) => setSymbol(symbol)}
                setLocation={(location) => setLocation(location)}
                />
            }/>
          <Route 
            path="/stock-app-fe/stocks/stock" 
            element={
              <Stock
                setAction={(action) => setAction(action)}
                setStockInfo={(info) => setStockInfo(info)}
                symbol={symbol}
                location={location}
              />
            }/>
          <Route 
            path="/stock-app-fe/stocks/stock/sell" 
            element={
              <StockAction
                action={action}
                symbol={symbol}
                stockInfo={stockInfo}
              />
            }/>
          <Route 
            path="/stock-app-fe/stocks/stock/buy" 
            element={
              <StockAction
                action={action}
                symbol={symbol}
                stockInfo={stockInfo}
              />
            }/>
          <Route path="/stock-app-fe/wallet/portfolio" 
            element={
              <Portfolio
                setSymbol={(symbol) => setSymbol(symbol)}
                setLocation={(location) => setLocation(location)}
              />
            }/>
          <Route path="/stock-app-fe/signup" element={<SignUp/>}/>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
