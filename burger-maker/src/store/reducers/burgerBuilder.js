import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../utilities/utilities';
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  price: 4,
  error: false
};

const addIngredient = (state, action) => {
  const updatedIngredient =  {[action.payload.ingredient] : state.ingredients[action.payload.ingredient] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    price: state.price + INGREDIENT_PRICES[action.payload.ingredient]
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient =  {[action.payload.ingredient] : state.ingredients[action.payload.ingredient] - 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    price: state.price - INGREDIENT_PRICES[action.payload.ingredient]
  };
  return updateObject(state, updatedState);
};

const updateIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    error: false,
    price: 4
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.ADD_INGREDIENT) :
      return addIngredient(state,action);
    case (actionTypes.REMOVE_INGREDIENT) :
      return removeIngredient(state,action);
    case (actionTypes.SET_INGREDIENTS):
      return updateIngredient(state,action);
    case (actionTypes.FETCH_INGREDIENTS_FAILED) :
      return fetchIngredientsFailed(state,action);
    default :
      return state;
  }
};

export default reducer;
