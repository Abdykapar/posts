import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editPost, singlePost } from "./postSlice";
import { PostForm } from "./PostForm";
import { useNavigate, useParams } from "react-router";

export const PostEdit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const state = useSelector(s => s.post)
    const post = singlePost(state, +params.id)

    const onSubmit = data => {
        dispatch(editPost({ ...data, id: post.id }))
        toast.success('Successfully edited!')
        navigate('/')
    };

    return (
        <PostForm isEdit post={post} onSubmit={onSubmit} />
    )
}