import {
    fetchProducts, fetchRealProducts,
    fetchOneProduct, addToCart, reduceFromCart,
    deleteFromCart, showToast, placeOrder,
    showOrderPlacedDialogBox
} from './types';

export const fetchProductsAction = (name, sort, page, limit) => (dispatch) => {
    if (name === undefined)
        name = "";
    if (sort === undefined)
        sort = "";   //asc|desc
    if (page === undefined)
        page = 1;   
    if(limit === undefined)
        limit = "";    
    fetch('http://localhost:3004/products?name_like=' + name + '&_sort=price,discount&_order=' + sort + ',' + sort+'&_page='+page+'&_limit='+limit)
        .then(res => res.json())
        .then(data => dispatch({
            type: fetchProducts,
            result: data
        }));
};

export const fetchProductsReal = () => (dispatch) => {
    fetch('http://localhost:3004/products')
        .then(res => res.json())
        .then(data => dispatch({
            type: fetchRealProducts,
            result: data
        }));
};

export const fetchOneProductAction = (id) => (dispatch) => {
    fetch('http://localhost:3004/products/' + id)
        .then(res => res.json())
        .then(data => dispatch({
            type: fetchOneProduct,
            result: data
        }));
};

export const addToCartAction = (data) => (dispatch) => {
    dispatch({
        type: addToCart,
        result: data
    });
};

export const reduceFromCartAction = (data) => (dispatch) => {
    dispatch({
        type: reduceFromCart,
        result: data
    });
};

export const deleteFromCartAction = (data) => (dispatch) => {
    dispatch({
        type: deleteFromCart,
        result: data
    });
};

export const showToastFunction = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: showToast
        });
    }, 3000);

}

export const placeOrderAction = () => (dispatch) => {
    dispatch({
        type: showOrderPlacedDialogBox
    });
    setTimeout(() => {
        dispatch({
            type: placeOrder
        });
    }, 3000);

};