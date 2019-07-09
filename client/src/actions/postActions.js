import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS } from './types';

//add post 
export const addPost = (postData) => async dispatch => {
    try {
        dispatch(clearErrors());
        let newPost = await axios.post('/post', postData);
        dispatch({ type: ADD_POST, payload: newPost.data });
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }

}
//addComment
export const addComment = (id, commentData) => async dispatch => {
    try {
        dispatch(clearErrors());
        let newComment = await axios.post(`/post/comment/${id}`, commentData);
        dispatch({ type: GET_POST, payload: newComment.data });
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }

}
//getallPost
export const getPosts = () => async dispatch => {
    try {
        dispatch(setPostLoading())
        let newPost = await axios.get('/post');
        dispatch({ type: GET_POSTS, payload: newPost.data });
    }
    catch (err) { dispatch({ type: GET_POSTS, payload: null }); }

}
//get post by id
export const getPost = (id) => async dispatch => {
    try {
        dispatch(setPostLoading())
        let newPost = await axios.get(`/post/${id}`);
        dispatch({ type: GET_POST, payload: newPost.data });
    }
    catch (err) { dispatch({ type: GET_POST, payload: null }); }

}
//delete post
export const deletePost = (deleteId) => async dispatch => {
    try {
        await axios.delete(`/post/${deleteId}`);
        dispatch({ type: DELETE_POST, payload: deleteId });
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }

}
//deleteComment 
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        let commentData = await axios.delete(`/post/comment/${postId}/${commentId}`);
        dispatch({ type: GET_POST, payload: commentData.data });
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }

}
//likes
export const like = (id) => async dispatch => {
    try {
        await axios.post(`/post/like/${id}`);
        dispatch(getPosts());
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }

}
//unlikes
export const unlike = (id) => async dispatch => {
    try {
        await axios.post(`/post/unlike/${id}`);
        dispatch(getPosts());
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }

}
//loading
export const setPostLoading = () => { return { type: POST_LOADING } }
//clear err 
export const clearErrors = () => { return { type: CLEAR_ERRORS } }