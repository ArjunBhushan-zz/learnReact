import React , {Component} from 'react';
import Auxiliary from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import axios from './../../axios-orders';
import * as actions from './../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }
  componentDidMount() {
    this.props.onInitPurchase();
    this.props.initIngredients();
  }
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.history.push('/auth');
    }
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
    let burger = this.props.error ? <p style = {{textAlign: 'center', fontSize: '24px'}}><strong>Ingredients cannot be loaded!</strong></p>: <Spinner />;
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
            isAuth = {this.props.isAuthenticated}
            ordered = {this.purchaseHandler}/>
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary purchaseCanceled = {this.purchaseCancelHandler}
                      purchaseContinued = {this.purchaseContinueHandler}
                      ingredients = {this.props.ingredients}
                      price = {this.props.totalPrice}/>
      );
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
    purchasable: state.burgerBuilder.purchasable,
    error: state.error,
    isAuthenticated: state.auth.token !== null
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    initIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
