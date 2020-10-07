/*eslint eqeqeq: "off"*/
import {
    addPost,
    fetchPosts,
    fetchOnePosts,
    deletePost,
    likePost,
    unlikePost,
    editPost
} from './types';
import Posts from '../../data/posts';

export const addPostAction = (data) => (dispatch) => {
    data.liked = false;
    Posts.push(data);
    dispatch({
        type: addPost,
        result: data
    });
};

export const fetchPostsAction = (data) => (dispatch) => {
    dispatch({
        type: fetchPosts,
        result: Posts
    })
}

export const fetchOnePostAction = (id) => (dispatch) => {
    let singlePost = Posts.filter((element) => element.id == id)[0];
    if (!singlePost)
        singlePost = Posts[0];
    dispatch({
        type: fetchOnePosts,
        result: singlePost
    })
}

export const deletePostAction = (id) => (dispatch) => {
    let remainingPost = Posts.filter((element) => element.id != id);
    while (Posts.length > 0)
        Posts.pop();
    for (let i of remainingPost) {
        Posts.push(i);
    }
    dispatch({
        type: deletePost,
        result: Posts
    })
}

export const likeAction = (data) => (dispatch) => {
    let objIndex = Posts.findIndex((obj => obj.id == data));
    if (objIndex != -1)
        Posts[objIndex].liked = true;
    dispatch({
        type: likePost,
        result: Posts
    })
}

export const unlikeAction = (data) => (dispatch) => {
    let objIndex = Posts.findIndex((obj => obj.id == data));
    if (objIndex != -1)
        Posts[objIndex].liked = false;
    dispatch({
        type: unlikePost,
        result: Posts
    })
}

export const editPostAction = (data, id) => (dispatch) => {
    let objIndex = Posts.findIndex((obj => obj.id == id));
    if (objIndex != -1) {
        Posts[objIndex].title = data.title;
        Posts[objIndex].category = data.category;
        Posts[objIndex].content = data.content;
    }
    dispatch({
        type: editPost,
        result: Posts
    });
};