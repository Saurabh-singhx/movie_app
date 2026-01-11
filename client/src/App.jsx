import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminHomePage from './pages/AdminHomePage'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/authStore'
import Signup from './components/Signup'
import UserHomePage from './pages/UserHomePage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MovieView from './pages/MovieView'
import CreateMovie from './pages/CreateMovie'
import EditMovie from './pages/EditMovie'

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])


  if (isCheckingAuth) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <CircularProgress size={50} />
        </Box>
      </div>

    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? (
          <>
            <Navbar />
            {authUser.role === "USER" ? (
              <UserHomePage />
            ) : authUser.role === "ADMIN" ? (
              <AdminHomePage />
            ) : (
              <Navigate to="/login" />
            )}
          </>
        ) : (
          <Navigate to="/login" />
        )
        }
        />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/movieview" element={authUser ? <MovieView/> : <Navigate to="/" />} />
        <Route path="/createmovie" element={authUser?.role ==='ADMIN' ? <CreateMovie/> : <Navigate to="/" />} />
        <Route path="/editmovie" element={authUser?.role ==='ADMIN' ? <EditMovie/> : <Navigate to="/" />} />


      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  )
}

export default App
