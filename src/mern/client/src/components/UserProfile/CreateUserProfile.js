import React, { Component } from "react";
import { Container, Link, TextField, Button, Grid, Typography, Avatar, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export default class CreateUserProfile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "", 
            gender: "", 
            brief: "",
            iconImage: "",
            backgroudImage:"",
        };
    }

    


    render(){
        return(
            <div>
                create user profile



            </div>
        );
    }
}