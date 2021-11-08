import React, { useEffect } from "react"
import { fetchComments } from "./commentSlice"
import { useSelector, useDispatch } from "react-redux"

export const Comments = ({ postId }) => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.comment.status)
    const {comments} = useSelector(s => s.comment)

    useEffect(() => {
        if (status === 'init') {
            dispatch(fetchComments(postId))
        }
    }, [status, dispatch])

    return (
        <>
            <h4>Comments</h4>
            <ul>
                { comments.map(i => (
                    <li key={i.id}>
                        <p>{i.body}</p>
                        <div className="flex-between">
                            <i>{ i.name }</i>
                            <i>{ i.email }</i>
                        </div>
                    </li>
                )) }
            </ul>
        </>
    )
}