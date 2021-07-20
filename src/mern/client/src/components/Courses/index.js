import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import axios from "axios";
import AddCourse from './AddCourse.js';

class Courses extends Component {

    constructor(props){
        super(props);
        this.state={
            courses:[]
        };
        this.dynamicDisplay = this.dynamicDisplay.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/course/courses/").then(res =>{
            this.setState({courses:res.data});
        }).catch(err =>{
            new Notification(err);
        })
    }

    dynamicDisplay(){
        let courses = [];
        for(let i = 0; i < this.state.courses.length; i++){
            courses.push(<Link to={"/coursepage?name="+this.state.courses[i]._id}>
                <Container maxWidth="sm" style={{padding: "25px"}}>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                            <div style={{padding: "25px"}}>
                                <h2>{this.state.courses[i].name}</h2>
                                {this.state.courses[i].desc}
                            </div>
                        </Typography>
                    </Container>
            </Link>)
        }
        return courses;
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                <div>
                    {this.dynamicDisplay()}
                </div>
                <AddCourse/>
            </div>
        );
    }
}
export default Courses;