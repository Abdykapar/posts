import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, deletePost, getPosts, updatePost } from '../api/service'
import { createSelector } from 'reselect'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await getPosts()
})

const posts = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []

const initialState = {
  currentPage: 1,
  pageSize: 10,
  posts,
  searchText: '',
  userId: 0,
  status: 'init'
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, {payload}) => {
      state.currentPage += payload
    },
    setSearchText: (state, {payload}) => {
        state.searchText = payload
    },
    setUserId: (state, {payload}) => {
        state.userId = payload
    },
    addPost: (state, {payload}) => {
        state.posts.push(payload)
        createPost(payload)
    },
    removePost: (state, {payload}) => {
        state.posts = state.posts.filter(i => i.id !== payload)
        deletePost(payload)
    },
    editPost: (state, {payload}) => {
      state.posts = state.posts.map(i => i.id === payload.id ? { ...i, ...payload } : i)
      updatePost(payload)
  }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        let posts = action.payload
        const storage = localStorage.getItem('posts')
        if (storage) {
            const localPosts = JSON.parse(storage)
            const mergedPosts = action.payload.map(i => {
                const p = localPosts.find(j => j.id === i.id)
                if (p) return p
                return i
            })
            const newPosts = localPosts.filter(i => !mergedPosts.some(j => j.id === i.id))
            posts = [...mergedPosts, ...newPosts]
        }
        localStorage.setItem('posts', JSON.stringify(posts))
        state.posts = posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

export const postsPerPage = createSelector(
    [s => filteredPosts(s), s => s.currentPage, s => s.pageSize], 
    (posts, page, size) => posts.slice((page - 1) * size, page * size)
)

export const singlePost = createSelector(
    [s => s.posts, (s, id) => id], 
    (posts, id) => posts.find(i => i.id === id)
)

export const totalPages = createSelector(
    [s => filteredPosts(s), s => s.pageSize],
    (posts, size) => Math.ceil(posts.length / size)
)

export const filteredPosts = createSelector(
    [s => s.posts, s => s.searchText, s => s.userId], 
    (posts, text, userId) => {
        if (userId === 0) {
            return posts.filter(i => 
                i.title.toLowerCase().includes(text) || 
                i.body.toLowerCase().includes(text)
            )
        } return posts.filter(i => i.userId === userId &&
            (i.title.toLowerCase().includes(text) || 
            i.body.toLowerCase().includes(text))
        )
    }
)

export const { 
  setCurrentPage, 
  setSearchText, 
  setUserId, 
  addPost, 
  removePost, 
  editPost 
} = postsSlice.actions

export default postsSlice.reducer