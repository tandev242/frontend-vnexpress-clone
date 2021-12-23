import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/Index'
import CollectionsPage from './pages/CollectionsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
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
