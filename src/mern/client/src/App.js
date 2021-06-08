import React, {Component} from "react";
import Components from './components';

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <Components />
            </div>
        );
    }
}

export default App;