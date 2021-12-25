import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const FeatureNewsCard = (props) => {
  const { hotNews, trendingNews, editorChoice } = props;
  return (
    <>
      <div className="container">
        <div className="row">
          {hotNews ? (
            <div className="col-md-7" key={hotNews._id}>
              <div className="feature_article_wrapper">
                <div className="feature_article_img">
                  <img
                    style={{ height: 568.45, width: 652.5, objectFit: "cover" }}
                    className="img-responsive top_static_article_img"
                    src={hotNews.thumbnailUrl}
                    alt="feature-top"
                  />
                </div>
                {/* <!-- feature_article_img --> */}

                <div className="feature_article_inner">
                  <div className="tag_lg red">
                    <a href="category.html">Tin nóng</a>
                  </div>
                  <div className="feature_article_title">
                    <h1>
                      <Link to={`/${hotNews.slug}`}>
                        {hotNews.title}
                      </Link>
                    </h1>
                  </div>
                  {/* <!-- feature_article_title --> */}

                  <div className="feature_article_content">
                    {hotNews.lead}
                    ...
                  </div>
                  {/* <!-- feature_article_content --> */}
                </div>
                {/* <!-- feature_article_inner --> */}
              </div>
              {/* <!-- feature_article_wrapper --> */}
            </div>
          ) : (
            ""
          )}
          {trendingNews ? (
            <div className="col-md-5" key={trendingNews._id}>
              <div className="feature_static_wrapper">
                <div className="feature_article_img">
                  <img
                    style={{
                      height: 269.717,
                      width: 457.5,
                      objectFit: "cover"
                    }}
                    className="img-responsive"
                    src={trendingNews.thumbnailUrl}
                    alt="feature-top"
                  />
                </div>
                {/* <!-- feature_article_img --> */}

                <div className="feature_article_inner">
                  <div className="tag_lg purple">
                    <a href="category.html">Đáng chú ý</a>
                  </div>
                  <div className="feature_article_title">
                    <h1>
                      <Link
                        to={`/${trendingNews.slug}`}
                      >
                        {trendingNews.title}
                      </Link>
                    </h1>
                  </div>
                  {/* <!-- feature_article_title --> */}
                  <div className="feature_article_content">
                    {trendingNews.lead}
                    ...
                  </div>
                  {/* <!-- feature_article_content --> */}
                  {/* <!-- article_social --> */}
                </div>
                {/* <!-- feature_article_inner --> */}
              </div>
              {/* <!-- feature_static_wrapper --> */}
            </div>
          ) : (
            ""
          )}
          {editorChoice ? (
            <div className="col-md-5" key={editorChoice._id}>
              <div className="feature_static_last_wrapper">
                <div className="feature_article_img">
                  <img
                    style={{
                      height: 269.717,
                      width: 457.5,
                      objectFit: "cover"
                    }}
                    className="img-responsive"
                    src={editorChoice.thumbnailUrl}
                    alt="feature-top"
                  />
                </div>
                {/* <!-- feature_article_img --> */}

                <div className="feature_article_inner">
                  <div className="tag_lg blue">
                    <a href="category.html">Đáng chú ý</a>
                  </div>

                  <div className="feature_article_title">
                    <h1>
                      <Link
                        to={`/${editorChoice.slug}`}
                      >
                        {editorChoice.title}
                      </Link>
                    </h1>
                  </div>
                  {/* <!-- feature_article_title --> */}
                  <div className="feature_article_content">
                    {editorChoice.lead}
                    ...
                  </div>
                  {/* <!-- feature_article_content --> */}
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
