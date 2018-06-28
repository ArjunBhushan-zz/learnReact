import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: 'Arjun', age:19},
      {name: 'Apoorv', age:19},
      {name: 'Brian', age:19},
      {name: 'Dowson', age:19}
    ],
    otherProperty: 'sup'
  }
  switchAgeHandler = (age) => {
    this.setState({persons: [
      {name: 'Arjun', age},
      {name: 'Apoorv', age},
      {name: 'Brian', age},
      {name: 'Dowson', age},
    ]});
    //console.log(this.state);
  }

  nameChangeHandler = (event) => {
    let age = this.state.persons[0].age;
    //console.log(event.target.value);
    this.setState({persons: [
    {name: event.target.value, age},
    {name: 'Apoorv', age},
    {name: 'Brian', age},
    {name: 'Dowson', age}
    ]});
  }
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm am a React App</h1>
        <button onClick={() => this.switchAgeHandler(25)}>Increase Age</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchAgeHandler.bind(this,17)}
          change={this.nameChangeHandler.bind(this)}/>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}/>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}/>
        <Person
          name={this.state.persons[3].name}
          age={this.state.persons[3].age}>Sup?</Person>
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
