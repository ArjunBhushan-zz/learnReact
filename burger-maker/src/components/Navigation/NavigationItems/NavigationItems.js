import React from 'react';
import NavigationItem from './NavigationItem/NagivationItem';
import styles from './NavigationItems.css';
const navigationItems = () => {
  return (
    <ul className = {styles.NavigationItems}>
      <NavigationItem link = "/" >BurgerBuilder</NavigationItem>
      <NavigationItem link = "/orders" >Orders</NavigationItem>
    </ul>
  );
};
export default navigationItems;
