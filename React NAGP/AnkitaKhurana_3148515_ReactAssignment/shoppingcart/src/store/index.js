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
	localStorage.setItem('products', JSON.stringify(store.getState().product.products));
	localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems));
	localStorage.setItem('cartCost', store.getState().cart.cartCost);
	localStorage.setItem('cartEmpty', store.getState().cart.cartEmpty);
	localStorage.setItem('lastItemAdded', store.getState().cart.lastItemAdded);
	localStorage.setItem('discount', store.getState().cart.discount);
	localStorage.setItem('cartTotal', store.getState().cart.cartTotal);
	localStorage.setItem('typeDiscount', store.getState().cart.typeDiscount);
	localStorage.setItem('orderTotal', store.getState().cart.orderTotal);

})


export default store;