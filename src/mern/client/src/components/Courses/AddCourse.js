import React from 'react';
import axios from 'axios';
import {Paper, Typography, Button, TextField} from '@material-ui/core';


export default class AddCourse extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            desc:"",
        }
        this.changeName = this.changeName.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.addCourse = this.addCourse.bind(this);
    }

    changeName(event){
        this.setState({name:event.target.value});
    }

    changeDesc(event){
        this.setState({desc:event.target.value});
    }

    addCourse(event){
        if(this.state.name === ""){
            alert("You cannot create a course with no name");
        }
        else{
            if(this.state.desc === ""){
                alert("You cannot create a course with no description");
            }
            else{
                axios.post("http://localhost:5000/course/add/", this.state);
                window.location.reload();
            }
        }
    }

    render(){
        return(<Paper>
            <TextField multiline id="outlined-basic" placeholder="Name of Course"
              style={{"width":"100%", position: "relative"}}
              onChange={this.changeName} value={this.state.name}/>
            <TextField multiline id="outlined-basic" placeholder="Description of Course"
              style={{"width":"100%", position: "relative"}}
              onChange={this.changeDesc} value={this.state.desc}/>
            <Button size="large" variant="contained" onClick={this.addCourse}
              style={{margin:"8px", right:"7px", position:"relative", float:"right"}}>
                Add Course
            </Button>
        </Paper>
        );
    }
}