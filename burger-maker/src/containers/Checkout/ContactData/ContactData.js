import React, {Component} from 'react';
import Button from './../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary';
import {withRouter} from 'react-router-dom';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Arjun',
        address: {
          street: 'Teststreet 1',
          zipcode: 'aslkfjaslf',
          country: 'Canada'
        },
        email: 'test@email.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then((res) => {
        this.setState({loading: false});
        this.props.history.push('/');
      }).catch((err) => {
        this.setState({loading: false});
      });
  }

  render(){
    let form = (
      <Auxiliary>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className = {styles.Input} type='text' name="name" placeholder="Your Name"></input>
          <input className = {styles.Input} type='email' name="email" placeholder="Your Email"></input>
          <input className = {styles.Input} type='text' name="street" placeholder="Street"></input>
          <input className = {styles.Input} type='text' name="street" placeholder="Postal Code"></input>
          <Button buttonType = "Success" clicked = {this.orderHandler}>ORDER</Button>
        </form>
      </Auxiliary>
    );
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className = {styles.ContactData}>
        {form}
      </div>
    );
  }
}
export default withRouter(ContactData);
