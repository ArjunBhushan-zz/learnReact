export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE = 'STORE';
export const REMOVE = 'REMOVE';

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const add = (amount) => {
  return {
    type: ADD,
    amount
  };
};

export const subtract = (amount) => {
  return {
    type: SUBTRACT,
    amount
  };
};

export const saveResult = (counter) => {
  return {
    type: STORE,
    counter
  };
}

export const store = (counter) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(saveResult(counter));
    }, 2000);
  };

};

export const remove = (id) => {
  return {
    type: REMOVE,
    id
  };
};
