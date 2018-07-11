import React from 'react';
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary';
import Button from './../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }).map((key) => {
    return <li key = {key}>{key}: {props.ingredients[key.charAt(0).toLowerCase() + key.slice(1)]}</li>;
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <Button buttonType = "Danger" clicked = {props.purchaseCanceled}>CANCEL</Button>
      <Button buttonType = "Success" clicked = {props.purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
  );
};
export default orderSummary;
