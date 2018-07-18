import React, { Component } from 'react';

class Course extends Component {
  state = {
    courseTitle: ''
  }
  componentDidMount(){
    let searchParams = new URLSearchParams(this.props.location.search);
    for (let p of searchParams) {
      this.setState({courseTitle: p[1]});
    }
  }
  render () {
    return (
        <div>
          <h1>{this.state.courseTitle}</h1>
          <p>You selected the Course with ID: {this.props.match.params.id}</p>
        </div>
    );
  }
}

export default Course;
