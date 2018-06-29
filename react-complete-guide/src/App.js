import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'asfas', name: 'Arjun', age: 19},
      {id: 'zxcva', name: 'Apoorv', age: 17},
      {id: 'vscsr', name: 'Brian', age: 18},
      {id: 'poklj', name: 'Dowson', age: 21}
    ],
    otherProperty: 'sup',
    showPersons:false
  }

  nameChangeHandler = (event, id) => {
    //let age = this.state.persons[0].age;
    let persons = [...this.state.persons];

    //console.log(event.target.value);
    // this.setState({persons: [
    //   {id: 'asfas', name: event.target.value, age},
    //   {id: 'zxcva', name: 'Apoorv', age},
    //   {id: 'vscsr', name: 'Brian', age},
    //   {id: 'poklj', name: 'Dowson', age}
    // ]});
  }

  togglePersonHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  deletePersonHandler = (index) => {
    let newPersons = [
      ...this.state.persons
    ];
    newPersons.splice(index,1);
    this.setState({persons: newPersons});
  }
  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    let persons = null
    if (this.state.showPersons) {
      let personsList = this.state.persons.map((person, index) => {
        return (<Person
          name={person.name}
          age={person.age}
          click={this.deletePersonHandler.bind(this, index)}
          change= {this.nameChangeHandler.bind(this, event, person.id)}
          key={person.id}/>);
      });
      persons = (<div>
                  {personsList}
                </div>);
    }
    return (
      <div className="App">
        <h1>Hi, I'm am a React App</h1>
        <button style= {style} onClick={this.togglePersonHandler}>Toggle Persons</button>
          {persons}
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
