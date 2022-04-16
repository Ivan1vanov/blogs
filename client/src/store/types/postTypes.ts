


export interface IPost {
    _id: string,
    text: string,
    author: string,
    likes?: string[] | undefined,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IPostResponse {
    posts: IPost[],
    currentPage: number,
    numberOfPages: number
}

export enum PostActionTypes {
    GET_POSTS = 'GET_POSTS',
    CREATE_POST = 'CREATE_POST',
    DELETE_POST = 'DELETE_POST',
    SEARCH_POST = 'SEARCH_POST',
    LIKE_POST = 'LIKE_POST'
}

export interface Post_Fetch {
    type: PostActionTypes.GET_POSTS,
    payload: IPostResponse
}

export interface Post_Create {
    type: PostActionTypes.CREATE_POST,
    payload: IPost
}

export interface Post_Delete {
    type: PostActionTypes.DELETE_POST,
    payload: IPost
}

export interface Post_Like {
    type: PostActionTypes.LIKE_POST,
    payload: IPost
}

export interface Post_Search {
    type: PostActionTypes.SEARCH_POST,
    payload: IPost[]
}

export type ActionPostType = Post_Fetch | Post_Create | Post_Delete | Post_Like | Post_Search

