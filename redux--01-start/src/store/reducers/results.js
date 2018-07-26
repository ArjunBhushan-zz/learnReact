import * as actionTypes from './../actions/actions';
const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  let newState = {...state};
  let results = [...state.results]
  switch (action.type) {
    case actionTypes.STORE:
      results.push({id: new Date(), val: action.counter});
      return {
        ...newState,
        results
      };
    case actionTypes.REMOVE:
      results = results.filter((result) => {
        return result.id !== action.id;
      });
      return {
        ...newState,
        results
      };
    default:
      return state;
  };
};

export default reducer;
