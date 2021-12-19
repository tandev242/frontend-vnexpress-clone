import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import LOGO from '../../assets/images/logo-vnexpress.png';

export const Header = () => {

    const isAuthenticated = false;
    const user = null;

    const HandleLogout = () => {

    };

    return (
        <section id="header_section_wrapper" className="header_section_wrapper">
            <div className="container">
                <div className="header-section">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="left_section">
                                <span className="date">{moment().format("dddd")} .</span>
                                {/* <!-- Date --> */}
                                <span className="time">{moment().format("D MMMM , YYYY")}</span>
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
                                            objectFit: 'cover'
                                        }}
                                        src= {LOGO}
                                        alt="VN Express"
                                    />
                                </Link>
                            </div>
                            {/* <!-- Logo Section --> */}
                        </div>
                        <div className="col-md-4">
                            <div className="right_section">
                                <ul className="nav navbar-nav">
                                    {!isAuthenticated && (
                                        <Fragment>
                                            <li style={{ marginBottom: 2 }}>
                                                <Link to="/login">Login</Link>
                                            </li>
                                            <li style={{ marginBottom: 2 }}>
                                                <Link to="/register">Register</Link>
                                            </li>
                                        </Fragment>
                                    )}
                                    {isAuthenticated && user.user && (
                                        <Fragment>
                                            <li className="dropdown lang">
                                                <li style={{ marginTop: 1, marginRight: 10 }}>Wellcome <span style={{ marginLeft: 5 }}>{user.user.username.toUpperCase()}</span></li>
                                                <ul className="dropdown-menu">
                                                    <li
                                                        onClick={HandleLogout}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        Logout
                                                    </li>
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
                                                            <span className="input-group-btn" >
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
                            <div className="collapse navbar-collapse" id="#navbar-collapse-1">
                                <ul className="nav navbar-nav main-nav">
                                    <li className="active">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/category/dsadsa">News</Link>
                                    </li>
                                    <li>
                                        <Link to="/category/dsadsa">Mobile</Link>
                                    </li>
                                    <li>
                                        <Link to="/category/dsadsa">Tablet</Link>
                                    </li>
                                    <li>
                                        <Link to="/category/dsadsa">Gadgets</Link>
                                    </li>
                                    <li>
                                        <Link to="/category/dsadsa">CyberLink</Link>
                                    </li>
                                    <li>
                                        <Link to="/category/dsadsa">Design</Link>
                                    </li>
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
