import React, { Fragment } from "react";

export const Comments = (props) => {
    const { comments } = props;
    return (
        <Fragment>
            {comments &&
                comments.map((comment) => {
                    return (
                        <div className="media">
                            <div className="media-left">
                                <a href="#">
                                    <div
                                        data-initials={
                                            comment.user &&
                                            comment.user.username.substring(0, 2).toUpperCase()
                                        }
                                    ></div>
                                    {/* <img
                                        alt="64x64"
                                        className="media-object"
                                        data-src="assets/img/reader_img3.jpg"
                                        src="assets/img/reader_img3.jpg"
                                        data-holder-rendered="true"
                                    /> */}
                                </a>
                            </div>
                            <div className="media-body">
                                <h2 className="media-heading">
                                    <a href="#">{comment.user && comment.user.username}</a>
                                </h2>
                                {comment.comment}
                                <div className="entity_vote">
                                    <a href="#">
                                        <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                                    </a>
                                    <a href="#">
                                        <span className="reply_ic">Reply </span>
                                    </a>
                                </div>
                                {comment.replies &&
                                    comment.replies.map((reply) => {
                                        return (
                                            <div className="media" key={reply.id}>
                                                <div className="media-left">
                                                    <a href="#">
                                                        {/* <img
                                                            alt="64x64"
                                                            className="media-object"
                                                            data-src="/static/assets/img/reader_img2.jpg"
                                                            src="/static/assets/img/reader_img2.jpg"
                                                            data-holder-rendered="true"
                                                        /> */}
                                                        <i class="fa fa-user"></i>
                                                    </a>
                                                </div>
                                                <div className="media-body">
                                                    <h2 className="media-heading">
                                                        <a href="#">{reply.user.username}</a>
                                                    </h2>

                                                    <div className="entity_vote">
                                                        <a href="#">
                                                            <i
                                                                className="fa fa-thumbs-o-up"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                        <a href="#">
                                                            <i
                                                                className="fa fa-thumbs-o-down"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                        <span className="reply_ic">Reply </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
        </Fragment>
    );
};
