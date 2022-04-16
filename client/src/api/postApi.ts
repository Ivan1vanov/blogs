import axios from "axios";




const API = axios.create({baseURL: 'http://localhost:5001/'})

API.interceptors.request.use((req: any) => {

    const info = localStorage.getItem('userTask')
    if(info) {
        req.headers.authorization = `Bearer ${info !== null ? JSON.parse(info).token : ''}`
    }

    return req
})

export const getPostsApi = (page: number) => API.get(`/api/posts?page=${page}`)
export const createPostAPI = (data: any) => API.post(`/api/posts`, data)
export const deletePostAPI = (id: string) => API.delete(`/api/posts/${id}`)
export const likePostAPI = (id: string) => API.put(`/api/posts/like/${id}`)
export const searchpostsAPI = (query: string) => API.get(`/api/posts/search?text=${query}`)
