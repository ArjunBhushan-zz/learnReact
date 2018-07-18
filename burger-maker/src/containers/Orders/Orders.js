import React, {Component} from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Spinner from './../../components/UI/Spinner/Spinner';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount(){
    let fetchedOrders = [];
    axios.get('/orders.json')
      .then((orders) => {
        for (let key in orders.data) {
          fetchedOrders.push({...orders.data[key], id: key});
        }
        this.setState({orders: fetchedOrders, loading: false});
      })
      .catch((err) => {
        this.setState({loading: false});
      });
  }
  render () {
    let orders = <Spinner />
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => {
        return <Order ingredients = {order.ingredients} price = {order.price} key = {order.id}/>
      });
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
