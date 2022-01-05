import React, { Fragment, useState, useEffect } from 'react'
import NoAvatar from '../../assets/images/user-icon.png'
import { ReplyForm } from './ReplyForm'
import moment from 'moment'

export const Comments = (props) => {
  const { comments, user, type, emitAddSubCommentEvent, clickedTopicId } = props
  const [allComment, setAllComment] = useState()
  const [dateNow, setDateNow] = useState(Date.now())
  const getTimeDistance = (createdAt) => {
    const startDate = moment(createdAt)
    const timeEnd = moment(dateNow)
    const diff = timeEnd.diff(startDate)
    const { _data } = moment.duration(diff)
    if (_data.days > 0) {
      if (_data.days / 7 >= 1) return (_data.days - (_data.days % 7)) / 7 + 'w'
      return _data.days + 'd'
    } else if (_data.hours > 0) {
      return _data.hours + 'h'
    } else if (_data.minutes > 0) {
      return _data.minutes + 'm'
    } else if (_data.seconds > 0) {
      return _data.seconds + 's'
    }
  }
  useEffect(() => {
    setInterval(() => {
      setDateNow(Date.now())
    }, 1000 * 60)
  }, [dateNow])
  useEffect(() => {
    setAllComment([...comments].reverse())
  }, [comments])

  const addSubCommentHandler = (reply) => {
    let cloneComments = [...allComment]
    const comment = cloneComments.find((comment) => comment._id === reply._id)
    comment.subComments.push(reply)
    emitAddSubCommentEvent(reply, type)
    setAllComment(cloneComments)
  }

  return (
    <Fragment>
      {allComment &&
        allComment.map((comment, index) => {
          return (
            <div
              className={`media comment ${
                clickedTopicId === comment._id ? 'active' : ''
              }`}
              key={index}
              style={
                comment.position && { borderColor: comment.position.color }
              }
            >
              <div className="media-left">
                <a href="#">
                  <img
                    alt="64x64"
                    className="media-object comment"
                    src={
                      comment.userId.avatar ? comment.userId.avatar : NoAvatar
                    }
                    data-holder-rendered="true"
                  />
                </a>
              </div>
              <div className="media-body">
                <h2 className="media-heading comment">
                  <a href="#">{comment.userId && comment.userId.name}</a>
                  <span className="comment-time">
                    {getTimeDistance(comment.createdAt)}
                  </span>
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
                    <span className="reply_ic">Phản hồi </span>
                  </a>
                </div>
                <ReplyForm
                  type={type}
                  user={user}
                  comment={comment}
                  addSubComment={addSubCommentHandler}
                />
                {comment.subComments &&
                  comment.subComments.map((reply) => {
                    return (
                      <div className="media sub-comment" key={reply._id}>
                        <div className="media-left">
                          <a href="#">
                            <img
                              alt="64x64"
                              className="media-object comment"
                              src={
                                reply.userId.avatar
                                  ? reply.userId.avatar
                                  : NoAvatar
                              }
                              data-holder-rendered="true"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h3 className="media-heading comment">
                            <a href="#">{reply.userId.name}</a>
                            <span className="comment-time">
                              {getTimeDistance(reply.createdAt)}
                            </span>
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
