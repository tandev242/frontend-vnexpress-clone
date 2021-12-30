import React, { Fragment, useState } from "react";
import NoAvatar from "../../assets/images/user-icon.png"
import { addSubTopicComment, addSubPostComment } from "../../slices/commentSlice"
import { useDispatch } from "react-redux"

export const ReplyForm = (props) => {
    const { comment, user, type } = props;

    const [reply, setReply] = useState({})
    const dispatch = useDispatch()
    const handleReplyComment = async (e) => {
        e.preventDefault()
        if (reply._id && reply.content) {
            if (type === "topic") {
                await dispatch(addSubTopicComment(reply))
            } else if (type === "post") {
                await dispatch(addSubPostComment(reply))
            }
            setReply({})
        }
    }


    return (
        <Fragment>
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
        </Fragment>
    );
};
