import React, { Fragment, useState } from "react";
import { TagItemSkeleton } from "../components/skeletons/TagItemSkeleton";
import { RelatedNews } from "../components/skeletons/RelatedNews";
import { SingleNewsCard } from "../components/skeletons/SingleNewsCard";
import { Sidebar } from "../components/skeletons/Sidebar";
import { Loading } from "../components/includes/Loading";
import { Comments } from "../components/includes/Comments";
import { CommentForm } from "../components/includes/CommentForm";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";

// Cho nay de data mau khi minh co data duoi db thi sua lai
import SideBarData from "../data/sideBarData";
import SingleNews from "../data/singleNews";


export default function NewsDetailPage(props) {
    const news = SingleNews;
    const isLoading = false;
    const isAuthenticated = false;
    const { popular_news, most_commented } = SideBarData;
    const comments = [
        {
            "id": 562,
            "user": {
                "username": "aditya350"
            },
            "replies": [],
            "comment": "qwe",
            "timestamp": "2021-12-09T14:18:18.741840Z",
            "post": 2
        },
        {
            "id": 518,
            "user": {
                "username": "sany607"
            },
            "replies": [],
            "comment": "ss",
            "timestamp": "2021-11-24T10:39:14.680097Z",
            "post": 2
        },
        {
            "id": 517,
            "user": {
                "username": "sany607"
            },
            "replies": [],
            "comment": "sa",
            "timestamp": "2021-11-24T10:38:57.398310Z",
            "post": 2
        }
    ]
    if (isLoading === true) {
        return <Loading />;
    } else {
        return (
            <section id="entity_section" className="entity_section">
                <div className="container">
                    <div className="row">
                        {news && (
                            <div className="col-md-8">
                                <div className="entity_wrapper">
                                    <SingleNewsCard news={news} />
                                    {/* entity_content */}
                                    <div className="entity_footer">
                                        <div className="entity_tag">
                                            {news.tags ? (
                                                <TagItemSkeleton tag={news.tags} css={""} />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        {/* entity_tag */}
                                        <div className="entity_social">
                                            <span>
                                                <i className="fa fa-share-alt" />
                                                424 <a href="#">Shares</a>
                                            </span>
                                            <span>
                                                <i className="fa fa-comments-o" />
                                                {news.total_comment_count}
                                                <a href="#">Comments</a>
                                            </span>
                                        </div>
                                        {/* entity_social */}
                                    </div>
                                    {/* entity_footer */}
                                </div>

                                <div className="related_news">
                                    <div className="entity_inner__title header_purple">
                                        <h2>Related Post</h2>
                                    </div>
                                    {/* entity_title */}
                                    <div className="row">
                                        <RelatedNews
                                            related_post={news.related_post}
                                            setSlug={(slug, newsId) =>
                                                this.setState({
                                                    slug: slug,
                                                    newsId: newsId,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                {/* Related news */}

                                <div className="entity_comments">
                                    <div className="entity_inner__title header_black">
                                        <h2>Add a Comment</h2>
                                    </div>
                                    {isAuthenticated ? (
                                        <CommentForm
                                            news={news.id}
                                            slug={props.match.params.slug}
                                        />) : <p>
                                        Want to make comment ? Please <Link to="/login">Sign In</Link>
                                    </p>}
                                </div>
                                <div className="readers_comment">
                                    {/* entity_title */}
                                    {news ? (
                                        <Fragment>
                                            <div className="entity_inner__title header_purple">
                                                <h2>Readers Comment</h2>
                                            </div>

                                            <Comments comments={comments} />
                                        </Fragment>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        )}
                        {popular_news && (
                            <Sidebar
                                popular_news={popular_news}
                                most_commented_news={most_commented}
                            />
                        )}
                        {/*Right Section*/}
                    </div>
                </div>
                {/* container */}
            </section>
        );
    }
}