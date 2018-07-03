import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
  return props.persons.map((person, index) => {
    return (<Person
      name={person.name}
      age={person.age}
      click={props.clicked.bind(this,index)}
      change= {props.changed.bind(this,person.id)}
      key={person.id}/>);
  });
};

export default persons;
