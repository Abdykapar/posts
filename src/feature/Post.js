import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Comments } from "./Comments"
import { singlePost } from "./postSlice"

export const Post = () => {
    const params = useParams()
    const state = useSelector(s => s.post)
    const post = singlePost(state, +params.id)
    
    return (
        <div className="container">
            { post ? <>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <Comments postId={+params.id} />
            </> : <div>No post found!</div>}
        </div>
    )
}