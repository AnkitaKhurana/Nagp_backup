import {
  fetchProducts, fetchRealProducts,
  fetchOneProduct
} from '../actions/types';

const initialState = {
  products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : {},
  currentProduct: {},
  displayProducts: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    case fetchProducts:
      return {
        ...state,
        displayProducts: action.result
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