import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "./components/Base";
import AssignmentDetail from "./components/Assignment/AssignmentDetail";
import Classroom from "./components/Classroom";
import Home from './components/Home'
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import Submissions from "./components/Submission/Teacher/Submissions";
import AssignmentDetailAndSubmissionBase from "./components/Assignment/AssignmentDetailAndSubmissionBase";
import StudentsTab from "./components/Student/StudentsTab";
import AssignmentsTab from "./components/Assignment/AssignmentsTab";
import Dashboard from "./components/Dashboard";
import { ClassroomsContext } from "./context/ClassroomsContext";


function App() {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('is_auth')))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    const fetchClassroomList = async () => {
      const options = {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'content-Type': 'application/json',
        }),
      }

      const response = await fetch('http://localhost:8000/api/classes', options)
      const data = await response.json()
      setClassrooms(data)
    }
    if (isAuth)
      fetchClassroomList()
  }, [isAuth])


  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <UserContext.Provider value={{ user, setUser }}>
            <ClassroomsContext.Provider value={classrooms}>
              {isAuth && <Navbar />}
              <Routes>

                <Route path="/" element={<RequireAuth />} >
                  <Route index element={<Home />} />
                  <Route path=':code' element={<Base />}>

                    <Route path='dashboard' element={<Dashboard />} >
                      <Route index element={<Classroom />} />
                      <Route path='assignments' element={<AssignmentsTab />} />
                      <Route path='students' element={<StudentsTab />} />
                    </Route>

                    <Route path='assignments/:assignment_id' element={<AssignmentDetailAndSubmissionBase />} >
                      <Route index element={<AssignmentDetail />} />
                      <Route path='submissions' element={<Submissions />} />
                    </Route>
                  </Route>
                </Route>

                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </ClassroomsContext.Provider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  )
}

export default App
