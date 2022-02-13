import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./context/AuthContext";

function App() {
  console.log('App')
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('is_auth')))
  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <Navbar />
          <Routes>

            <Route path="/" element={<RequireAuth />} >
              <Route path='/' element={<Dashboard />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthContext.Provider>
      </Router>
    </div>
  )
}

export default App
