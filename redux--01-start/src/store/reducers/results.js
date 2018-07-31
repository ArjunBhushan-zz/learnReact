import * as actionTypes from './../actions/actionTypes';
import {updateObject} from './../utility';

const remove = (state, action) => {
  const updatedArray =  state.results.filter(result => result.id !== action.id);
  return updateObject(state, {results: updatedArray});;
};

const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE:
      return updateObject(state, {results: state.results.concat({id: new Date(), val: action.counter})});
    case actionTypes.REMOVE:
      return remove(state,action);
    default:
      return state;
  };
};

export default reducer;
