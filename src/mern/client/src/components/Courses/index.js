import React, {Component} from 'react';
import {Typography, Container, Button, Paper} from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from "axios";
import AddCourse from './AddCourse.js';
import AddIcon from '@material-ui/icons/Add';

class Courses extends Component {

    constructor(props){
        super(props);
        this.state={
            courses:[],
            your_courses:[]
        };
        this.addCourse = this.addCourse.bind(this);
        this.reduceCourses = this.reduceCourses.bind(this);
        this.showLoggedIn = this.showLoggedIn.bind(this);
        this.dynamicDisplay = this.dynamicDisplay.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/course/courses/").then(res =>{
            if(window.localStorage.getItem("userId")){
              axios.get("http://localhost:5000/enroll/getCourses/"
               +window.localStorage.getItem("userId"))
              .then(res2 =>{
                  if(!res2.data){
                    this.setState({courses:res.data});
                  }
                  else{
                    this.setState({courses:res.data
                      .filter(n => this.reduceCourses(n, res2.data.courses))});
                  }
              }).catch(err =>{
                new Notification(err);
              })
            }
            else{
                this.setState({courses:res.data});
            }
        }).catch(err =>{
            new Notification(err);
        })
    }

    addCourse(cid){
        axios.post("http://localhost:5000/enroll/add/"+window.localStorage.getItem("userId")
        +"/"+cid).then().catch(err =>{new Notification(err)});
        let newCoursesList = [];
        for(let i = 0; i < this.state.courses.length; i++){
            if(cid !== this.state.courses[i]){
                newCoursesList.push(this.state.courses[i]);
            }
        }
        this.setState({courses:newCoursesList});
        window.location.reload();
    }

    showLoggedIn(i){
        if(window.localStorage.getItem("userId")){
            return(<Button style={{position:"relative", padding:"25px"}} 
            onClick={() => this.addCourse(this.state.courses[i]._id)}>
             <AddIcon/>
           </Button>)
        }
        else{
            return(<div></div>);
        }
    }

    reduceCourses(val, arr){
        for(let i = 0; i < arr.length; i++){
            if(val._id === arr[i]._id){
                return false;
            }
        }
        return true;
    }

    dynamicDisplay(){
      let courses = [];
      for(let i = 0; i < this.state.courses.length; i++){
        courses.push(
          
            <Paper maxWidth="sm" style={{backgroundColor:'#cfe8fc', margin: "25px"}}>
              
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', width:"100%"}}>
                  <div style={{padding: "25px"}}>
                    <h2>{this.state.courses[i].name}</h2>
                    {this.state.courses[i].desc}
                  </div>
                </Typography>
              {this.showLoggedIn(i)}
            </Paper>
        )
      }
      return courses;
    }

    render() {
        if(window.localStorage.getItem('userrole') && 
          window.localStorage.getItem('userrole').includes('instructor')){
        return (
            <div>
                <h1>Unregistered Courses</h1>
                <div>
                    {this.dynamicDisplay()}
                </div>
                <AddCourse/>
            </div>
        );}
        else{
            return(
                <div>
                    <h1>Unregistered Courses</h1>
                    <div>
                        {this.dynamicDisplay()}
                    </div>
                </div>  
            );
        }
    }
}
export default Courses;