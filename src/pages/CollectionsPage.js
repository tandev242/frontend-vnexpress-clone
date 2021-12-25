import React, { Fragment, useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { NewsCard } from '../components/skeletons/NewsCard'
import { Sidebar } from '../components/skeletons/Sidebar'
import { Loading } from '../components/includes/Loading'
import { useDispatch } from 'react-redux'
import { getPostsByCategory, getAllPostsByCategory } from '../slices/postSlice'

export default function CollectionsPage() {
  const dispatch = useDispatch()
  let match = useRouteMatch()
  const { slug, subSlug } = match.params
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState({})
  useEffect(() => {
    const fetchPostsBySlug = async () => {
      var res = null
      if (subSlug) {
        res = await dispatch(getAllPostsByCategory({ slug, subSlug })).unwrap()
      } else {
        res = await dispatch(getPostsByCategory(slug)).unwrap()
      }
      setPosts(res.data.posts)
      setCategory(res.data.category)
    }
    fetchPostsBySlug()
    window.scrollTo(0, 0)
  }, [slug, subSlug])

  if (posts.length == 0) {
    return <Loading />
  }
  return (
    <Fragment>
      <section class="breadcrumb_section">
        <div class="container">
          <div class="row">
            <ol class="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li class="active">{category && category.name}</li>
            </ol>
          </div>
        </div>
      </section>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="entity_title header_purple">
              <h1>
                <a href="" target="_blank">
                  {category && category.name}
                </a>
              </h1>
            </div>
            <div class="row">
              {posts.map((news, index) => {
                return <NewsCard news={news} index={index} />
              })}
            </div>
          </div>
          <Sidebar />
        </div>
      </div>

    </Fragment>
  )
}
