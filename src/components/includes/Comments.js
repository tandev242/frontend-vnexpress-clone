import React, { Fragment, useState } from "react"
import NoAvatar from "../../assets/images/user-icon.png"
import { addSubTopicComment, addSubPostComment } from "../../slices/commentSlice"
import { useDispatch } from "react-redux"
export const Comments = (props) => {
    const { comments, user, type } = props
    const [reply, setReply] = useState({ _id: "", content: "" })
    const dispatch = useDispatch()
    const handleReplyComment = async (e) => {
        e.preventDefault()
        if (reply._id && reply.content) {
            if (type === "topic") {
                await dispatch(addSubTopicComment(reply))
            } else if (type === "post") {
                await dispatch(addSubPostComment(reply))
            }
        }

    }

    return (
        <Fragment>
            {comments &&
                comments.map((comment) => {
                    return (
                        <div className="media comment" key={comment._id}>
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
                                            <input className="input comment"
                                                value={reply.content}
                                                onChange={(e) => setReply({ _id: comment._id, content: e.target.value })} />
                                            <button onClick={(e) => handleReplyComment(e)}>Gửi</button>
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
                                                    {reply.content}
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
