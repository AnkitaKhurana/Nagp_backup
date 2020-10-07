import {fetchPosts, fetchOnePOst, likePost, editPost, unlinkePost, addPost, deletePost} from '../actions/types';



const initialState = {
    posts : [],
    currentPost : {}
};

export default function(state = initialState, action){
    switch(action.type){
        case fetchPosts : return {
            ...state,
            posts : action.result
        }
        case fetchOnePOst : return {
            ...state,
            currentPost : action.result
        }
        case addPost : {   
        return {
            ...state,
            posts : action.result
        }}
        case editPost : return {
            ...state,
            posts : action.result
        }
        case likePost : return {
            ...state,
            posts : action.result
        }
        case unlinkePost : return {
            ...state,
            posts : action.result
        }
        case deletePost : return {
            ...state,
            posts : action.result
        }
        default : return {...state}
    }
}