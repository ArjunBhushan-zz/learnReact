import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { increment, decrement, add, subtract, store, remove } from '../../store/actions/actions';
class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
              console.log('That is not an option');
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={() => this.props.onIncrementCounter()} />
                <CounterControl label="Decrement" clicked={() => this.props.onDecrementCounter()}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}  />
                <hr />
                <button onClick = {() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                  {this.props.results.map((result, index) => {
                    return <li key = {result.id} onClick = {() => this.props.onRemoveResult(result.id)}>Value: {result.val}</li>;
                  })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter.counter,
    results: state.results.results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => {
      return dispatch(increment());
    },
    onDecrementCounter: () => {
      return dispatch(decrement());
    },
    onAddCounter: (amount) => {
      return dispatch(add(amount));
    },
    onSubtractCounter: (amount) => {
      return dispatch(subtract(amount));
    },
    onStoreResult: (counter) => {
      return dispatch(store(counter));
    },
    onRemoveResult: (id) => {
      return dispatch(remove(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
