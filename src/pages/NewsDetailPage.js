import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SingleNewsCard } from '../components/skeletons/SingleNewsCard'
import { Loading } from '../components/includes/Loading'
import { Comments } from '../components/includes/Comments'
import { CommentForm } from '../components/includes/CommentForm'
import { Link, useRouteMatch } from 'react-router-dom'
import { getPostBySlug } from '../slices/postSlice'
import { addTopicComment, addPostComment } from '../slices/commentSlice'
import { io } from 'socket.io-client'
let socket
export default function NewsDetailPage() {
  const dispatch = useDispatch()
  let match = useRouteMatch()
  const { slug } = match.params
  const [post, setPost] = useState({})
  const [postComments, setPostComments] = useState([])
  const [topicComments, setTopicComments] = useState([])
  const [showAddTopic, setShowAddTopic] = useState(false)
  const [newTopicComment, setNewTopicComment] = useState({})
  const [newPostComment, setNewPostComment] = useState({})
  const { authenticated, user } = useSelector((state) => state.auth)
  const [clickedTopicId, setClickedTopicId] = useState(null)
  const ENDPOINT = 'localhost:7000'

  useEffect(() => {
    const fetchPostBySlug = async () => {
      const res = await dispatch(getPostBySlug(slug)).unwrap()
      setPost(res.data.post)
      setPostComments(res.data.postComments)
      setTopicComments(res.data.topicComments)
    }
    fetchPostBySlug()
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    setNewTopicComment({ postId: post._id })
    setNewPostComment({ postId: post._id })
  }, [post])

  useEffect(() => {
    socket = io(ENDPOINT)
    const room = slug
    socket.emit('join', { avatar: user.avatar, name: user.name, room })
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!Object.keys(user).length) return
    socket.emit('updateUser', { avatar: user.avatar, name: user.name })
  }, [user])

  useEffect(() => {
    socket.on('addTopicComment', ({ topicComment }) => {
      setTopicComments((prev) => [...prev, topicComment])
    })
    socket.on('message', ({ user, text }) => {
      console.log(user, text)
    })
    socket.on('addPostComment', ({ postComment }) => {
      setPostComments((prev) => [...prev, postComment])
    })
    socket.on('addSubComment', ({ reply, type }) => {
      console.log(reply,type)
      if (type === 'topic') {
        setTopicComments((prev) => {
          let cloneComments = [...prev]
          let comment = cloneComments.find(
            (comment) => comment._id === reply._id
          )
          //don't understand why it push two times
          if (!comment.subComments.includes(reply)) {
            comment.subComments.push(reply)
          }
          return cloneComments
        })
      } else if (type === 'post') {
        setPostComments((prev) => {
          let cloneComments = [...prev]
          let comment = cloneComments.find(
            (comment) => comment._id === reply._id
          )
          comment.subComments.push(reply)
          return cloneComments
        })
      }
    })
  }, [])

  if (Object.keys(post).length === 0) {
    return <Loading />
  }
  const handleSubmitAddPostComment = async (e) => {
    e.preventDefault()
    if (newPostComment.content && newPostComment.postId) {
      const res = await dispatch(addPostComment(newPostComment)).unwrap()
      if (res.data.success) {
        alert('Th??m b??nh lu???n v??? b??i vi???t th??nh c??ng')
        let res = await dispatch(getPostBySlug(slug)).unwrap()
        setPostComments(res.data.postComments)
        socket.emit('userAddPostComment', {
          postComment: res.data.postComments[res.data.postComments.length - 1],
        })
      } else {
        alert('Th??m b??nh lu???n v??? b??i vi???t th???t b???i')
      }
    }
    newPostComment.content = ''
  }

  const handleSubmitAddTopicComment = async (e) => {
    e.preventDefault()
    if (
      newTopicComment.content &&
      newTopicComment.postId &&
      newTopicComment.position
    ) {
      const res = await dispatch(addTopicComment(newTopicComment)).unwrap()
      if (res.data.success) {
        alert('Th??m b??nh lu???n v??? ch??? ????? th??nh c??ng')
        let res = await dispatch(getPostBySlug(slug)).unwrap()
        setTopicComments(res.data.topicComments)
        console.log(res.data.topicComments)
        socket.emit('userAddTopicComment', {
          topicComment:
            res.data.topicComments[res.data.topicComments.length - 1],
        })
      } else {
        alert('Th??m b??nh lu???n v??? ch??? ????? th???t b???i')
      }
      newTopicComment.content = ''
      setShowAddTopic(false)
    }
  }
  const emitAddSubCommentEvent = (reply, type) => {
    socket.emit('userAddSubComment', { reply, type })
  }

  return (
    <section id="entity_section" className="entity_section">
      <div className="container">
        <div className="row">
          {post && (
            <div className="col-md-8">
              <div className="entity_wrapper">
                <SingleNewsCard
                  news={post}
                  setShowAddTopic={setShowAddTopic}
                  newTopicComment={newTopicComment}
                  setNewTopicComment={setNewTopicComment}
                  topicComments={topicComments}
                  setClickedTopicId={setClickedTopicId}
                />
                {/* entity_content */}
                <div className="entity_footer">
                  {/* entity_tag */}
                  <div className="entity_social">
                    <span>
                      <i className="fa fa-share-alt" />
                      {topicComments.length} <a href="#">B??n lu???n v??? ch??? ?????</a>
                    </span>
                    <span>
                      <i className="fa fa-comments-o" />
                      {postComments.length}
                      <a href="#"> B??n lu???n v??? b??i vi???t</a>
                    </span>
                  </div>
                  {/* entity_social */}
                </div>
                {/* entity_footer */}
              </div>

              <div className="entity_comments">
                <div className="entity_inner__title header_black">
                  <h2>Th??m b??nh lu???n</h2>
                </div>
                {authenticated ? (
                  <CommentForm
                    handleSubmit={handleSubmitAddPostComment}
                    content={newPostComment.content}
                    setContent={(content) =>
                      setNewPostComment({ ...newPostComment, content })
                    }
                    emitAddSubCommentEvent={emitAddSubCommentEvent}
                  />
                ) : (
                  <p>
                    ????? b??nh lu???n v??? b??i vi???t vui l??ng{' '}
                    <Link to="/login">????ng nh???p</Link>
                  </p>
                )}
              </div>
              <div className="readers_comment">
                {/* entity_title */}
                {post ? (
                  <Fragment>
                    <div className="entity_inner__title header_purple">
                      <h2>B??nh lu???n [{postComments.length}]</h2>
                    </div>
                    <Comments
                      comments={postComments}
                      user={user}
                      type="post"
                      emitAddSubCommentEvent={emitAddSubCommentEvent}
                    />
                  </Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}
          <Fragment>
            <div className="col-md-4">
              <div className="widget">
                <div className="widget_title widget_black">
                  <h2>
                    <a href="#">Th???o lu???n </a>
                  </h2>
                </div>
                {showAddTopic && (
                  <CommentForm
                    handleSubmit={handleSubmitAddTopicComment}
                    content={newTopicComment.content}
                    setContent={(content) =>
                      setNewTopicComment({ ...newTopicComment, content })
                    }
                  />
                )}
                {topicComments.length > 0 ? (
                  <Comments
                    comments={topicComments}
                    user={user}
                    type="topic"
                    emitAddSubCommentEvent={emitAddSubCommentEvent}
                    clickedTopicId={clickedTopicId}
                  />
                ) : (
                  <h3>Hi???n t???i ch??a c?? b???t k?? b??n lu???n n??o v??? ch??? ????? </h3>
                )}
              </div>
            </div>
          </Fragment>
          {/*Right Section*/}
        </div>
      </div>
    </section>
  )
}
