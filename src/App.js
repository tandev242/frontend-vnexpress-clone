import React, { useEffect } from 'react'
import BaseRouter from './routers'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/includes/Header'
import { Footer } from './components/includes/Footer'
import { createBrowserHistory } from 'history'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { getListCategory, getAllPosts, getLastPosts } from './slices/postSlice'
import { getCurrentUser } from './slices/authSlice'

const history = createBrowserHistory()

function App() {
  // window.localStorage.setItem(
  //   'token',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNWJlNjIwNmY4M2UyZGNjZTA4YjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDAwOTgzNTF9.UNr8DQFYoxtvWJo6yOyLnit5BrN_M4iFJWo0j67-1sI'
  // )
  const dispatch = useDispatch()
  useEffect(() => {
    const loadUser = async () => {
      await dispatch(getCurrentUser())
    }
    if (!window.localStorage.getItem('token')) {
      return
    } else {
      loadUser()
    }
  }, [])

  useEffect(() => {
    dispatch(getListCategory())
    dispatch(getAllPosts())
    dispatch(getLastPosts())
  }, [])

  return (
    <Router history={history}>
      <div id="main-wrapper">
        <ToastContainer />;
        <Header />
        <BaseRouter />
        <Footer />
      </div>
    </Router>
  )
}

export default App
