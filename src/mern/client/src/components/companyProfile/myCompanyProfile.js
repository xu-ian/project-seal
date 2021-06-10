import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
// import { Container, Button, Grid, Typography, Avatar, CssBaseline } from '@material-ui/core';
import { Link } from "react-router-dom";
import './my-company-profile-style.css';

export default class MyCompanyProfile extends Component{
    // This is the constructor that shall store our data retrieved from the database
    constructor(props){
        super(props);
        this.state = {
            company_title: "",
            tagline: "", 
            description: "", 
            emailAddress: "",   
            logo: "",           //image to be uploaded
            links: "",          //to be developed (detacting the link)
            members: "",         //to (search feature needed)
            companyProfile: [],
        };
    }
    // This will get the record based on the id from the database.
    componentDidMount() {
        axios
        .get("http://localhost:3000/company-profile/" + this.props.match.params.id)
        .then((response) => {
            this.setState({
                company_title: response.data.company_title,
                tagline: response.data.tagline,
                description: response.data.description,
                emailAddress: response.data.emailAddress,
                logo: response.data.logo,
                links: response.data.links,
                members: response.data.members,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log("the title is" + this.state.description)
    }
    
    
    render(){
        return(
            <div class="container">
                <div class="title-wrapper"> Company Profile </div>
                <div class="title-line"></div>

                <div class="profile-wrapper"> 
                    <div class="block-group"> 
                        <div id="logo-grid" class="grid-wrapper"> 
                            <div class="" image> 
                                logo
                            </div>
                            <div>
                                <div class = "company-title">
                                    title
                                </div>
                                <div>
                                    Tagline
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block-group">
                        <div class="description-wrapper"> description </div>
                    </div>
                    <div class="block-group"> 
                        <div class="grid-wrapper"> 
                            <div> email </div>
                            <div> links </div>
                        </div>
                    </div>
                    <div class="block-group"> Teams </div>
                
                </div>
            </div>
        )
    }
}