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

  nameChangeHandler = (id, e) => {
    let persons = [...this.state.persons];
    let findPersonIndex = persons.findIndex((person) => {
        return person.id === id;
      });
    persons[findPersonIndex].name = e.target.value;
    this.setState({persons});
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
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };
    let persons = null
    if (this.state.showPersons) {
      let personsList = this.state.persons.map((person, index) => {
        return (<Person
          name={person.name}
          age={person.age}
          click={this.deletePersonHandler.bind(this, index)}
          change= {this.nameChangeHandler.bind(this, person.id)}
          key={person.id}/>);
      });
      persons = (<div>
                  {personsList}
                </div>);
      style.backgroundColor = 'red';
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }
    return (
      <div className="App">
        <h1>Hi, I'm am a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button style= {style} onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
