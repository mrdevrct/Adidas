import apiRequest from '../Axios/config';

export const setOpenMenu = (openMenu) => ({
  type: 'SET_OPEN_MENU',
  payload: openMenu
});

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest.get('/products');
      const products = response.data;
      dispatch(setProducts(products));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};