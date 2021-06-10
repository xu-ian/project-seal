import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Courses from './Courses';
import CoursePage from './CoursePage';

class Components extends Component {
    render() {
        return(
            <Switch>
                <Route path="/courses" component={Courses} />
                <Route path="/coursepage" component={CoursePage} />
            </Switch>
        );
    }
}

export default Components;