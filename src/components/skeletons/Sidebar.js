import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

export const Sidebar = () => {
    const { posts } = useSelector(state => state.post);
    const popularNews = posts.slice(0, 5)
    const mostCommented = posts.slice(25, 30)

    return (
        <Fragment>
            <div className="col-md-4">
                <div className="widget">
                    <div className="widget_title widget_black">
                        <h2>
                            <a href="#">Tin phổ biến</a>
                        </h2>
                    </div>
                    {popularNews &&
                        popularNews.map((news) => {
                            return (
                                <div className="media" key={news._id}>
                                    <div className="media-left">
                                        <Link
                                            to={`/${news.slug}`}
                                        >
                                            <img
                                                style={{
                                                    height: 100,
                                                    width: 100,
                                                    objectFit: "cover"
                                                }}
                                                className="media-object"
                                                src={news.thumbnailUrl}
                                                alt="Generic placeholder image"
                                            />
                                        </Link>
                                    </div>
                                    <div className="media-body">
                                        <h3 className="media-heading">
                                            <Link
                                                to={`/${news.slug}`}
                                            >
                                                {news.title}
                                            </Link>
                                        </h3>
                                        <div className="category_article_content sidebar">
                                            {news.lead}
                                            ...
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <p className="widget_divider">
                        <a href="#" target="_self">
                            Xem thêm&nbsp;&raquo;
                        </a>
                    </p>
                </div>

                <div className="widget m30">
                    <div className="widget_title widget_black">
                        <h2>
                            <a href="#">Nhiều bình luận</a>
                        </h2>
                    </div>
                    {mostCommented &&
                        mostCommented.map((news) => {
                            return (
                                <div className="media" key={news._id}>
                                    <div className="media-left">
                                        <Link
                                            to={`/${news.slug}`}
                                        >
                                            <img
                                                style={{
                                                    height: 100,
                                                    width: 100,
                                                    objectFit: "cover"
                                                }}
                                                className="media-object"
                                                src={news.thumbnailUrl}
                                                alt="Generic placeholder image"
                                            />
                                        </Link>
                                    </div>
                                    <div className="media-body">
                                        <h3 className="media-heading">
                                            <Link
                                                to={`/${news.slug}`}
                                            >
                                                {news.title}
                                            </Link>
                                        </h3>
                                        <div className="category_article_content sidebar">
                                            {news.lead}
                                            ...
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Fragment>
    );
};
