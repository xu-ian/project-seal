import React, {Component} from 'react';
import qs from 'qs';
import { Link } from "react-router-dom";
import { Button, Typography, Container, Paper, Accordion, AccordionSummary, 
AccordionDetails } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import AddAssignment from './AddAssignment.js';
import AssignTest from './../ToggleForm';

const getCoursesData = fetch('http://127.0.0.1:5000/courses').then(res => res.json())
const courseNameExists = (payload, courseName) => payload.map(course => course.name).includes(courseName);
const getCourseObjectIfExists = (payload, courseName) => payload.filter(course => (course.name === courseName))[0];

class CoursePage extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            course:{lessons:[], 
                assignments:[], 
                name:"placeholder", 
                desc:"placeholder"},
            courseName: this.props.match.params.id,
            desc: "",
            fid:"",
            ready:false,
            visible:"hidden"
        };
        this.validCourse = false;
        this.swapVisibility = this.swapVisibility.bind(this);
        this.onlyInstructor = this.onlyInstructor.bind(this);
        this.restrictAddFolder = this.restrictAddFolder.bind(this);
        this.showAssignments = this.showAssignments.bind(this);
        this.showAssignmentContents = this.showAssignmentContents.bind(this);
        this.showLessons = this.showLessons.bind(this);
        this.showLessonContents = this.showLessonContents.bind(this);
        this.addAFolder = this.addAFolder.bind(this);
        this.addLFolder = this.addLFolder.bind(this);
        this.removeAFolder = this.removeAFolder.bind(this);
        this.removeLFolder = this.removeLFolder.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/course/" + this.state.courseName).then(res => {
            this.setState({course:res.data, ready:true})}
        ).catch( err => {
            new Notification(err);
        });
    }

    swapVisibility(specificFid){
        this.setState({fid:specificFid});
        if(this.state.visible === "visible"){
            this.setState({visible:"hidden"});
        }
        else{
            this.setState({visible:"visible"});
        }
    }

    onlyInstructor(i, x){
        if(window.localStorage.getItem('userrole').includes('instructor')){
            if(x == "A"){
                return(
                <div>
                    <Button onClick={() => {this.swapVisibility(this.state.course.assignments[i]._id)}}>
                      <AddIcon/>
                    </Button>
                    <Button onClick={() =>{this.removeAFolder(this.state.course.assignments[i]._id)}}>
                      <DeleteIcon/>
                    </Button>
                </div>);
            }
            else{
                return(<div>
                    <Button>
                        <AddIcon/>
                    </Button>
                    <Button onClick={() =>{this.removeLFolder(this.state.course.lessons[i]._id)}}>
                        <DeleteIcon/>
                    </Button>
                    </div>)
            }
        }
    }

    restrictAddFolder(x){
        if(window.localStorage.getItem('userrole') && 
          window.localStorage.getItem('userrole').includes('instructor')){
        if(x == "A"){
            return(<Button style={{float:"right"}} onClick={this.addAFolder}>
            <AddIcon/>
        </Button>);
        }
        else{
            return(<Button style={{float:"right"}} onClick={this.addLFolder}>
            <AddIcon/>
        </Button>)
        }
       }
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
                  {this.onlyInstructor(i, "A")}
                </AccordionSummary>
                <AccordionDetails>
                    {this.showAssignmentContents(i)}
                </AccordionDetails>
              </Accordion>);
        }
        return assignmentPages;
    }

    showAssignmentContents(j){
        let assignmentPages = [];
        for(let i = 0; i < this.state.course.assignments[j].assignments.length; i++){
            assignmentPages.push(<Link style={{ textDecoration: 'none', color:'Black' }} 
              to={"/submit/" + this.state.course.assignments[j].assignments[i]._id}>
                <Paper>
                    <Typography variant = "h4">
                        {(1+i) + ". " + this.state.course.assignments[j].assignments[i].name}
                    </Typography>
                </Paper>
            </Link>);
        }
        return assignmentPages;
    };

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
                  {this.onlyInstructor(i, "L")}
                </AccordionSummary>
                <AccordionDetails>
                    {this.showLessonContents(i)}
                </AccordionDetails>
              </Accordion>);
        }
        /**/
        return lessonPages;
    }

    showLessonContents(j){
        let lessonPages = [];
        for(let i = 0; i < this.state.course.lessons[j].lessons.length; i++){
            lessonPages.push(<Link to={"/coursepage?name="
            +this.state.course.lessons[j].lessons[i]._id}>
                <Paper>
                    {this.state.course.lessons[j].lessons[i].title}
                </Paper>
            </Link>)
        }
        return lessonPages;
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
              +name).then(() => {window.location.reload();});
        }
    }

    removeAFolder(fid){
        axios.post("http://localhost:5000/course/removeafolder/"+this.state.courseName+"/"
        +fid).then().catch(err =>{
            new Notification(err);
        });
        window.location.reload();
    }
 
    removeLFolder(fid){
        axios.post("http://localhost:5000/course/removelfolder/"+this.state.courseName+"/"
        +fid).then().catch(err => {new Notification("Failure")});
        window.location.reload();
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
                    Assignments
                    {this.restrictAddFolder("A")}
                    <hr/>
                </Typography>
                {this.showAssignments()}
                <Typography variant = "h2">
                    Lessons
                    {this.restrictAddFolder("L")}
                    <hr/>
                </Typography>
                {this.showLessons()}
                <Paper style={{position:"absolute", width:"50%", height:"50%", top:"25%", 
                  left:"25%", "background-color":"lightblue", visibility:this.state.visible}}>
                    <AddAssignment cid={this.state.courseName} fid={this.state.fid}/>
                    <Button onClick={() =>{this.swapVisibility(this.state.fid)}}>Back</Button>
                </Paper>
                
            </div>
        );}
        else{
            return(<div>Loading...</div>)
        }
    }
}

export default CoursePage;
