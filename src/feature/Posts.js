import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Filters } from './Filters'
import { Pagination } from './Pagination'
import { fetchPosts, postsPerPage, removePost } from './postSlice'

const Posts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postState = useSelector(s => s.post)
  const posts = postsPerPage(postState)
  const postStatus = useSelector(state => state.post.status)

  useEffect(() => {
      if (postStatus === 'init') {
        dispatch(fetchPosts())
      }
  }, [postStatus, dispatch])

  const onDelete = (id) => {
    dispatch(removePost(id))
    toast.success('Successfully removed!')
  }
  return (
    <div className="container card-content">
      <h1>Posts</h1>
      <div className="add">
        <Link to="/add">Add new</Link>
      </div>
      <Filters />
      { posts.map(i => (
        <div key={i.id} className="card">
          <h2>
            <Link to={`/${i.id}`}>{i.title}</Link>
          </h2>
          <p>{i.body}</p>
          <div>
            <button onClick={() => navigate(`/edit/${i.id}`)}>Edit</button>
            <button onClick={() => onDelete(i.id)}>Delete</button>
          </div>
        </div>
      )) }
      <Pagination />
    </div>
  )
}

export default Posts
