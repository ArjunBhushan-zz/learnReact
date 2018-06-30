import React from 'react';
import './CharComponent.css';

const charComponent = (props) => {
  return (<p className="char" onClick= {props.click}>{props.char}</p>);
};

export default charComponent;
