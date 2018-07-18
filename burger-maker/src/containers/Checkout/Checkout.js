import React, {Component} from 'react';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  componentWillMount(){
    let query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = null;
    for (let param of query.entries()){
      if (param[0] === 'price') {
        price = param[1];
      }else{
        ingredients[param[0]] = Number.parseInt(param[1],10);
      }
    }
    this.setState({ingredients, totalPrice: price});
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <CheckoutSummary checkoutContinued = {this.checkoutContinueHandler} checkoutCancelled = {this.checkoutCancelledHandler} ingredients={this.state.ingredients}/>
        <Route
          path = {`${this.props.match.path}/contact-data`}
          render={() => (<ContactData ingredients ={this.state.ingredients} totalPrice = {this.state.totalPrice}/>)}/>
      </div>
    );
  }
}

export default Checkout;
