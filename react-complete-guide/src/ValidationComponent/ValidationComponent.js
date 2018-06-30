import React from 'react';
import './ValidationComponent.css';
const validationComponent = (props) => {
  let output = undefined;
  if(props.input.length<5){
    output = 'Text too short';
  }else if(props.input.length>=20){
    output = 'Text long enough';
  }
  return (
    <p className="validation">{output}</p>
  );
};

export default validationComponent;
