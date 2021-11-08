import React from "react"
import Posts from "./feature/Posts"
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import { Post } from "./feature/Post";
import { PostCreate } from "./feature/PostCreate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostEdit } from "./feature/PostEdit";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Posts />}></Route>
                <Route exact path="/add" element={<PostCreate />}></Route>
                <Route path="/edit/:id/" element={<PostEdit />}></Route>
                <Route path=":id" element={<Post />}></Route>
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App