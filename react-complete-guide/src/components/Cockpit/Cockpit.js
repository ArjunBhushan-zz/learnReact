import React from 'react';
import classes from './Cockpit.css';
import Parallel from './../../hoc/Parallel';
const cockpit = (props) => {
  let btnClass = classes.Button;
  if (props.showPersons){
    btnClass = [classes.Red, classes.Button].join(' ');
  }
  console.log('button', btnClass);
  const assignClasses = [];
  if (props.persons.length <= 2) {
   assignClasses.push(classes.red);
  }
  if(props.persons.length <= 1){
    assignClasses.push(classes.bold);
  }
  return (
  <Parallel>
    <h1 className= {assignClasses.join(' ')}>{props.appTitle}</h1>
    <button className= {btnClass} onClick={props.clicked}>Toggle Persons</button>
  </Parallel>
  );
};

export default cockpit;
