import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

export const NewsCard = (props) => {
    const { news, index } = props;
    return (
        <Fragment>
            {index === 0 ? (
                <div
                    class="entity_wrapper"
                    style={{
                        marginLeft: 17,
                    }}
                >
                    <div class="entity_thumb">
                        <img
                            class="img-responsive"
                            style={{
                                width: 775,
                                maxHeight: 450,
                            }}
                            src={news.thumbnailUrl}
                            alt="feature-top"
                        />
                    </div>

                    <div class="entity_title">
                        <Link to={`/${news.slug}`}>
                            <h3> {news.title} </h3>
                        </Link>
                    </div>

                    <div class="entity_meta">
                        <a href="#">
                            {moment(news.createdAt).format(
                                "HH:mm [ngày] DD [tháng] MM"
                            )}
                        </a>
                        , by:{" "}
                        <a href="#">
                            Tan Tran
                        </a>
                    </div>

                    <div class="entity_content">
                        {news.lead}
                    </div>
                </div>
            ) : (
                <div class="col-md-6">
                    <div
                        class="category_article_body"
                        style={{ marginBottom: 30 }}
                    >
                        <div class="top_article_img">
                            <img
                                class="img-fluid"
                                style={{
                                    width: 360,
                                    height: 250,
                                }}
                                src={news.thumbnailUrl}
                                alt="feature-top"
                            />
                        </div>

                        <div class="category_article_title">
                            <h5>
                                <Link to={`/${news.slug}`}>
                                    {news.title}{" "}
                                </Link>
                            </h5>
                        </div>

                        <div class="article_date">
                            <a href="#">
                                {moment(news.createdAt).format("Do MMM  YYYY")}
                            </a>
                            , by:{" "}
                            <a href="#">
                                {" "}
                                Tan Tran
                            </a>
                        </div>

                        <div class="category_article_content">
                            {news.lead}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};
