import React, { useEffect } from "react";
import BaseRouter from "./routers";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/includes/Header";
import { Footer } from "./components/includes/Footer";
import { createBrowserHistory } from 'history';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getListCategory, getAllPosts, getLastPosts } from "./slices/postSlice";

const history = createBrowserHistory();

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListCategory());
        dispatch(getAllPosts());
        dispatch(getLastPosts());
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
    );
}

export default App;
