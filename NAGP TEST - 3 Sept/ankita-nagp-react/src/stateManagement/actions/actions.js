import {addPost, fetchOnePOst, fetchPosts, deletePost, editPost, likePost, unlinkePost} from './types';

import posts from '../../Data/posts';

export const fetchPostsAction = (data)=>(dispatch)=>{
    dispatch({
        type: fetchPosts,
        result: posts
    })
};


export const fetchOnePostAction = (data)=>(dispatch)=>{
    let singlepost = posts.filter((element)=>element.id == data);
    dispatch({
        type: fetchOnePOst,
        result: singlepost
    })
};


export const addPostAction = (data)=>(dispatch)=>{
    data.id = posts.length;
    data.liked = false;
    posts.push(data);
    dispatch({
        type: addPost,
        result: data
    })
};



export const deletePostAction = (id)=>(dispatch)=>{
    let remainingPosts = posts.filter((element)=> element.id != id);
    while(posts.length>0)
        posts.pop();
    for(let i of remainingPosts){
        posts.push(i);
    }    
    dispatch({
        type: deletePost,
        result: posts
    })
};





export const editPostAction = (id,data)=>(dispatch)=>{
    let postToEdit = posts.filter((element)=> element.id == id)[0];
    data.id = postToEdit.id;
    posts[postToEdit.id-1] = data; 
    dispatch({
        type: deletePost,
        result: posts
    })
};


export const likeAction = (data)=>(dispatch)=>{
     
    let index = posts.findIndex(obj=>obj.id == data.id);
    if(index!=-1){
        posts[index].liked = true;
    }

    dispatch({
        type: likePost,
        result: posts
    })
};


export const unlikeAction = (data)=>(dispatch)=>{
    let index = posts.findIndex(obj=>obj.id == data.id);
    if(index!=-1){
        posts[index].liked = false;
    }

    dispatch({
        type: unlinkePost,
        result: posts
    })
};