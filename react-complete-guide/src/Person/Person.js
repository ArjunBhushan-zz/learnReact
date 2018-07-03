import React from 'react';
import './Person.css';

const person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  };
  return (
    <div className="Person" style={style}>
      <p onClick={props.click} >I'm {props.name} and I am {props.age} years old!</p>
      {props.children}
      <input type="text" onChange={props.change} value={props.name}/>
    </div>
  );
};

export default person;
