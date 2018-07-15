import React, {Component} from 'react';
import axios from './../../axios';
import Post from './../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }
  componentWillMount () {
    axios.get('/posts')
      .then((res) => {
        const posts = res.data.slice(0,4);
        const updatedPosts = posts.map((post) => {
          return (
            {
              ...post,
              author: 'Arjun'
            }
          );
        });
        this.setState({
          posts: updatedPosts
        });
      }).catch((err) => {
        console.log(err);
      });
  }
  postSelectedHandler = (id) => {
    this.props.history.push({pathname: `/${id}`});
  };

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        // <Link to={`/${post.id}`} key ={post.id}>
          <Post author="Arjun"
                title= {post.title}
                clicked = {this.postSelectedHandler.bind(this, post.id)}
                key ={post.id}
          />
        // </Link>
      );
    });
    return (
      <section className="Posts">
        {posts}
      </section>
    );
  }
}

export default Posts;
