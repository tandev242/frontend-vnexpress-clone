import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const FeatureNewsCard = (props) => {
  const { hot_news, trending_new, editor_choice } = props;
  return (
    <>
      <div className="container">
        <div className="row">
          {hot_news ? (
            <div className="col-md-7" key={hot_news.id}>
              <div className="feature_article_wrapper">
                <div className="feature_article_img">
                  <img
                    style={{ height: 568.45, width: 652.5 }}
                    className="img-responsive top_static_article_img"
                    src={
                      hot_news.thumbnail_url
                        ? hot_news.thumbnail_url
                        : hot_news.thumbnail.startsWith(
                          "/media"
                        )
                          ? `http://localhost:8000${hot_news.thumbnail}`
                          : `http://localhost:8000/media/${hot_news.thumbnail}`
                    }
                    alt="feature-top"
                  />
                </div>
                {/* <!-- feature_article_img --> */}

                <div className="feature_article_inner">
                  <div className="tag_lg red">
                    <a href="category.html">Hot News</a>
                  </div>
                  <div className="feature_article_title">
                    <h1>
                      <Link to={`/post/${hot_news.slug}`}>
                        {hot_news.title}
                      </Link>
                    </h1>
                  </div>
                  {/* <!-- feature_article_title --> */}

                  <div className="feature_article_date">
                    <a href="#" target="_self">
                      {hot_news.author &&
                        hot_news.author.user.username}
                    </a>
                    ,{"         "}
                    <a>
                      {moment(hot_news.timestamp).format(
                        "Do MMM  YYYY"
                      )}
                    </a>
                  </div>
                  {/* <!-- feature_article_date --> */}

                  <div className="feature_article_content">
                    {hot_news.description.substring(0, 90)}
                    ...
                  </div>
                  {/* <!-- feature_article_content --> */}

                  <div className="article_social">
                    <span>
                      <i className="fa fa-share-alt"></i>
                      <a href="#">424</a>Shares
                    </span>
                    <span>
                      <i className="fa fa-comments-o"></i>
                      <a href="#">
                        {hot_news.total_comment_count}
                      </a>
                      Comments
                    </span>
                  </div>
                  {/* <!-- article_social --> */}
                </div>
                {/* <!-- feature_article_inner --> */}
              </div>
              {/* <!-- feature_article_wrapper --> */}
            </div>
          ) : (
            ""
          )}
          {trending_new ? (
            <div className="col-md-5" key={trending_new.id}>
              <div className="feature_static_wrapper">
                <div className="feature_article_img">
                  <img
                    style={{
                      height: 269.717,
                      width: 457.5,
                    }}
                    className="img-responsive"
                    src={
                      trending_new.thumbnail_url
                        ? trending_new.thumbnail_url
                        : trending_new.thumbnail.startsWith(
                          "/media"
                        )
                          ? `http://localhost:8000${trending_new.thumbnail}`
                          : `http://localhost:8000/media/${trending_new.thumbnail}`
                    }
                    alt="feature-top"
                  />
                </div>
                {/* <!-- feature_article_img --> */}

                <div className="feature_article_inner">
                  <div className="tag_lg purple">
                    <a href="category.html">Top Viewed</a>
                  </div>
                  <div className="feature_article_title">
                    <h1>
                      <Link
                        to={`/post/${trending_new.slug}`}
                      >
                        {trending_new.title}
                      </Link>
                    </h1>
                  </div>
                  {/* <!-- feature_article_title --> */}

                  <div className="feature_article_date">
                    <a href="#" target="_self">
                      {trending_new.author &&
                        trending_new.author.user
                          .username}
                    </a>
                    ,
                    <a href="#" target="_self">
                      {moment(
                        trending_new.timestamp
                      ).format("Do MMM  YYYY")}
                    </a>
                  </div>
                  {/* <!-- feature_article_date --> */}

                  <div className="feature_article_content">
                    {trending_new.description.substring(
                      0,
                      90
                    )}
                    ...
                  </div>
                  {/* <!-- feature_article_content --> */}

                  <div className="article_social">
                    <span>
                      <i className="fa fa-share-alt"></i>
                      <a href="#">424</a>Shares
                    </span>
                    <span>
                      <i className="fa fa-comments-o"></i>
                      <a href="#">
                        {
                          trending_new.total_comment_count
                        }
                      </a>
                      Comments
                    </span>
                  </div>
                  {/* <!-- article_social --> */}
                </div>
                {/* <!-- feature_article_inner --> */}
              </div>
              {/* <!-- feature_static_wrapper --> */}
            </div>
          ) : (
            ""
          )}
          {editor_choice ? (
            <div className="col-md-5" key={editor_choice.id}>
              <div className="feature_static_last_wrapper">
                <div className="feature_article_img">
                  <img
                    style={{
                      height: 269.717,
                      width: 457.5,
                    }}
                    className="img-responsive"
                    src={
                      editor_choice.thumbnail_url
                        ? editor_choice.thumbnail_url
                        : editor_choice.thumbnail.startsWith(
                          "/media"
                        )
                          ? `http://localhost:8000${editor_choice.thumbnail}`
                          : `http://localhost:8000/media/${editor_choice.thumbnail}`
                    }
                    alt="feature-top"
                  />
                </div>
                {/* <!-- feature_article_img --> */}

                <div className="feature_article_inner">
                  <div className="tag_lg blue">
                    <a href="category.html">Top Viewed</a>
                  </div>

                  <div className="feature_article_title">
                    <h1>
                      <Link
                        to={`/post/${editor_choice.slug}`}
                      >
                        {editor_choice.title}
                      </Link>
                    </h1>
                  </div>
                  {/* <!-- feature_article_title --> */}

                  <div className="feature_article_date">
                    <a href="#" target="_self">
                      {editor_choice.author &&
                        editor_choice.author.user
                          .username}
                    </a>
                    ,
                    <a href="#" target="_self">
                      {moment(
                        editor_choice.timestamp
                      ).format("Do MMM  YYYY")}
                    </a>
                  </div>
                  {/* <!-- feature_article_date --> */}

                  <div className="feature_article_content">
                    {editor_choice.description.substring(
                      0,
                      90
                    )}
                    ...
                  </div>
                  {/* <!-- feature_article_content --> */}

                  <div className="article_social">
                    <span>
                      <i className="fa fa-share-alt"></i>
                      <a href="#">424</a>Shares
                    </span>
                    <span>
                      <i className="fa fa-comments-o"></i>
                      <a href="#">
                        {
                          editor_choice.total_comment_count
                        }
                      </a>
                      Comments
                    </span>
                  </div>
                  {/* <!-- article_social --> */}
                </div>
                {/* <!-- feature_article_inner --> */}
              </div>
              {/* <!-- feature_static_wrapper --> */}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <!-- Row --> */}
      </div>
    </>
  );
};
