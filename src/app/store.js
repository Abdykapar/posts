import { configureStore } from '@reduxjs/toolkit'
import postSlice from '../feature/postSlice'
import userSlice from '../feature/userSlice'
import commentsSlice from '../feature/commentSlice'

export const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
    comment: commentsSlice
  },
})