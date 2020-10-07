import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

const middleware = [thunk];
const initialState = {};
const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);

store.subscribe(() => {
	localStorage.setItem('posts', JSON.stringify(store.getState().post.posts));
})


export default store;