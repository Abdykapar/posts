import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCommentsByPostId } from '../api/service'

export const fetchComments = createAsyncThunk('comments/fetchComments', async (id) => {
  return await getCommentsByPostId(id)
})

const initialState = {
  comments: [],
  status: 'init'
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

// export const { } = commentsSlice.actions

export default commentsSlice.reducer