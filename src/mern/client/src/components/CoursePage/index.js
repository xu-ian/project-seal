import React, {Component} from 'react';
import qs from 'qs';
import { Link } from "react-router-dom";
import { Button, Typography, Container, Paper } from '@material-ui/core';
import axios from 'axios';
import AddAssignment from './AddAssignment.js';
import AssignTest from './../ToggleForm';

const getCoursesData = fetch('http://127.0.0.1:5000/courses').then(res => res.json())
const courseNameExists = (payload, courseName) => payload.map(course => course.name).includes(courseName);
const getCourseObjectIfExists = (payload, courseName) => payload.filter(course => (course.name === courseName))[0];

class CoursePage extends Component {
    constructor(props){
        super(props);
        const pageURL = String(window.location.href)
        const URLObject = qs.parse(pageURL);
        const values = Object.values(URLObject);
        const defaultName = values[0];
        this.state = {
            course:{lessons:[], 
                assignments:[], 
                name:"placeholder", 
                desc:"placeholder"},
            courseName: defaultName,
            desc: "",
            ready:false
        };
        this.validCourse = false;
        this.showAssignments = this.showAssignments.bind(this);
        this.showLessons = this.showLessons.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/course/" + this.state.courseName).then(res => {
            this.setState({course:res.data, ready:true})}
        ).catch( err => {
            new Notification(err);
        });
    }

    showAssignments(){
        let assignmentPages = [];
        for(let i = 0; i < this.state.course.assignments.length; i++){
            assignmentPages.push(<Link style={{ textDecoration: 'none', color:'Black' }} 
              to={"/submit/" + this.state.course.assignments[i]._id}>
                <Paper>
                    <Typography variant = "h4">
                        {(1+i) + ". " + this.state.course.assignments[i].name}
                    </Typography>
                </Paper>
            </Link>);
        }
        return assignmentPages;
    }

    showLessons(){
        let lessonPages = [];
        for(let i = 0; i < this.state.course.lessons.length; i++){
            lessonPages.push(<Link to={"/coursepage?name="
            +this.state.course.lessons[i]._id}>
                <Paper>
                    {this.state.course.lessons[i].title}
                </Paper>
            </Link>)
        }
        return lessonPages;
    }

    render() {
        if(this.state.ready){
        return (
            <div>
                <Link to="/mycourses"><Button variant="contained">Back</Button></Link>
                <div>
                    <Typography variant = "h2">
                        {this.state.course.name}
                    </Typography>
                    <Container maxWidth="sm" style={{padding: "25px"}}>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                            <div style={{padding: "25px"}}>
                                {this.state.course.desc}
                            </div>
                        </Typography>
                    </Container>
                </div>
                <Typography variant = "h2">
                    Assignments<hr/>
                </Typography>
                <div>
                {this.showAssignments()}
                </div>
                <Typography variant = "h2">
                    Lessons<hr/>
                </Typography>
                {this.showLessons()}
                <Paper style={{position:"absolute", width:"50%", height:"50%", top:"25%", left:"25%", "background-color":"lightblue"}}>
                    <AddAssignment cid = {this.state.coursename} visible={true}/>
                    <Button>Back</Button>
                </Paper>
                
            </div>
        );}
        else{
            return(<div>Loading...</div>)
        }
    }
}

export default CoursePage;
