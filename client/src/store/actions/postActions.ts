import * as api from '../../api/postApi'
import { Dispatch } from 'redux';
import { PostActionTypes } from '../types/postTypes';

export const fetchPostsAction = (numberPage: number = 1) => async (dispatch: Dispatch) => {
        try {
            const {data} = await api.getPostsApi(numberPage)
            dispatch({type: PostActionTypes.GET_POSTS, payload: data})
        } catch (error) {
            console.log(error)
        }
}

export const createPostAction = (postData: any) => async (dispatch: Dispatch) => {
        try {
            const {data} = await api.createPostAPI(postData)
            dispatch({type: PostActionTypes.CREATE_POST, payload: data.post})
        } catch (error) {
            console.log(error)
        }
}

export const deletePostAction = (id: string) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.deletePostAPI(id)
        // console.log(data)
        dispatch({type: PostActionTypes.DELETE_POST, payload: data.post})
    } catch (error) {
        console.log(error)
    }
}

export const likePostAction = (id: string) => async (dispatch: Dispatch) => {
        try {
            const {data} = await api.likePostAPI(id)
            dispatch({type: PostActionTypes.LIKE_POST, payload: data})
        } catch (error) {
            console.log(error)
        }
}

export const searchPostAction = (query: string) => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.searchpostsAPI(query)
        dispatch({type: PostActionTypes.SEARCH_POST, payload: data.posts})
    } catch (error) {
        console.log(error)
    }
}