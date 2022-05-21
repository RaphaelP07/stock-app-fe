import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path="/stock-app-fe/login"
            element={
              <Login/>
            }
          />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
