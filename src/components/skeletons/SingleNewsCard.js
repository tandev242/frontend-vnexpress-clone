import React from "react";
import moment from "moment";
export const SingleNewsCard = (props) => {
    const { news } = props;
    return (
        <>
            <div className="entity_title">
                <h1>
                    <a href="#">{news.title}</a>
                </h1>
            </div>
            {/* entity_title */}
            <div className="entity_meta">
                <a href="#" target="_self">
                    {moment(news.timestamp).format("Do MMM  YYYY")}
                </a>
                , by:
                <a href="#" target="_self">
                    {news.author && news.author.user.username}
                </a>
            </div>
            {/* entity_meta */}
            <div className="entity_rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-full" />
            </div>
            {/* entity_rating */}
            <div className="entity_social">
                <a href="#" className="icons-sm sh-ic">
                    <i className="fa fa-share-alt" />
                    <b>424</b> <span className="share_ic">Shares</span>
                </a>
                <a href="#" className="icons-sm fb-ic">
                    <i className="fa fa-facebook" />
                </a>
                {/*Twitter*/}
                <a href="#" className="icons-sm tw-ic">
                    <i className="fa fa-twitter" />
                </a>
                {/*Google +*/}
                <a href="#" className="icons-sm inst-ic">
                    <i className="fa fa-google-plus"> </i>
                </a>
                {/*Linkedin*/}
                <a href="#" className="icons-sm tmb-ic">
                    <i className="fa fa-ge"> </i>
                </a>
                {/*Pinterest*/}
                <a href="#" className="icons-sm rss-ic">
                    <i className="fa fa-rss"> </i>
                </a>
            </div>
            {/* entity_social */}
            <div className="entity_thumb">
                <img
                    className="img-responsive"
                    src={news.thumbnail_url ? news.thumbnail_url : news.thumbnail}
                    alt="feature-top"
                />
            </div>
            {/* entity_thumb */}
            <div className="entity_content">
                <p>{news.description}</p>
            </div>
        </>
    );
};
