import React , {Component} from 'react';
import Auxiliary from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from './../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout'
    });
  }
  updatePurchaseState = (ingredients) => {
    let sum = Object.keys(ingredients).map((key) => {
        return ingredients[key];
      }).reduce((total, el) => {
        return total + el;
      }, 0);
    return sum > 0;
  }
  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p style = {{textAlign: 'center', fontSize: '24px'}}><strong>Ingredients cannot be loaded!</strong></p>: <Spinner />;
  if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients = {this.props.ingredients}/>
          <BuildControls
            ingredientAdded = {this.props.addIngredient}
            ingredientRemoved = {this.props.removeIngredient}
            disabled = {disabledInfo}
            price= {this.props.totalPrice}
            purchasable = {this.updatePurchaseState(this.props.ingredients)}
            ordered = {this.purchaseHandler}/>
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary purchaseCanceled = {this.purchaseCancelHandler}
                      purchaseContinued = {this.purchaseContinueHandler}
                      ingredients = {this.props.ingredients}
                      price = {this.props.totalPrice}/>
      );
      if (this.state.loading) {
        orderSummary = <Spinner/>
      }
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    ingredients: state.ingredients,
    totalPrice: state.price,
    purchasable: state.purchasable
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    addIngredient: (ingredient) => {
      dispatch({type: actionTypes.ADD_INGREDIENT, payload: {ingredient}});
    },
    removeIngredient: (ingredient) => {
      dispatch({type: actionTypes.REMOVE_INGREDIENT, payload: {ingredient}});
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
