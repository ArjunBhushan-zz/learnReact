import React, {Component} from 'react';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    return (
      <div>
        <CheckoutSummary checkoutContinued = {this.checkoutContinueHandler} checkoutCancelled = {this.checkoutCancelledHandler} ingredients={this.props.ingredients}/>
        {this.props.ingredients ?  <Route
          path = {`${this.props.match.path}/contact-data`}
          component= {ContactData}/> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    ingredients: state.ingredients,
    totalPrice: state.price
  });
};

export default connect(mapStateToProps)(Checkout);
