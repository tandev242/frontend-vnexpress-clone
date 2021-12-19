import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export const RelatedNews = (props) => {
    const { related_post, setSlug } = props;
    return (
        <>
            {related_post &&
                related_post.map((news) => {
                    return (
                        <div className="col-md-6 s" key={news.id}>
                            <div className="media">
                                <div className="media-left">
                                    <a href="#">
                                        <img
                                            style={{
                                                height: 118,
                                                width: 100,
                                            }}
                                            className="media-object"
                                            src={
                                                news.thumbnail_url
                                                    ? news.thumbnail_url
                                                    : news.thumbnail.startsWith(
                                                          "/media"
                                                      )
                                                    ? `http://localhost:8000${news.thumbnail}`
                                                    : `http://localhost:8000/media/${news.thumbnail}`
                                            }
                                            alt="Generic placeholder image"
                                        />
                                    </a>
                                </div>
                                <div className="media-body">
                                    <span className="tag purple">
                                        <a href="category.html" target="_self">
                                            Mobile
                                        </a>
                                    </span>
                                    <h3 className="media-heading">
                                        <Link
                                            onClick={() =>
                                                setSlug(news.slug, news.id)
                                            }
                                            to={`/post/${news.slug}/`}
                                        >
                                            {news.title}
                                        </Link>
                                    </h3>
                                    <span className="media-date">
                                        <a href="#">
                                            {moment(news.timestamp).format(
                                                "Do MMM  YYYY"
                                            )}
                                        </a>
                                        {/* , by:{" "}
                                        {/* <a href="#">
                                            {news.author &&
                                                news.author.user.username}
                                        </a> */}
                                    </span>
                                    <div className="media_social">
                                        <span>
                                            <a href="#">
                                                <i className="fa fa-share-alt" />
                                                424
                                            </a>{" "}
                                            Shares
                                        </span>
                                        <span>
                                            <a href="#">
                                                <i className="fa fa-comments-o" />
                                                {news.total_comment_count}
                                            </a>{" "}
                                            Comments
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};
