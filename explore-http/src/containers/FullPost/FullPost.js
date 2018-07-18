import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    post: null
  }
  //if there is a change in id, or if an initial id is given
  componentWillMount() {
    this.loadData();
  }
  componentDidUpdate(){
    this.loadData();
  }

  loadData = () => {
    if (this.props.match.params.id){
      if (!this.state.post || this.state.post.id !== +this.props.match.params.id){
        axios.get(`/posts/${this.props.match.params.id}`)
          .then((res) => {
            const post = res.data;
            this.setState({post});
          }).catch((err) => {
            console.log(err);
          });
      }
    }
  }
  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }
  render () {
    let post = <p style= {{textAlign: 'center'}}>Please select a Post!</p>;
    if(this.props.match.params.id) {
      post = <p style= {{textAlign: 'center'}}>Loading...</p>;
    }
    if (this.state.post){
      post = (
          <div className="FullPost">
              <h1>{this.state.post.title}</h1>
              <p>{this.state.post.body}</p>
              <div className="Edit">
                  <button className="Delete" onClick = {this.deletePostHandler}>Delete</button>
              </div>
          </div>
      );
    }
    return post;
  }
}

export default FullPost;
