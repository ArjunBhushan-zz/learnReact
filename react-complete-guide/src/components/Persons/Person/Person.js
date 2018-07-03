import React from 'react';
import classes from './Person.css';

const person = (props) => {
  return (
    <div className={classes.Person}>
      <p onClick={props.click} >I'm {props.name} and I am {props.age} years old!</p>
      {props.children}
      <input type="text" onChange={props.change} value={props.name}/>
    </div>
  );
};

export default person;
