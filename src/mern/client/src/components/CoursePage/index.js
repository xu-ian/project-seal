import React, {Component} from 'react';
import qs from 'qs';
import { Link } from "react-router-dom";
import { Button, Typography, Container, Paper, Accordion, AccordionSummary, 
AccordionDetails } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
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
        this.showAssignmentContents = this.showAssignmentContents.bind(this);
        this.showLessons = this.showLessons.bind(this);
        this.showLessonContents = this.showLessonContents.bind(this);
        this.addAFolder = this.addAFolder.bind(this);
        this.addLFolder = this.addLFolder.bind(this);
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
            assignmentPages.push(
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>
                    {this.state.course.assignments[i].name}
                  </Typography>
                  <Button>
                      <AddIcon/>
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
              </Accordion>);
        }
        /*for(let i = 0; i < this.state.course.assignments.length; i++){
            assignmentPages.push(<Link style={{ textDecoration: 'none', color:'Black' }} 
              to={"/submit/" + this.state.course.assignments[i]._id}>
                <Paper>
                    <Typography variant = "h4">
                        {(1+i) + ". " + this.state.course.assignments[i].name}
                    </Typography>
                </Paper>
            </Link>);
        }*/
        return assignmentPages;
    }

    showAssignmentContents(j){
        for(let i = 0; i < this.state.course.assignments.assignments.length; i++){

        };
    }

    showLessons(){
        let lessonPages = [];
        for(let i = 0; i < this.state.course.lessons.length; i++){
            lessonPages.push(
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>
                    {this.state.course.lessons[i].name}
                  </Typography>
                  <Button>
                      <AddIcon/>
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
              </Accordion>);
        }
        /*for(let i = 0; i < this.state.course.lessons.length; i++){
            lessonPages.push(<Link to={"/coursepage?name="
            +this.state.course.lessons[i]._id}>
                <Paper>
                    {this.state.course.lessons[i].title}
                </Paper>
            </Link>)
        }*/
        return lessonPages;
    }

    showLessonContents(){

    }

    addAFolder(){
        var name = prompt("Enter the name of your folder");
        if(name){
            for(let i = 0; i < this.state.course.assignments.length; i++){
                if(name === this.state.course.assignments[i].name){
                    alert("That name is already taken");
                    return;
                }
            }
            axios.post("http://localhost:5000/course/addafolder/"+this.state.courseName+"/"
              +name).then(() =>{window.location.reload();});
            
        }
    }

    addLFolder(){
        var name = prompt("Enter the name of your folder");
        if(name){
            for(let i = 0; i < this.state.course.lessons.length; i++){
                if(name === this.state.course.lessons[i].name){
                    alert("That name is already taken");
                    return;
                }
            }
            axios.post("http://localhost:5000/course/addlfolder/"+this.state.courseName+"/"
              +name).then(() =>{window.location.reload();});
        }
    }
 
    render() {
        if(this.state.ready){
        return (
            <div>
                <Link to="/courses"><Button variant="contained">Back</Button></Link>
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
                    Assignments
                    <Button style={{float:"right"}} onClick={this.addAFolder}>
                        <AddIcon/>
                    </Button>
                    <hr/>
                </Typography>
                {this.showAssignments()}
                <Typography variant = "h2">
                    Lessons
                    <Button style={{float:"right"}} onClick={this.addLFolder}>
                        <AddIcon/>
                    </Button>
                    <hr/>
                </Typography>
                {this.showLessons()}
            </div>
        );}
        else{
            return(<div>Loading...</div>)
        }
    }
}

export default CoursePage;
