import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Loading } from "../components/includes/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function LoginPage() {
    const [userData, setUser] = useState({
        username: "",
        email: "",
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(loginUser(userData));
        // setUser({ [e.target.name]: "" });
    };
    const onChange = (e) => {
        setUser({ ...userData, [e.target.name]: e.target.value });
    };

    if (isLoading === true) {
        return <Loading />;
    }
    return (
        <section id="subscribe_section" className="subscribe_section">

            <div className="row">
                <ToastContainer />
                <div className="col-md-6 col-md-offset-3">
                    <div className="entity_comment_from">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group comment">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input
                                        onChange={onChange}
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="User Name"
                                        value={userData.username}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        onChange={onChange}
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={userData.password}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-flat m-b-30 m-t-30"
                                >
                                    {isLoading ? (
                                        <Fragment>
                                            <i className="fa fa-spinner fa-spin" /> Loading
                                        </Fragment>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                                <div className="register-link m-t-15 text-center">
                                    <p>
                                        Did Not have account ? <Link to="/register">Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
