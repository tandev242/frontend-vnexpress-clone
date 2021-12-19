import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail({ email: "" });
    };
    return (
        <section id="subscribe_section" className="subscribe_section">
            <div className="row">
                <ToastContainer />
                <form onSubmit={handleSubmit} method="post" className="form-horizontal">
                    <div className="form-group form-group-lg">
                        <label className="col-sm-6 control-label" for="formGroupInputLarge">
                            <h1>
                                <span className="red-color">Sign up </span>
                                for the latest news
                            </h1>
                        </label>

                        <div className="col-sm-3">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email.email}
                                className="form-control input-lg"
                                required
                                onChange={onChangeEmail}
                            />
                        </div>

                        <div className="col-sm-1">
                            {/* <input
                                type="submit"
                                value="Submit"
                                className="btn btn-large pink"
                            /> */}
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-large pink"
                            // disabled={!isLoading}
                            >
                                Submit
                            </button>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </form>
            </div>
        </section>
    );
};
