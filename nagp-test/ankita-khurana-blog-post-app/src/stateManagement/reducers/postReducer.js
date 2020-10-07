import { fetchPosts, addPost, fetchOnePosts, deletePost, likePost, unlikePost, editPost } from '../actions/types';

const initialState = {
  posts: localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [],
  currentPost: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case fetchPosts:
      return {
        ...state,
        posts: action.result
      };
    case editPost:
      return {
        ...state,
        posts: action.result
      };
    case deletePost:
      return {
        ...state,
        posts: action.result
      };
    case likePost:
      return {
        ...state,
        posts: action.result
      };
    case unlikePost:
      return {
        ...state,
        posts: action.result
      };
    case fetchOnePosts:
      return {
        ...state,
        currentPost: action.result
      };
    case addPost:
      let postArray = [...state.posts];
      action.result.id = Date.now();
      postArray.push(action.result);
      return {
        ...state,
        posts: postArray
      };

    default: return state;
  }
}