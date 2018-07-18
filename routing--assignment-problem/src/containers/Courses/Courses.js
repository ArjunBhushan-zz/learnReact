import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Course from './../Course/Course';
import './Courses.css';
class Courses extends Component {
  state = {
      courses: [
          { id: 1, title: 'Angular - The Complete Guide' },
          { id: 2, title: 'Vue - The Complete Guide' },
          { id: 3, title: 'PWA - The Complete Guide' }
      ]
  }

  render () {
    let courses = this.state.courses.map(course => {
          return <article className="Course"
                          key={course.id}><Link to={{
                            pathname: `${this.props.match.path}/${course.id}`,
                            search: `?title=${course.title}`
                          }}>{course.title}</Link></article>;
    });
    let coursesRoute = (<div>
          <h1>Amazing Udemy Courses</h1>
          <section className="Courses">
              {courses}
          </section>
      </div>);

    return (
      <div>
        <Switch>
          <Route path = "/courses" exact render ={() => (<div>{coursesRoute}</div>)} />
          <Route path = "/courses/:id" component = {Course}/>
        </Switch>
      </div>
    );
  }
}

export default Courses;
