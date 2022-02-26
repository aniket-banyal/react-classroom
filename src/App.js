import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "./components/Base";
import AssignmentDetail from "./components/Assignment/AssignmentDetail";
import AnnouncementsTab from "./components/Announcement/AnnouncementsTab";
import Home from './components/Home'
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import Submissions from "./components/Submission/Teacher/Submissions";
import AssignmentDetailAndSubmissionBase from "./components/Assignment/AssignmentDetailAndSubmissionBase";
import PeopleTab from "./components/People/PeopleTab";
import AssignmentsTab from "./components/Assignment/AssignmentsTab";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


function App() {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('is_auth')))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const queryClient = new QueryClient()


  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <UserContext.Provider value={{ user, setUser }}>
            <QueryClientProvider client={queryClient}>
              {isAuth && <Navbar />}
              <Routes>

                <Route path="/" element={<RequireAuth />} >
                  <Route index element={<Home />} />
                  <Route path=':code' element={<Base />}>

                    <Route path='dashboard' element={<Dashboard />} >
                      <Route index element={<AnnouncementsTab />} />
                      <Route path='assignments' element={<AssignmentsTab />} />
                      <Route path='people' element={<PeopleTab />} />
                    </Route>

                    <Route path='assignments/:assignment_id' element={<AssignmentDetailAndSubmissionBase />} >
                      <Route index element={<AssignmentDetail />} />
                      <Route path='submissions' element={<Submissions />} />
                    </Route>
                  </Route>
                </Route>

                <Route path="/login" element={<LoginPage />} />
              </Routes>

              <ReactQueryDevtools initialIsOpen={false} />

            </QueryClientProvider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  )
}

export default App
