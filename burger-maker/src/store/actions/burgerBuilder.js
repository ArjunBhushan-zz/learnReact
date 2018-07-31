import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';
export const addIngredient = (ingredient) => {
  return {type: actionTypes.ADD_INGREDIENT, payload: {ingredient}};
};

export const removeIngredient  = (ingredient) => {
  return {type: actionTypes.REMOVE_INGREDIENT, payload: {ingredient}};
};

const setIngredients = (ingredients) => {
  return {type: actionTypes.SET_INGREDIENTS, payload: {ingredients}};
};

const fetchIngredientsFailed = () => {
  return {type: actionTypes.FETCH_INGREDIENTS_FAILED};
};
export const initIngredients = () => {
  return (dispatch) => {
    axios.get('/ingredients.json')
      .then((res) => {
        dispatch(setIngredients(res.data));
      }).catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
