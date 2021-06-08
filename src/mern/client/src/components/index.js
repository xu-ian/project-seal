import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Courses from './Courses';

class Components extends Component {
    render() {
        return(
            <Switch>
                <Route path="/courses" component={Courses} />
            </Switch>
        );
    }
}

export default Components;