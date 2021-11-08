import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserId, setSearchText } from "./postSlice"
import { fetchUsers } from "./userSlice"

export const Filters = () => {
    const { users } = useSelector(s => s.user)
    const dispatch = useDispatch()
    const userStatus = useSelector(state => state.user.status)
    const [search, setSearch] = useState('')
  
    useEffect(() => {
        if (userStatus === 'init') {
          dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])
    const onUserChange = (e) => {
        dispatch(setUserId(+e.target.value))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setSearchText(search))
    }
    return (
        <div className="flex-between">
            <select onChange={onUserChange}>
                <option value="0">All</option>
                { users.map(i => (
                    <option value={i.id} key={i.id}>{ i.name }</option>
                )) }
            </select>

            <form onSubmit={onSubmit}>
                <input onChange={(e) => setSearch(e.target.value)} value={search} type="text"></input>
                <button type="submit">search</button>
            </form>
        </div>
    )
}