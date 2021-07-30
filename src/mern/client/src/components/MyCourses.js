import React, {Component} from 'react';
import {Typography, Container, Button, Paper} from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from "axios";
import RemoveIcon from '@material-ui/icons/Remove';

class Courses extends Component {

    constructor(props){
        super(props);
        this.state={
            courses:[]
        };
        this.removeCourse = this.removeCourse.bind(this);
        this.dynamicDisplay = this.dynamicDisplay.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/enroll/getCourses/"+window.localStorage.getItem("userId"))
        .then(res =>{
            this.setState({courses:res.data.courses});
        }).catch(err =>{
            new Notification(err);
        });
    }

    removeCourse(cid){
        axios.post("http://localhost:5000/enroll/remove/"+window.localStorage.getItem("userId")
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

    dynamicDisplay(){
      let courses = [];
      for(let i = 0; i < this.state.courses.length; i++){
        courses.push(
          
            <Paper maxWidth="sm" style={{backgroundColor:'#cfe8fc', margin: "25px"}}>
              <Link to={"/coursepage?name="+this.state.courses[i]._id} style={{position:"relative"}}>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', width:"100%"}}>
                  <div style={{padding: "25px"}}>
                    <h2>{this.state.courses[i].name}</h2>
                    {this.state.courses[i].desc}
                  </div>
                </Typography>
              </Link>
              <Button style={{position:"relative", padding:"25px"}} 
               onClick={() => this.removeCourse(this.state.courses[i]._id)}>
                <RemoveIcon/>
              </Button>
            </Paper>
        )
      }
      return courses;
    }

    render() {
        return (
            <div>
                <h1>My Courses</h1>
                <div>
                    {this.dynamicDisplay()}
                </div>
            </div>
        );
    }
}
export default Courses;