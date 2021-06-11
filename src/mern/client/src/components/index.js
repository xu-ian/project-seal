import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Courses from './Courses';
import CoursePage from './CoursePage';
import VideoPlayer from './VideoPlayer';

class Components extends Component {
    render() {
        return(
            <Switch>
                <Route path="/courses" component={Courses} />
                <Route path="/coursepage" component={CoursePage} />
								<Route path="/player" component={VideoPlayer}></Route>
            </Switch>
        );
    }
}

export default Components;