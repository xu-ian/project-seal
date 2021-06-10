import React, {Component} from 'react';
import Sidebar from '../SideBar';

class CoursePage extends Component {
    constructor(props){
        this.name = props.name
        this.desc = props.desc
    }

    render() {
        return (
            <Sidebar>
                <h1>{this.name}</h1>
                {this.desc}
            </Sidebar>
        );
    }
}
