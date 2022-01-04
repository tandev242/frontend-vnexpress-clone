import React, {
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SingleNewsCard } from '../components/skeletons/SingleNewsCard'
import { Loading } from '../components/includes/Loading'
import { Comments } from '../components/includes/Comments'
import { CommentForm } from '../components/includes/CommentForm'
import { Link, useRouteMatch } from 'react-router-dom'
import { getPostBySlug } from '../slices/postSlice'
import { addTopicComment, addPostComment } from '../slices/commentSlice'

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
  //call children function from parent component
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

  if (Object.keys(post).length === 0) {
    return <Loading />
  }

  const handleSubmitAddPostComment = async (e) => {
    e.preventDefault()
    if (newPostComment.content && newPostComment.postId) {
      const res = await dispatch(addPostComment(newPostComment)).unwrap()
      if (res.data.success) {

      } else {
        alert('Thêm bình luận về bài viết thật bại')
      }
    }
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
      } else {
        alert('Thêm bình luận về chủ đề thật bại')
      }
      setShowAddTopic(false)
    }
  }

  // const getSelectedArray = useCallback(
  //   (array) => {
  //     var output = []
  //     array.forEach((element) => {
  //       output.push(element.position)
  //     })
  //     return output
  //   },
  //   [topicComments]
  // )

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
                      {topicComments.length} <a href="#">Bàn luận về chủ đề</a>
                    </span>
                    <span>
                      <i className="fa fa-comments-o" />
                      {postComments.length}
                      <a href="#"> Bàn luận về bài viết</a>
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
                    handleSubmit={handleSubmitAddPostComment}
                    content={newPostComment.content}
                    setContent={(content) =>
                      setNewPostComment({ ...newPostComment, content })
                    }
                  />
                ) : (
                  <p>
                    Để bình luận về bài viết vui lòng{' '}
                    <Link to="/login">Đăng nhập</Link>
                  </p>
                )}
              </div>
              <div className="readers_comment">
                {/* entity_title */}
                {post ? (
                  <Fragment>
                    <div className="entity_inner__title header_purple">
                      <h2>Bình luận [{postComments.length}]</h2>
                    </div>
                    <Comments comments={postComments} user={user} type="post" />
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
                    <a href="#">Thảo luận </a>
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
                  <Comments comments={topicComments} user={user} type="topic" clickedTopicId={clickedTopicId} />
                ) : (
                  <h3>Hiện tại chưa có bất kì bàn luận nào về chủ đề </h3>
                )}

                {/* <p className="widget_divider">
                                            <a href="#" target="_self">
                                                Xem thêm&nbsp&raquo
                                            </a>
                                        </p> */}
              </div>
            </div>
          </Fragment>
          {/*Right Section*/}
        </div>
      </div>
    </section>
  )
}
