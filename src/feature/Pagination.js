import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage, totalPages } from "./postSlice"

export const Pagination = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.post)
    const pages = totalPages(state)
    const currentPage = useSelector(s => s.post.currentPage)
    const onPageChange = (n) => {
        dispatch(setCurrentPage(n))
    }
    return (
        <div className="pagination">
            <button disabled={currentPage <= 1} onClick={() => onPageChange(-1)}>Previous</button>
            <button disabled={currentPage >= pages} onClick={() => onPageChange(1)}>Next</button>
        </div>
    )
}