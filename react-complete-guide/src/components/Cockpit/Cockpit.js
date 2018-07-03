import React from 'react';
import classes from './Cockpit.css';
const cockpit = (props) => {
  let btnClass = null;
  console.log(classes);
  if (props.showPersons){
    btnClass = classes.Red;
  }

  const assignClasses = [];
  if (props.persons.length <= 2) {
   assignClasses.push(classes.red);
  }
  if(props.persons.length <= 1){
    assignClasses.push(classes.bold);
  }

  return (
  <div className ={classes.Cockpit}>
    <h1>Hi, I'm am a React App</h1>
    <p className = {assignClasses.join(' ')}>This is really working!</p>
    <button className= {btnClass} onClick={props.clicked}>Toggle Persons</button>
  </div>);
};

export default cockpit;
