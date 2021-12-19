import React from "react";

export const Footer = () => {
    return (
        <>
            <section id="footer_section" className="footer_section">
                <div className="footer_bottom_Section">
                    <div className="container">
                        <div className="row">
                            <div className="footer">
                                <div className="col-sm-3">
                                    <div className="social">
                                        <a href="/facebook" className="icons-sm fb-ic">
                                            <i className="fa fa-facebook" />
                                        </a>
                                        {/*Twitter*/}
                                        <a href="/twitter" className="icons-sm tw-ic">
                                            <i className="fa fa-twitter" />
                                        </a>
                                        {/*Google +*/}
                                        <a href="/instagram" className="icons-sm inst-ic">
                                            <i className="fa fa-instagram"> </i>
                                        </a>
                                        {/*Linkedin*/}
                                        <a href="/twitterr" className="icons-sm tmb-ic">
                                            <i className="fa fa-tumblr"> </i>
                                        </a>
                                        {/*Pinterest*/}
                                        <a href="/twitterrr" className="icons-sm rss-ic">
                                            <i className="fa fa-rss"> </i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <p>VN EXPRESS 2021 </p>
                                </div>
                                <div className="col-sm-3">
                                    <p>MADE BY FSOFT TEAM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
