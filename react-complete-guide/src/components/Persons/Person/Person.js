import React, {Component} from 'react';
import classes from './Person.css';

// const person = (props) => {
//   return (
//     <div className={classes.Person}>
//       <p onClick={props.click} >I'm {props.name} and I am {props.age} years old!</p>
//       {props.children}
//       <input type="text" onChange={props.change} value={props.name}/>
//     </div>
//   );
// };

class Person extends Component {
  constructor(props) {
    super(props);
    console.log('[Person.js] Inside constructor');
  }
  componentWillMount(){
    console.log('[Person.js] Inside componentWillMount');
  }
  componentDidMount(){
    console.log('[Person.js] Inside componentDidMount');
  }
  render(){
    console.log('[Person.js] Inside render');
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click} >I'm {this.props.name} and I am {this.props.age} years old!</p>
        {this.props.children}
        <input type="text" onChange={this.props.change} value={this.props.name}/>
      </div>
    );
  }
}

export default Person;
