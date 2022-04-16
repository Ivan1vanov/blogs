import { ActionPostType, PostActionTypes, IPost } from '../types/postTypes';



const initializeState = {
    posts: [],
    numberOfPages: null,
    currentPage: null,
}

export const postReducer = (state = initializeState, action: ActionPostType) => {
    switch (action.type) {
        case PostActionTypes.GET_POSTS:
          return {...state, posts: action.payload.posts, numberOfPages: action.payload.numberOfPages, currentPage: action.payload.currentPage}

        case PostActionTypes.CREATE_POST:
            return {
                ...state.posts,
                posts: [action.payload, ...state.posts]
            }

        case PostActionTypes.DELETE_POST: 
        return {
            ...state, posts: state.posts.filter((post: any) => post._id !== action.payload._id)
        }

        case PostActionTypes.LIKE_POST: 
            return {
                ...state,
                posts: state.posts.map((p: IPost) => p._id === action.payload._id ? action.payload : p)
            }

        case PostActionTypes.SEARCH_POST: 
        return {
            ...state,
            posts: action.payload
        }
        default:
            return state
    }
}