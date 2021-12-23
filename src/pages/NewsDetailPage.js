import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SingleNewsCard } from "../components/skeletons/SingleNewsCard";
import { Sidebar } from "../components/skeletons/Sidebar";
import { Loading } from "../components/includes/Loading";
import { Comments } from "../components/includes/Comments";
import { CommentForm } from "../components/includes/CommentForm";
import { Link, useRouteMatch } from "react-router-dom";
import { getPostBySlug } from "../slices/postSlice";
import { useDispatch } from "react-redux"

export default function NewsDetailPage() {
    const dispatch = useDispatch();
    let match = useRouteMatch();
    const { slug } = match.params;
    const [post, setPost] = useState({});
    const [postComments, setPostComments] = useState([]);
    const [topicComments, setTopicComments] = useState([]);

    const { authenticated } = useSelector(state => state.auth);
    useEffect(() => {
        const fetchPostBySlug = async () => {
            const res = await dispatch(getPostBySlug(slug)).unwrap();
            setPost(res.data.post);
            setPostComments(res.data.postComments);
            setTopicComments(res.data.topicComments);
        }
        fetchPostBySlug();
    }, [slug])

    if (Object.keys(post).length === 0) {
        return <Loading />;
    }

    return (
        <section id="entity_section" className="entity_section">
            <div className="container">
                <div className="row">
                    {post && (
                        <div className="col-md-8">
                            <div className="entity_wrapper">
                                <SingleNewsCard news={post} />
                                {/* entity_content */}
                                <div className="entity_footer">
                                    {/* entity_tag */}
                                    <div className="entity_social">
                                        <span>
                                            <i className="fa fa-share-alt" />
                                            {topicComments.length} <a href="#">Bàn luận về chủ đề</a>
                                        </span>
                                        <span>
                                            <i className="fa fa-comments-o" />
                                            {postComments.length}
                                            <a href="#">{" "}Bàn luận về bài viết</a>
                                        </span>
                                    </div>
                                    {/* entity_social */}
                                </div>
                                {/* entity_footer */}
                            </div>

                            <div className="entity_comments">
                                <div className="entity_inner__title header_black">
                                    <h2>Thêm bình luận</h2>
                                </div>
                                {authenticated ? (
                                    <CommentForm
                                        news={post._id}
                                        slug={slug}
                                    />) : <p>
                                    Để bình luận về bài viết vui lòng <Link to="/login">Đăng nhập</Link>
                                </p>}
                            </div>
                            <div className="readers_comment">
                                {/* entity_title */}
                                {post ? (
                                    <Fragment>
                                        <div className="entity_inner__title header_purple">
                                            <h2>Bình luận [{postComments.length}]</h2>
                                        </div>
                                        <Comments comments={postComments} />
                                    </Fragment>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    )}
                    <Sidebar />
                    {/*Right Section*/}
                </div>
            </div>
            {/* container */}
        </section >
    );
}