import React, { Component } from 'react';
import Posts from './../Posts/Posts';
//import NewPost from './../NewPost/NewPost';
import asyncComponent from './../../hoc/AsyncComponent';
import {Route, NavLink, Switch} from 'react-router-dom';
import './Blog.css';
const AsyncNewPost = asyncComponent(() => {
  return import('./../NewPost/NewPost');
});
class Blog extends Component {
  render () {
    return (
      <div className = "Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink exact activeClassName= "my-active"
                          activeStyle = {{color: '#fa923f', textDecoration: 'underline' }}
                          to="/posts">Posts</NavLink></li>
              <li><NavLink to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true'
                  }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" component= {AsyncNewPost}/>
          <Route path="/posts" component={Posts}/>
          <Route from ="/" exact to="/posts"/>
          <Route render ={() => (<h1>Not Found</h1>)}/>
        </Switch>
      </div>
    );
  }
}

export default Blog;
