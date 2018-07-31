import React, {Component} from 'react';
import Button from './../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary';
import {withRouter} from 'react-router-dom';
import Input from './../../../components/UI/Input/Input';
import validator from 'validator';
import { connect } from 'react-redux';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          zipcode: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ],
          placeholder: 'Delivery'
        },
        validation: {},
        valid: true,
        value: 'fastest',
        touched: true
      }
    },
    isValidForm: false
  }

  checkValidity = (value,rules) => {
    if (!rules){
      return true;
    }
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }
    if (rules.minLength) {
      isValid = isValid && (value.length >= rules.minLength);
    }
    if (rules.maxLength) {
      isValid = isValid && (value.length <= rules.maxLength);
    }
    if (rules.email) {
      isValid = isValid && validator.isEmail(value);
    }
    if (rules.zipcode) {
      isValid = isValid && validator.isPostalCode(value, 'any');
    }
    return isValid;
  };
  orderHandler = (event) => {
    event.preventDefault();
    let formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    let customer = {
      name: formData.name,
      address: {
        street: formData.street,
        zipcode: formData.zipcode,
        country: formData.country
      },
      email: formData.email
    };
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer,
      deliveryMethod: formData.deliveryMethod
    };
    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (id, event) => {
    let isValidForm = true;
    let nextStateForm = {...this.state.orderForm};
    let updatedFormElement = {...this.state.orderForm[id]};
    nextStateForm[id] = updatedFormElement;
    nextStateForm[id].value = event.target.value;
    nextStateForm[id].valid = this.checkValidity(event.target.value, nextStateForm[id].validation);
    nextStateForm[id].touched = true;
    Object.keys(nextStateForm).forEach((key) => {
      if (!nextStateForm[key].valid){
        isValidForm = false;
      }
    });
    this.setState({orderForm: nextStateForm, isValidForm});
  }

  render(){
    const formElementsArray = [];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <Auxiliary>
        <h4>Enter your Contact Data</h4>
        <form onSubmit = {this.orderHandler.bind(this)}>
          {formElementsArray.map((formElement) => {
            return (
              <Input elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value= {formElement.config.value}
                key = {formElement.id}
                changed = {this.inputChangedHandler.bind(this, formElement.id)}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
              />
            );
          })}
          <Button buttonType = "Success" disabled = {!this.state.isValidForm}>ORDER</Button>
        </form>
      </Auxiliary>
    );
    if (this.props.loading) {
      form = <Spinner/>
    }
    return (
      <div className = {styles.ContactData}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
    loading: state.order.loading,
    token: state.auth.token
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));
