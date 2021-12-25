import React, { Fragment } from "react"
import NoAvatar from "../../assets/images/user-icon.png"
export const Comments = (props) => {
    // const { comments , user } = props
    const user = { avatar: null }
    const comments = [
        {
            _id: "213213",
            userId: {
                name: "Tan Nguyen"
            },
            content: "hahahahahahahha",
            subComments: [{
                content: "hahaaha",
                _id: "213213",
                userId: {
                    name: "Tan Nguyen",
                }
            }, {
                content: "hahaaha",
                _id: "213213",
                userId: {
                    name: "Tan Nguyen",
                }
            }]
        }, {
            _id: "213213",
            userId: {
                name: "Tan Nguyen"
            },
            content: "hahahahahahahha",
            subComments: [{
                content: "hahaaha",
                _id: "213213",
                userId: {
                    name: "Tan Nguyen",

                }
            }]
        }, {
            _id: "213213",
            userId: {
                name: "Tan Nguyen"
            },
            content: "hahahahahahahha",
            subComments: [{
                content: "hahaaha",
                _id: "213213",
                userId: {
                    name: "Tan Nguyen",

                }
            }]
        }, {
            _id: "213213",
            userId: {
                name: "Tan Nguyen"
            },
            content: "hahahahahahahha",
            subComments: []
        }
    ]

    return (
        <Fragment>
            {comments &&
                comments.map((comment) => {
                    return (
                        <div className="media comment">
                            <div className="media-left">
                                <a href="#">
                                    <img
                                        alt="64x64"
                                        className="media-object comment"
                                        src={comment.userId.avatar ? comment.userId.avatar : NoAvatar}
                                        data-holder-rendered="true"
                                    />
                                </a>
                            </div>
                            <div className="media-body">
                                <h2 className="media-heading">
                                    <a href="#">{comment.userId && comment.userId.name}</a>
                                </h2>
                                {comment.content}
                                <div className="entity_vote">
                                    <a href="#">
                                        <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                                    </a>
                                    <a href="#">
                                        <span className="reply_ic" >Phản hồi </span>
                                    </a>
                                </div>
                                <div className="media-wrapper">
                                    <div className="media-left">
                                        <a href="#">
                                            <img
                                                alt="64x64"
                                                className="media-object comment"
                                                src={user.avatar ? user.avatar : NoAvatar}
                                                data-holder-rendered="true"
                                            />
                                        </a>
                                    </div>
                                    <div className="media-body">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <input className="input comment" />
                                            <button>Gửi</button>
                                        </div>
                                    </div>
                                </div>
                                {comment.subComments &&
                                    comment.subComments.map((reply) => {
                                        return (
                                            <div className="media sub-comment" key={reply._id}>
                                                <div className="media-left">
                                                    <a href="#">
                                                        <img
                                                            alt="64x64"
                                                            className="media-object comment"
                                                            src={reply.userId.avatar ? reply.userId.avatar : NoAvatar}
                                                            data-holder-rendered="true"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="media-body">
                                                    <h3 className="media-heading">
                                                        <a href="#">{reply.userId.name}</a>
                                                    </h3>
                                                    {comment.content}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    )
                })}
        </Fragment>
    )
}
