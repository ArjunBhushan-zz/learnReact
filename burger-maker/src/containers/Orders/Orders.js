import React, {Component} from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
class Orders extends Component {
  componentDidMount(){
    this.props.fetchOrders(this.props.token);
  }
  render () {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return <Order ingredients = {order.ingredients} price = {order.price} key = {order.id}/>
      });
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));
