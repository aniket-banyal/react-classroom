import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "../components/Base";
import AssignmentDetail from "../components/Assignment/AssignmentDetail";
import AnnouncementsTab from "../components/Announcement/AnnouncementsTab";
import Home from '../components/HomePage/Home'
import LoginPage from "../components/LoginPage";
import RequireAuth from "../components/RequireAuth";
import { AuthContext } from "../context/AuthContext";
import Submissions from "../components/Submission/Teacher/Submissions";
import AssignmentDetailAndSubmissionBase from "../components/Assignment/AssignmentDetailAndSubmissionBase";
import PeopleTab from "../components/People/PeopleTab";
import AssignmentsTab from "../components/Assignment/AssignmentsTab";
import ClassroomDashboard from "../components/ClassroomDashboard";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'react-hot-toast'
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import StudentSubmissions from "../components/StudentSubmissions";
import Todo from "../components/Todo";
import ToReview from "../components/ToReview";


const queryClient = new QueryClient()

function App() {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('is_auth')))
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        }}
      />

      <Router>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <QueryClientProvider client={queryClient}>

            <Routes>
              <Route path="/" element={<RequireAuth />} >
                <Route index element={<Home />} />
                <Route path='todo' element={<Todo />} />
                <Route path='toreview' element={<ToReview />} />
                <Route path=':code' element={<Base />}>

                  <Route path='dashboard' element={<ClassroomDashboard />} >
                    <Route index element={<AnnouncementsTab />} />
                    <Route path='assignments' element={<AssignmentsTab />} />
                    <Route path='people' element={<PeopleTab />} />
                  </Route>

                  <Route path='assignments/:assignmentId' element={<AssignmentDetailAndSubmissionBase />} >
                    <Route index element={<AssignmentDetail />} />
                    <Route path='submissions' element={<Submissions />} />
                    <Route path='submissions/:studentId' element={<Submissions />} />
                  </Route>

                  <Route path='students/:studentId' element={<StudentSubmissions />} />

                </Route>
              </Route>

              <Route path="/login" element={<LoginPage />} />
            </Routes>

            <ReactQueryDevtools initialIsOpen={false} />

          </QueryClientProvider>
        </AuthContext.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
