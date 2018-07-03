import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from './../components/Persons/Persons';
import Cockpit from './../components/Cockpit/Cockpit';

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside constructor');
    this.state = {
      persons: [
        {id: 'asfas', name: 'Arjun', age: 19},
        {id: 'zxcva', name: 'Apoorv', age: 17},
        {id: 'vscsr', name: 'Brian', age: 18},
        {id: 'poklj', name: 'Dowson', age: 21}
      ],
      showPersons:false
    };
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount');
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
  // }
  componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }
  componentDidUpdate(){
    console.log('[UPDATE App.js] Inside componentDidUpdate');
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
    console.log('[App.js] Inside render');
    let persons = null
    if (this.state.showPersons) {
      persons = <Persons persons= {this.state.persons} changed= {this.nameChangeHandler} clicked = {this.deletePersonHandler}/>;
    }

    return (
      <div className={classes.App}>
        <Cockpit appTitle= {this.props.title} persons= {this.state.persons} clicked= {this.togglePersonHandler} showPersons = {this.state.showPersons}/>
        {persons}
      </div>
    );
  }
}

export default App;
