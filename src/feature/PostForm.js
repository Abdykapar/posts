import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";

export const PostForm = ({ onSubmit, isEdit, post = {} }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { users } = useSelector(s => s.user)
    const dispatch = useDispatch()
    const userStatus = useSelector(state => state.user.status)
  
    useEffect(() => {
        if (userStatus === 'init') {
          dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])

    return (
        <div className="container">
            <h1>{ isEdit ? 'Edit post' : 'Create new post' }</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <label>
                    Title
                    <input defaultValue={post.title} {...register("title", { required: 'Required field!' })} type="text" />
                    { errors.title?.message && <span className="error">{ errors.title.message }</span> }
                </label>
                <label>
                    Author
                    <select defaultValue={post.userId} {...register("userId")}>
                        { users.map(i => (
                            <option value={i.id} key={i.id}>{ i.name }</option>
                        )) }
                    </select>
                </label>
                <label>
                    Body
                    <textarea defaultValue={post.body} {...register("body", { required: 'Required field!' })} type="text" rows="5"></textarea>
                    { errors.body?.message && <span className="error">{ errors.body.message }</span> }
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}