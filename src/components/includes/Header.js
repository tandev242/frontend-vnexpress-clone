import React, { Fragment } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import LOGO from '../../assets/images/logo-vnexpress.png'
import { authAction } from '../../slices/authSlice'

export const Header = () => {
  const { categories } = useSelector((state) => state.post)
  const { user, authenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const HandleLogout = () => {
    dispatch(authAction.logout())
    history.push('/')
  }

  return (
    <section id="header_section_wrapper" className="header_section_wrapper">
      <div className="container">
        <div className="header-section">
          <div className="row">
            <div className="col-md-4">
              <div className="left_section">
                <span className="date">{moment().format('dddd')} .</span>
                {/* <!-- Date --> */}
                <span className="time">{moment().format('D MMMM , YYYY')}</span>
                {/* <!-- Time --> */}
                <div className="social">
                  <a href="/#" className="icons-sm fb-ic">
                    <i className="fa fa-facebook"></i>
                  </a>
                  {/* <!--Twitter--> */}
                  <a href="/#" className="icons-sm tw-ic">
                    <i className="fa fa-twitter"></i>
                  </a>
                  {/* <!--Google +--> */}
                  <a href="/#" className="icons-sm inst-ic">
                    <i className="fa fa-instagram"> </i>
                  </a>
                  {/* <!--Linkedin--> */}
                  <a href="/#" className="icons-sm tmb-ic">
                    <i className="fa fa-tumblr"> </i>
                  </a>
                  {/* <!--Pinterest--> */}
                  <a href="/#" className="icons-sm rss-ic">
                    <i className="fa fa-rss"> </i>
                  </a>
                </div>
                {/* <!-- Top Social Section --> */}
              </div>
              {/* <!-- Left Header Section --> */}
            </div>
            <div className="col-md-4">
              <div className="logo">
                <Link exact to="/">
                  <img
                    style={{
                      width: 400,
                      height: 60,
                      objectFit: 'cover',
                    }}
                    src={LOGO}
                    alt="VN Express"
                  />
                </Link>
              </div>
              {/* <!-- Logo Section --> */}
            </div>
            <div className="col-md-4">
              <div className="right_section">
                <ul className="nav navbar-nav">
                  {!authenticated && (
                    <Fragment>
                      <li style={{ marginBottom: 2 }}>
                        <Link to="/login">Login</Link>
                      </li>
                      <li style={{ marginBottom: 2 }}>
                        <Link to="/register">Register</Link>
                      </li>
                    </Fragment>
                  )}
                  {authenticated && user && (
                    <Fragment>
                      <li className="dropdown lang">
                        <li style={{ marginTop: 1, marginRight: 10 }}>
                          <span>
                            <img className="avatar" src={user.avatar} />
                          </span>{' '}
                          <span style={{ marginLeft: 5 }}>
                            {user.name.toUpperCase()}
                          </span>
                        </li>
                        <ul className="dropdown-menu">
                          <li
                            className="btn logout"
                            onClick={HandleLogout}
                            style={{ cursor: 'pointer', padding: "5px 25px", color: "#A0224F" }}
                          >
                            Log out
                          </li>
                          {user.role === 'admin' && (
                            <Link to="/registerAdmin">
                              {' '}
                              register for Admin{' '}
                            </Link>
                          )}
                        </ul>
                      </li>
                    </Fragment>
                  )}
                </ul>
                {/* <!-- Language Section --> */}

                <ul className="nav-cta hidden-xs">
                  <li className="dropdown">
                    <a
                      href="/#"
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <div className="head-search">
                          <form action="">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Type Something"
                              />
                              <span className="input-group-btn">
                                <button
                                  type="submit"
                                  classname="btn btn-primary"
                                  style={{ width: '40px' }}
                                >
                                  Search
                                </button>
                              </span>
                            </div>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* <!-- Search Section --> */}
              </div>
              {/* <!-- Right Header Section --> */}
            </div>
          </div>
        </div>
        {/* <!-- Header Section --> */}
        <div className="navigation-section">
          <nav className="navbar m-menu navbar-default">
            <div className="container">
              {/* <!-- Brand and toggle get grouped for better mobile display --> */}
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse-1"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div
                className="collapse navbar-collapse category"
                id="#navbar-collapse-1"
              >
                <ul className="nav navbar-nav main-nav">
                  <li className="active">
                    <NavLink
                      to="/"
                      style={{ color: 'red', textDecoration: 'none' }}
                    >
                      Trang chủ
                    </NavLink>
                  </li>
                  {categories.map((category) => (
                    <li className="dropdown">
                      <NavLink
                        to={`/collections${category.slug}`}
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {category.name}
                      </NavLink>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {category.children.map((child) => (
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to={`/collections${child.slug}`}
                            >
                              {child.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <!-- .navbar-collapse --> */}
            </div>
            {/* <!-- .container --> */}
          </nav>
          {/* <!-- .nav --> */}
        </div>
        {/* <!-- .navigation-section --> */}
      </div>
      {/* <!-- .container --> */}
    </section>
  )
}
