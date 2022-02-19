import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "./Base";
import AssignmentDetail from "./components/AssignmentDetail";
import Classroom from "./components/Classroom";
import Dashboard from './components/Dashboard'
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

function App() {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('is_auth')))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Navbar />
            <Routes>

              <Route path="/" element={<RequireAuth />} >
                <Route path='/' element={<Dashboard />} />
                <Route path='/classes/:code' element={<Base />} >
                  <Route index element={<Classroom />} />
                  <Route path='assignments/:assignment_id' element={<AssignmentDetail />} />
                </Route>
              </Route>

              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  )
}

export default App
