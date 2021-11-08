import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../api/service'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await getUsers()
})

const initialState = {
  users: [],
  status: 'init'
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage += action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

export const { setCurrentPage } = usersSlice.actions

export default usersSlice.reducer