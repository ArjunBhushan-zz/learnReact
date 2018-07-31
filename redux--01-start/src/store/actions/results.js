import * as actionTypes from './actionTypes';

const saveResult = (counter) => {
  return {
    type: actionTypes.STORE,
    counter
  };
}

export const store = (counter) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // console.log(getState().counter.counter);
      dispatch(saveResult(counter));
    }, 2000);
  };

};

export const remove = (id) => {
  return {
    type: actionTypes.REMOVE,
    id
  };
};
