import React from 'react';
import NavigationItem from './NavigationItem/NagivationItem';
import styles from './NavigationItems.css';

const navigationItems = (props) => {
  return (
    <ul className = {styles.NavigationItems}>
      <NavigationItem link = "/" >BurgerBuilder</NavigationItem>
      <NavigationItem link = "/orders" >Orders</NavigationItem>
      {props.isAuthenticated ? <NavigationItem link = '/logout'>Logout</NavigationItem> : <NavigationItem link = '/auth'>Authenticate</NavigationItem>}
    </ul>
  );
};
export default navigationItems;
