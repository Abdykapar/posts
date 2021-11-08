import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addPost } from "./postSlice";
import { PostForm } from "./PostForm";
import { useNavigate } from "react-router";

export const PostCreate = () => {
    const totalPosts = useSelector(s => s.post.posts.length)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = data => {
        dispatch(addPost({ ...data, id: totalPosts + 1 }))
        toast.success('Successfully created!')
        navigate('/')
    };

    return (
        <PostForm onSubmit={onSubmit} />
    )
}