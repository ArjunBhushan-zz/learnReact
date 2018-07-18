import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
//import {Redirect} from 'react-router-dom';
class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Arjun'
        //submitted: false
    }
    postDataHandler = () => {
      const post = {
        title: this.state.title,
        body: this.state.content,
        author: this.state.author
      };
      axios.post('/posts', post)
        .then((res) => {
          //this.setState({submitted: true});
          console.log(this.props.history.push('/posts'));
        }).catch((err) => {
          console.log(err);
          console.log(this.props.history.push('/posts'));
        });
    }
    render () {
        return (
            <div className="NewPost">
                {/*{this.state.submitted ? <Redirect to="/posts"/> : null */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Arju">Arjun</option>
                    <option value="Apoorv">Apoorv</option>
                </select>
                <button onClick = {this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
