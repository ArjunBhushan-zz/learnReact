import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';
class App extends Component {
  state = {
    persons: [
      {id: 'asfas', name: 'Arjun', age: 19},
      {id: 'zxcva', name: 'Apoorv', age: 17},
      {id: 'vscsr', name: 'Brian', age: 18},
      {id: 'poklj', name: 'Dowson', age: 21}
    ],
    otherProperty: 'sup',
    showPersons:false,
    input: 'Input'
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

  getInputHandler = (e) => {
    this.setState({input: e.target.value});
  }

  // deleteCharHandler = (index, charList, e) => {
  //   charList.splice(index,1);
  //   this.setState({input: charList.join('')});
  // }
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
          change= {this.nameChangeHandler.bind(this, person.id)}
          key={person.id}/>);
      });
      persons = (<div>
                  {personsList}
                </div>);
    }

    let charList = this.state.input.trim().split('').map((char, index, array) => {
      return <CharComponent char={char} click ={this.deleteCharHandler.bind(this,index,array)} key={index}/>
    });
    return (
      <div className="App">
        <h1>Hi, I'm am a React App</h1>
        <button style= {style} onClick={this.togglePersonHandler}>Toggle Persons</button>
        <input className= "input-field" type= "text" onChange= {this.getInputHandler} value= {this.state.input}/>
        <ValidationComponent input = {this.state.input}/>
          {charList}
          {persons}
      </div>
    );
  }
}

export default App;
