import React, {PureComponent} from 'react';
import Person from './Person/Person';

// const persons = (this.props) => {
//   return this.props.persons.map((person, index) => {
//     return (<Person
//       name={person.name}
//       age={person.age}
//       click={this.props.clicked.bind(this,index)}
//       change= {this.props.changed.bind(this,person.id)}
//       key={person.id}/>);
//   });
// };

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside constructor');
  }
  componentWillMount(){
    console.log('[Persons.js] Inside componentWillMount');
  }
  componentDidMount(){
    console.log('[Persons.js] Inside componentDidMount');
  }
  componentWillReceiveProps(nextProps){
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed;
  // }
  componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
  }
  componentDidUpdate(){
    console.log('[UPDATE Persons.js] Inside componentDidUpdate');
  }
  render(){
    console.log('[Persons.js] Inside render');
    return this.props.persons.map((person, index) => {
      return (<Person
        name={person.name}
        age={person.age}
        click={this.props.clicked.bind(this,index)}
        change= {this.props.changed.bind(this,person.id)}
        key={person.id}/>);
    });
  }
}

export default Persons;
