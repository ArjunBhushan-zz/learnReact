import React from 'react';
import NavigationItem from './NavigationItem/NagivationItem';
import styles from './NavigationItems.css';
const navigationItems = () => {
  return (
    <ul className = {styles.NavigationItems}>
      <NavigationItem link = "/" active>BurgerBuilder</NavigationItem>
      <NavigationItem link = "/">Checkout</NavigationItem>
    </ul>
  );
};
export default navigationItems;
