import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
        return <BurgerIngredient type = {ingredient} key = {`${ingredient}_${i}`}/>
      });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0){
    transformedIngredients  = <p>Please start adding ingredients!</p>
  }
  return (
    <div className = {styles.Burger}>
      <BurgerIngredient type = "bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type = "bread-bottom"/>
    </div>
  );
};

export default burger;
