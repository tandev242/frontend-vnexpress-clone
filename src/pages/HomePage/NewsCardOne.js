import React from "react";
import { Link } from "react-router-dom";
import { TagItemSkeleton } from "../../components/skeletons/TagItemSkeleton";
import { MoreNewsSkeleton } from "../../components/skeletons/MoreNewsButtonSkeleton";
import moment from "moment";

export const NewsCardOne = (props) => {
    const { newsList } = props;

    return (
        <>
            {newsList.map((news, index) => {
                return (
                    <div key={index}>
                        {index === 0 ? (
                            <div className="article_title header_pink">
                                <h2>
                                    <Link
                                        to={`/${news.categoryId.slug}`}
                                    >
                                        {news.categoryId.name}
                                    </Link>
                                </h2>
                            </div>
                        ) : (
                            ""
                        )}

                        <div
                            className="col-md-6"
                            style={{
                                marginBottom: "15px",
                            }}
                        >
                            <div
                                className="category_article_body"
                                key={news._id}
                            >
                                <div className="top_article_img">
                                    <Link to={`/${news.slug}`}>
                                        <img
                                            style={{
                                                height: 279,
                                                width: 345,
                                            }}
                                            className="img-responsive"
                                            src={news.thumbnailUrl}
                                            alt="feature-top"
                                        />
                                    </Link>
                                </div>
                                <div className="category_article_title">
                                    <h2>
                                        <Link to={`/${news.slug}`}>
                                            {news.title}
                                        </Link>
                                    </h2>
                                </div>

                                <div className="category_article_date">
                                    <a href="#">
                                        {moment(news.createdAt).format(
                                            "HH:mm [ngày] DD [tháng] MM"
                                        )}
                                    </a>
                                </div>

                                <div className="category_article_content">
                                    {news.lead}
                                    ...
                                </div>
                            </div>
                        </div>
                        <MoreNewsSkeleton
                            news={newsList}
                            index={index}
                            slug={news.categoryId.slug}
                        />
                    </div>
                );
            })}
        </>
    );
};
