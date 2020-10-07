import {
  fetchProducts, fetchRealProducts,
  fetchOneProduct, fetchProductsActionWithoutPagination
} from '../actions/types';

const initialState = {
  products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : {},
  currentProduct: {},
  displayProducts: [],
  displayProductsTotal: 0
};
export default function (state = initialState, action) {
  switch (action.type) {
    case fetchProducts:
      return {
        ...state,
        displayProducts: action.result
      };
    case fetchProductsActionWithoutPagination:
      return {
        ...state,
        displayProductsTotal: action.result.length
      };
    case fetchOneProduct:
      return {
        ...state,
        currentProduct: action.result
      };
    case fetchRealProducts:
      let obj2 = {};
      let i = 1;
      action.result.map(item => {
        obj2[i++] = item;
      });

      return {
        ...state,
        products: obj2
      };
    default: return state;
  }
}