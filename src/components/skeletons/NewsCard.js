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
                            src={
                                news.thumbnail_url
                                    ? news.thumbnail_url
                                    : news.thumbnail.startsWith("/media")
                                    ? `http://localhost:8000${news.thumbnail}`
                                    : `http://localhost:8000/media/${news.thumbnail}`
                            }
                            alt="feature-top"
                        />
                    </div>

                    <div class="entity_title">
                        <Link to={`/post/${news.slug}`}>
                            <h3> {news.title} </h3>
                        </Link>
                    </div>

                    <div class="entity_meta">
                        <a href="#">
                            {moment(news.timestamp).format("Do MMM  YYYY")}
                        </a>
                        , by:{" "}
                        <a href="#">
                            {news.author.user
                                ? news.author.user.username
                                : news.author}
                        </a>
                    </div>

                    <div class="entity_content">
                        {news.description.substring(0, 150)}...
                    </div>

                    <div class="entity_social">
                        <span>
                            <i class="fa fa-share-alt"></i>
                            424 <a href="#">Shares</a>{" "}
                        </span>
                        <span>
                            <i class="fa fa-comments-o"></i>
                            {news.total_comment_count} <a href="#"> Comments</a>{" "}
                        </span>
                    </div>
                </div>
            ) : (
                <div class="col-md-6">
                    <div
                        class="category_article_body"
                        style={{ marginBottom: 20 }}
                    >
                        <div class="top_article_img">
                            <img
                                class="img-fluid"
                                style={{
                                    width: 360,
                                    height: 250,
                                }}
                                src={
                                    news.thumbnail_url
                                        ? news.thumbnail_url
                                        : news.thumbnail.startsWith("/media")
                                        ? `http://localhost:8000${news.thumbnail}`
                                        : `http://localhost:8000/media/${news.thumbnail}`
                                }
                                alt="feature-top"
                            />
                        </div>

                        <div class="category_article_title">
                            <h5>
                                <Link to={`/post/${news.slug}`}>
                                    {news.title}{" "}
                                </Link>
                            </h5>
                        </div>

                        <div class="article_date">
                            <a href="#">
                                {moment(news.timestamp).format("Do MMM  YYYY")}
                            </a>
                            , by:{" "}
                            <a href="#">
                                {" "}
                                {news.author.user
                                    ? news.author.user.username
                                    : news.author}
                            </a>
                        </div>

                        <div class="category_article_content">
                            {news.description.substring(0, 150)}...
                        </div>

                        <div class="article_social">
                            <span>
                                <a href="#">
                                    <i class="fa fa-share-alt"></i>
                                    424{" "}
                                </a>{" "}
                                Shares
                            </span>
                            <span>
                                <i class="fa fa-comments-o"></i>
                                <a href="#"> {news.total_comment_count}</a>{" "}
                                Comments
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};
