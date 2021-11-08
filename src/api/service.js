export const getPosts = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const options = {
        method: 'GET'
    }
    return fetch(url, options).then(handleResponse)
}

export const createPost = (data) => {
    const items = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    items.push(data)
    localStorage.setItem('posts', JSON.stringify(items))
}

export const updatePost = (data) => {
    const items = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    const item = items.find(i => i.id === data.id)
    if (item) {
        item.title = data.title
        item.body = data.body
        item.userId = data.userId
    }
    localStorage.setItem('posts', JSON.stringify(items))
}

export const deletePost = (id) => {
    let items = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
    items = items.filter(i => i.id !== id)
    localStorage.setItem('posts', JSON.stringify(items))
}

export const getCommentsByPostId = (id) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    const options = {
        method: 'GET'
    }
    return fetch(url, options).then(handleResponse)
}

export const getUsers = () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const options = {
        method: 'GET'
    }
    return fetch(url, options).then(handleResponse)
}

function handleResponse (response) {
    if (!response.ok) {
        const error = response.statusText
        return Promise.reject(error)
    }
	return response.json().then(data => data)
}