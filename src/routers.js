import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/index'
import CollectionsPage from './pages/CollectionsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import LoginPage from './pages/LoginPage'
import { useSelector } from 'react-redux'
import ResetPassword from './pages/ResetPassword'

const BaseRouter = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      {user && user.role === 'admin' && (
        <Route exact path="/registerAdmin" component={RegisterPage} />
      )}
      <Route exact path="/resetPassword/:token" component={ResetPassword} />
      <Route exact path="/forgotPassword" component={ForgotPasswordPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route
        path={[`/collections/:slug/:subSlug`, `/collections/:slug`]}
        exact
        component={CollectionsPage}
      />
      <Route path="/:slug" exact component={NewsDetailPage} />
    </Switch>
  )
}

export default BaseRouter
