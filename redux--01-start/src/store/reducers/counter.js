import * as actionTypes from './../actions/actions';
const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...newState,
        counter: newState.counter + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...newState,
        counter: newState.counter -1
      };
    case actionTypes.ADD:
      return {
        ...newState,
        counter: newState.counter + action.amount
      };
    case actionTypes.SUBTRACT:
      return {
        ...newState,
        counter: newState.counter - action.amount
      };
    default:
      return state;
  };
};

export default reducer;
