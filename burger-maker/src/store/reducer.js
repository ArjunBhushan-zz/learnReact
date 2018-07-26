import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  price: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.ADD_INGREDIENT) :
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient] : state.ingredients[action.payload.ingredient] + 1
        },
        price: state.price + INGREDIENT_PRICES[action.payload.ingredient]
      };
    case (actionTypes.REMOVE_INGREDIENT) :
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient] : state.ingredients[action.payload.ingredient] - 1
        },
        price: state.price - INGREDIENT_PRICES[action.payload.ingredient]
      };
    default :
      return state;
  }
};

export default reducer;
